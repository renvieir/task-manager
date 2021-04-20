import env from "./config/env";

import { MongoHelper } from "../infra/db/mongodb/helpers/mongo-helpers";

const { port, mongoUrl } = env;

console.log(`connecting to mongo at ${mongoUrl}`);
MongoHelper.connect(mongoUrl)
  .then(async () => {
    const app = (await import("./config/app")).default;
    app.listen(port, () =>
      console.log(`server runing at http://localhost:${port}`)
    );
  })
  .catch((error) => console.error(error));
