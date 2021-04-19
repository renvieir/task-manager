import { requiredFields } from ".";
import { accountData, accountModel, makeSut } from "./mocks";
import {
  MissingParamError,
  InvalidParamError,
  ServerError,
} from "../../errors";

describe("SignUpController", () => {
  it.each(requiredFields)(
    "should return 400 if no %s is provided",
    async (param) => {
      const { sut } = makeSut();
      const httpRequest = {
        body: {
          ...accountData,
          passwordConfirmation: accountData.password,
          [param]: "",
        },
      };

      const response = await sut.handle(httpRequest);

      expect(response.statusCode).toEqual(400);
      expect(response.body).toEqual(new MissingParamError(param));
    }
  );

  it("should call EmailValidator with provided email", async () => {
    const { sut, emailValidatorStub } = makeSut();
    const spy = jest
      .spyOn(emailValidatorStub, "isValid")
      .mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        ...accountData,
        passwordConfirmation: accountData.password,
        email: "invalid",
      },
    };

    await sut.handle(httpRequest);

    expect(spy).toHaveBeenCalledWith(httpRequest.body.email);
  });

  it("should return 400 if passwordConfirmation fails", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        ...accountData,
        passwordConfirmation: "passwordConfirmation",
      },
    };

    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual(
      new InvalidParamError("passwordConfirmation")
    );
  });

  it("should return 400 if invalid email is provided", async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        ...accountData,
        passwordConfirmation: accountData.password,
        email: "invalid",
      },
    };

    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual(new InvalidParamError("email"));
  });

  it("should return 500 if EmailValidator throws", async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest
      .spyOn(emailValidatorStub, "isValid")
      .mockImplementationOnce((email) => {
        throw new Error("error");
      });
    const httpRequest = {
      body: {
        ...accountData,
        passwordConfirmation: accountData.password,
        email: "invalid",
      },
    };

    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toEqual(500);
    expect(response.body).toEqual(new ServerError());
  });

  it("should call AddAccount with correct value", async () => {
    const { sut, addAccountStub } = makeSut();
    const spy = jest.spyOn(addAccountStub, "add");
    const httpRequest = {
      body: {
        ...accountData,
        passwordConfirmation: accountData.password,
      },
    };

    await sut.handle(httpRequest);

    expect(spy).toHaveBeenCalledWith(accountData);
  });

  it("should return 500 if AddAccount throws", async () => {
    const { sut, addAccountStub } = makeSut();
    jest
      .spyOn(addAccountStub, "add")
      .mockImplementationOnce(
        async () => new Promise((resolve, reject) => reject(new Error("error")))
      );
    const httpRequest = {
      body: {
        ...accountData,
        passwordConfirmation: accountData.password,
      },
    };

    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toEqual(500);
    expect(response.body).toEqual(new ServerError());
  });

  it("should return 201 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        ...accountData,
        passwordConfirmation: accountData.password,
      },
    };

    const response = await sut.handle(httpRequest);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(accountModel);
  });
});
