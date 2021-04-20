import { Collection, MongoClient } from "mongodb";

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect(uri: string): Promise<void> {
    this.uri = uri;
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async close() {
    this.client.close();
    this.client = null;
  },

  async getColllection(name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri);
    }
    return this.client.db().collection(name);
  },

  map(collection: any): any {
    const { _id: id, ...rest } = collection;
    return {
      ...rest,
      id,
    };
  },
};
