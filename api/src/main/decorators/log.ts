import { Controller, HttpRequest, HttpResponse } from "presentation/protocols";
import { LogErrorRepository } from "data/protocols/log-error-repository";

export class LogControllerDecorator<U, T> implements Controller<U, T> {
  private readonly controller: Controller<U, T>;
  private readonly logErrorRepository: LogErrorRepository;

  constructor(
    controller: Controller<U, T>,
    logErrorRepository: LogErrorRepository
  ) {
    this.controller = controller;
    this.logErrorRepository = logErrorRepository;
  }

  async handle(httpRequest: HttpRequest<U>): Promise<HttpResponse<T>> {
    const httpResponse = await this.controller.handle(httpRequest);

    if (httpResponse.statusCode === 500) {
      const stack = httpResponse.body?.stack;
      await this.logErrorRepository.log(stack);
    }
    return httpResponse;
  }
}
