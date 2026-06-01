import dotenv from "dotenv";

dotenv.config({
  path: ".env"
});

import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

jest.setTimeout(30000);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {

  mongoServer =
    await MongoMemoryServer.create();

  const uri =
    mongoServer.getUri();

  await mongoose.connect(uri);

});

afterAll(async () => {

  await mongoose.disconnect();

  await mongoServer.stop();

});

afterEach(async () => {

  const collections =
    mongoose.connection.collections;

  for (const key in collections) {

    await collections[key].deleteMany({});

  }

});