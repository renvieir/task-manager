import { SentryErrorRepository } from "./sentry-log-repository";
import env from "main/config/env";
import { ServerError } from "presentation/errors";

describe("Sentry Error Repository", () => {
  it("should call sentry captureException with provided error", () => {
    const error = new ServerError(new Error("error"));
    const sut = new SentryErrorRepository(env.sentryDSN);
    const spy = jest.spyOn(sut, "log");

    sut.log(error);

    expect(spy).toHaveBeenCalledWith(error);
  });
});
