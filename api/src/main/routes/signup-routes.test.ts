import request from "supertest";

import app from "main/config/app";
import { accountRequestData } from "presentation/controllers/signup/mocks";
import { MongoHelper } from "infra/db/mongodb/helpers/mongo-helpers";
import { AccountMongoRepository } from "infra/db/mongodb/account-repository/account";

describe("Signup Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    const collection = MongoHelper.getColllection(
      AccountMongoRepository.COLLECTION_NAME
    );
    await collection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.close();
  });

  it("should return an account on success", async () => {
    await request(app)
      .post("/api/v1/signup")
      .send(accountRequestData)
      .expect(201);
  });
});
