import bcrypt from "bcrypt";

import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock("bcrypt", () => ({
  hash: async (value: string, salt: number): Promise<string> =>
    Promise.resolve(`hashed-${value}`),
}));

const SALT = 12;
const makeSut = (): BcryptAdapter => new BcryptAdapter(SALT);

describe("Bcrypt Adapter", () => {
  it("Should call bcrypt with correct value", async () => {
    const sut = makeSut();
    const spy = jest.spyOn(bcrypt, "hash");

    await sut.encrypt("value");

    expect(spy).toHaveBeenCalledWith("value", SALT);
  });

  it("Should return a hash on success", async () => {
    const sut = makeSut();

    const hash = await sut.encrypt("value");

    expect(hash).toEqual("hashed-value");
  });

  it("Should throw if bcrypt throws", async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, "hash").mockRejectedValueOnce(new Error("error"));

    const promise = sut.encrypt("value");

    await expect(promise).rejects.toThrow();
  });
});
