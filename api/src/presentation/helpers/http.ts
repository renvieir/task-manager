import { ServerError } from "presentation/errors";
import { HttpResponse } from "presentation/protocols/http";

export const badRequest = (body: Error): HttpResponse<any> => ({
  statusCode: 400,
  body,
});

export const serverError = (): HttpResponse<any> => ({
  statusCode: 500,
  body: new ServerError(),
});

export const created = (body: any): HttpResponse<any> => ({
  statusCode: 201,
  body,
});
