import { AccountModel } from "domain/models/accounts";
import { AccountData } from "domain/usecases/add-account";
import { Request, Response } from "express";

import { Controller, HttpRequest } from "presentation/protocols";

export const adaptRoute = (
  controller: Controller<AccountData, AccountModel>
) => async (req: Request, res: Response) => {
  const httpRequest: HttpRequest<AccountData> = {
    body: req.body,
  };
  const httpResponse = await controller.handle(httpRequest);
  const { statusCode, body } = httpResponse;
  res.status(statusCode).json(body);
};
