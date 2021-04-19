import {
  AccountData,
  AccountModel,
  AddAccount,
  AddAccountRepository,
  Encrypter,
} from "./protocols";
import {
  accountData,
  accountModel,
} from "../../../presentation/controllers/signup/mocks";
import { DbAddAccount } from ".";

interface SutTypes {
  addAccountRepositoryStub: any;
  encrypterStub: Encrypter;
  sut: AddAccount;
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStube implements AddAccountRepository {
    async add(accountData: AccountData): Promise<AccountModel> {
      return Promise.resolve(accountModel);
    }
  }
  return new AddAccountRepositoryStube();
};

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return Promise.resolve(`hash-${value}`);
    }
  }
  return new EncrypterStub();
};

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository();
  const encrypterStub = makeEncrypter();
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);
  return { addAccountRepositoryStub, encrypterStub, sut };
};

describe("DbAccount Usecase", () => {
  it("should call password encrypter with correct password", async () => {
    const { sut, encrypterStub } = makeSut();
    const spy = jest.spyOn(encrypterStub, "encrypt");
    await sut.add(accountData);

    expect(spy).toHaveBeenCalledWith(accountData.password);
  });

  it("should throw if encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, "encrypt")
      .mockRejectedValueOnce(new Error("error"));

    const promise = sut.add(accountData);

    await expect(promise).rejects.toThrow();
  });

  it("should call AddAccountRepository with correct values", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const spy = jest.spyOn(addAccountRepositoryStub, "add");
    await sut.add(accountData);

    expect(spy).toHaveBeenCalledWith({
      ...accountData,
      password: `hash-${accountData.password}`,
    });
  });

  it("should throw if AddAccountRepository throws", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest
      .spyOn(addAccountRepositoryStub, "add")
      .mockRejectedValueOnce(new Error("error"));

    const promise = sut.add(accountData);

    await expect(promise).rejects.toThrow();
  });

  it("should return an account on success", async () => {
    const { sut } = makeSut();

    const account = await sut.add(accountData);

    expect(account).toEqual(accountModel);
  });
});
