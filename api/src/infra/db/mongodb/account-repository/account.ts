import { AddAccountRepository } from "data/protocols/add-account-repository";
import { AccountModel } from "domain/models/accounts";
import { AccountData } from "domain/usecases/add-account";
import { MongoHelper } from "../helpers/mongo-helpers";

export class AccountMongoRepository implements AddAccountRepository {
  static COLLECTION_NAME = "accounts";

  async add(accountData: AccountData): Promise<AccountModel> {
    const collection = await MongoHelper.getColllection(
      AccountMongoRepository.COLLECTION_NAME
    );
    const result = await collection.insertOne(accountData);
    return MongoHelper.map(result.ops[0]);
  }
}
