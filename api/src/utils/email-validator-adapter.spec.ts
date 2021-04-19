import faker from "faker";
import validator from "validator";

import { EmailValidatorAdapter } from "./email-validator-adapter";

jest.mock("validator", () => ({
  isEmail: () => true,
}));

const makeSut = () => {
  return new EmailValidatorAdapter();
};

describe("EmailValidator Adapter", () => {
  it("should call validator with provided email", () => {
    const sut = makeSut();
    const spy = jest.spyOn(validator, "isEmail");
    const email = faker.internet.email();

    sut.isValid(email);

    expect(spy).toHaveBeenCalledWith(email);
  });

  it("should return false if validation fails", () => {
    const sut = makeSut();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);

    const isValid = sut.isValid(faker.name.firstName());

    expect(isValid).toBeFalsy();
  });

  it("should return true if validation succed", () => {
    const sut = makeSut();

    const isValid = sut.isValid(faker.internet.email());

    expect(isValid).toBeTruthy();
  });
});
