import SignupController from "presentation/controllers/signup";
import { EmailValidatorAdapter } from "utils/email-validator-adapter";
import { DbAddAccount } from "data/usecases/db-add-account";
import { BcryptAdapter } from "infra/criptography/bcrypt-adapter";
import { AccountMongoRepository } from "infra/db/mongodb/account-repository/account";
import { LogControllerDecorator } from "main/decorators/log";
import { SentryErrorRepository } from "infra/logger/sentry-log-repository";
import { Controller } from "presentation/protocols";
import env from "../config/env";

export const makeSignupController = (): Controller<any, any> => {
  const emailValidator = new EmailValidatorAdapter();

  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountRepository = new AccountMongoRepository();
  const addAccount = new DbAddAccount(bcryptAdapter, accountRepository);

  const signupController = new SignupController(emailValidator, addAccount);

  const logRepository = new SentryErrorRepository(env.sentryDSN);
  const logController = new LogControllerDecorator(
    signupController,
    logRepository
  );
  return logController;
};
