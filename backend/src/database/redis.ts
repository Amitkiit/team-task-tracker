import {
 createClient
}
from "redis";

const redisClient =
createClient({

 socket: {

  host:
  process.env.REDIS_HOST
  || "localhost",

  port:
  Number(
   process.env.REDIS_PORT
   || 6379
  )

 }

});

redisClient.on(
 "error",
 (error) => {

  console.error(
   "Redis Error:",
   error
  );

 }
);

redisClient.on(
 "connect",
 () => {

  console.log(
   "Redis Connected"
  );

 }
);

export const connectRedis =
async () => {

 if (
  !redisClient.isOpen
 ) {

  await redisClient.connect();

 }

 return redisClient;
};

export default redisClient;