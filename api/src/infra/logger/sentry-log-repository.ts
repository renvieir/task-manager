import * as Sentry from "@sentry/node";
import { LogErrorRepository } from "data/protocols/log-error-repository";
import { ServerError } from "presentation/errors";

export class SentryErrorRepository implements LogErrorRepository {
  constructor(dsn: string, options?: any) {
    Sentry.init({
      dsn,
      ...options,
    });
  }

  async log(error: ServerError): Promise<void> {
    Sentry.captureException(error.error);
  }
}
