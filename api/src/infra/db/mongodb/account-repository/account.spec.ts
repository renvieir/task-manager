import { MongoHelper } from "../helpers/mongo-helpers";
import { accountData } from "presentation/controllers/signup/mocks";
import { AccountMongoRepository } from "./account";

describe("Name of the group", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    const collection = await MongoHelper.getColllection(
      AccountMongoRepository.COLLECTION_NAME
    );
    await collection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.close();
  });

  const makeSut = (): AccountMongoRepository => new AccountMongoRepository();

  it("should return an account on success", async () => {
    const sut = makeSut();

    const account = await sut.add(accountData);

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toEqual(accountData.name);
    expect(account.email).toEqual(accountData.email);
    expect(account.password).toEqual(accountData.password);
  });
});
