import { AccountMongoRepository } from "../account-repository/account";
import { MongoHelper as sut } from "../helpers/mongo-helpers";

describe("Name of the group", () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await sut.close();
  });

  it("should reconnect if loose connection", async () => {
    sut.close();
    const collection = await sut.getColllection(
      AccountMongoRepository.COLLECTION_NAME
    );
    expect(collection).toBeTruthy();
  });
});
