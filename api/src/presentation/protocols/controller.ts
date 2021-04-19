import { HttpRequest, HttpResponse } from "./http";

export interface Controller<T, U> {
  handle(httpRequest: HttpRequest<T>): Promise<HttpResponse<U>>;
}
