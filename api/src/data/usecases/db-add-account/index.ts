import {
  AccountModel,
  AccountData,
  AddAccount,
  AddAccountRepository,
  Encrypter,
} from "./protocols";

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;
  private readonly addAccountRepository: AddAccountRepository;

  constructor(
    encrypter: Encrypter,
    addAccountRepository: AddAccountRepository
  ) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }

  async add(account: AccountData): Promise<AccountModel> {
    const encryptedPassword = await this.encrypter.encrypt(account.password);
    const accountModel = await this.addAccountRepository.add({
      ...account,
      password: encryptedPassword,
    });
    return Promise.resolve(accountModel);
  }
}
