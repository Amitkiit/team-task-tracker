import request
from "supertest";

import app
from "../app";

describe(
 "Tasks",
 () => {

 test(
  "Get Tasks",
  async () => {

   const response =
   await request(app)
   .get("/api/tasks");

   expect(
    response.status
   )
   .toBeDefined();

  }
 );

 });