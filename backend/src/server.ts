import "./config/env";

import http from "http";

import app from "./app";

import {
  connectMongo
} from "./database/mongodb";

import {
  connectRedis
} from "./database/redis";

import {
  initSocket
} from "./socket";

const PORT =
process.env.PORT || 5000;

const startServer =
async () => {

  try {

    await connectMongo();

    await connectRedis();

    const server =
      http.createServer(app);

    initSocket(server);

    server.listen(
      PORT,
      () => {

        console.log(
          `Server running on port ${PORT}`
        );
      }
    );

  } catch (error) {

    console.error(error);

    process.exit(1);
  }
};

startServer();