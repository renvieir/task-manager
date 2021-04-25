import {
  AccountData,
  AccountModel,
  AddAccount,
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
} from "./protocols";
import { InvalidParamError, MissingParamError } from "presentation/errors";
import { badRequest, created, serverError } from "presentation/helpers/http";

export const requiredFields = [
  "name",
  "email",
  "password",
  "passwordConfirmation",
];

interface RequestData extends AccountData {
  passwordConfirmation: string;
}

export default class SignUpController
  implements Controller<RequestData, AccountModel> {
  private readonly emailValidator: EmailValidator;
  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  async handle(
    httpRequest: HttpRequest<RequestData>
  ): Promise<HttpResponse<AccountModel>> {
    for (const field of requiredFields) {
      const param = httpRequest.body[field];
      if (!param) return badRequest(new MissingParamError(field));
    }

    const { name, email, password, passwordConfirmation } = httpRequest.body;
    const passwordMatch = password === passwordConfirmation;
    if (!passwordMatch)
      return badRequest(new InvalidParamError("passwordConfirmation"));

    try {
      if (!this.emailValidator.isValid(email))
        return badRequest(new InvalidParamError("email"));

      const account = await this.addAccount.add({ name, email, password });

      return created(account);
    } catch (error) {
      return serverError(error);
    }
  }
}
