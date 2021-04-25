import { Controller, HttpRequest, HttpResponse } from "presentation/protocols";
import { accountRequestData } from "presentation/controllers/signup/mocks";
import { LogControllerDecorator } from "./log";
import { serverError } from "presentation/helpers/http";
import { LogErrorRepository } from "data/protocols/log-error-repository";

interface SutTypes {
  sut: LogControllerDecorator<any, any>;
  controllerStub: Controller<any, any>;
  logErrorRepositoryStub: LogErrorRepository;
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log(error: Error): Promise<void> {
      return Promise.resolve();
    }
  }

  return new LogErrorRepositoryStub();
};

const makeSut = (): SutTypes => {
  class ControllerStub implements Controller<any, any> {
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
      return Promise.resolve({ statusCode: 200, body: {} });
    }
  }

  const logErrorRepositoryStub = makeLogErrorRepository();
  const controllerStub = new ControllerStub();
  const sut = new LogControllerDecorator<any, any>(
    controllerStub,
    logErrorRepositoryStub
  );

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub,
  };
};

describe("LogController Decorator", () => {
  it("should call Controller handle", async () => {
    const { sut, controllerStub } = makeSut();
    const spy = jest.spyOn(controllerStub, "handle");
    const httpRequest = { body: accountRequestData };

    await sut.handle(httpRequest);

    expect(spy).toHaveBeenCalledWith(httpRequest);
  });

  it("should return Controller response", async () => {
    const { sut } = makeSut();
    const httpRequest = { body: accountRequestData };

    const response = await sut.handle(httpRequest);

    expect(response).toEqual({ statusCode: 200, body: {} });
  });

  it("should call LogErrorRepository with correct error if controller returns a server error", async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
    const mockError = new Error();
    mockError.stack = "stack";
    const error = serverError(mockError);
    jest.spyOn(controllerStub, "handle").mockResolvedValueOnce(error);

    const spy = jest.spyOn(logErrorRepositoryStub, "log");
    const httpRequest = { body: accountRequestData };

    await sut.handle(httpRequest);

    expect(spy).toHaveBeenCalledWith(error.body);
  });
});
