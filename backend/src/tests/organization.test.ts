import request
from "supertest";

import app
from "../app";

describe(
 "Organization",
 () => {

 test(
  "Get Organization",
  async () => {

   const response =
   await request(app)
   .get(
    "/api/organizations"
   );

   expect(
    response.status
   )
   .toBeDefined();

  }
 );

 });