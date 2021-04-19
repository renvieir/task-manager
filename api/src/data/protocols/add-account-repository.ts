import { AccountData } from "../../domain/usecases/add-account";
import { AccountModel } from "../../domain/models/accounts";

export interface AddAccountRepository {
  add(accountData: AccountData): Promise<AccountModel>;
}
