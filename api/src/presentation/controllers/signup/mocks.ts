import faker from "faker";

import {
  AccountData,
  AccountModel,
  AddAccount,
  EmailValidator,
} from "./protocols";
import SignUpController from ".";

export const accountData = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

export const accountModel = {
  ...accountData,
  id: faker.datatype.uuid(),
};

interface SutTypes {
  addAccountStub: AddAccount;
  emailValidatorStub: EmailValidator;
  sut: SignUpController;
}

export const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add(account: AccountData): Promise<AccountModel> {
      return Promise.resolve(accountModel);
    }
  }
  return new AddAccountStub();
};

export const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

export const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount();
  const emailValidatorStub = makeEmailValidator();
  const sut = new SignUpController(emailValidatorStub, addAccountStub);
  return {
    addAccountStub,
    emailValidatorStub,
    sut,
  };
};
