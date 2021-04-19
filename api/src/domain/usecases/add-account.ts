import { AccountModel } from "domain/models/accounts";

export interface AccountData {
  name: string;
  email: string;
  password: string;
}

export interface AddAccount {
  add(account: AccountData): Promise<AccountModel>;
}
