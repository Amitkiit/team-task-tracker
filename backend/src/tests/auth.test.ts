import request from "supertest";

import app from "../app";

describe(
  "Authentication APIs",
  () => {

    test(
      "Register User",
      async () => {

        const response =
        await request(app)

        .post(
          "/api/auth/register"
        )

        .send({

          name: "Admin",

          email:
          "admin@test.com",

          password:
          "Admin123",

          organizationName:
          "My Company"

        });

        expect(
          response.status
        ).toBe(201);

      }
    );

    test(
      "Login User",
      async () => {

        await request(app)

        .post(
          "/api/auth/register"
        )

        .send({

          name: "Admin",

          email:
          "admin2@test.com",

          password:
          "Admin123",

          organizationName:
          "My Company"

        });

        const response =
        await request(app)

        .post(
          "/api/auth/login"
        )

        .send({

          email:
          "admin2@test.com",

          password:
          "Admin123"

        });

        expect(
          response.status
        ).toBe(200);

        expect(
          response.body
        ).toHaveProperty(
          "accessToken"
        );

      }
    );

  }
);