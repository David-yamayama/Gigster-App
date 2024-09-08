const request = require("supertest");
const app = require("../app");

describe("User Auth Tests", () => {
  let token;

  // Test user signup
  describe("POST /users/signup", () => {
    it("should successfully register a new user", async () => {
      const response = await request(app).post("/users/signup").send({
        username: "newuser",
        password: "newpassword",
        email: "newuser@test.com",
        firstname: "New",
        lastname: "User",
        birthdate: "1990-01-01",
        phoneNumber: "1234567890",
        isArtist: true,
        isHost: false,
      });

      console.log("Response body:", response.body);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("result", true);
      expect(response.body.data).toHaveProperty("username", "newuser");
    });

    it("should return an error if the user already exists", async () => {
      const response = await request(app).post("/users/signup").send({
        username: "newuser",
        password: "newpassword",
        email: "newuser@test.com",
        firstname: "New",
        lastname: "User",
        birthdate: "1990-01-01",
        phoneNumber: "1234567890",
        isArtist: true,
        isHost: false,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("result", false);
      expect(response.body).toHaveProperty("error", "User already exists");
    });
  });

  // Test user signin
  describe("POST /users/signin", () => {
    beforeAll(async () => {
      await request(app).post("/users/signup").send({
        username: "signinuser",
        password: "password123",
        email: "signinuser@test.com",
        firstname: "Sign",
        lastname: "In",
        birthdate: "1990-01-01",
        phoneNumber: "1234567890",
        isArtist: true,
        isHost: false,
      });

      const response = await request(app).post("/users/signin").send({
        email: "signinuser@test.com",
        password: "password123",
      });
      token = response.body.data.token;
    });

    it("should successfully log in an existing user", async () => {
      const response = await request(app).post("/users/signin").send({
        email: "signinuser@test.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("result", true);
      expect(response.body.data).toHaveProperty("username", "signinuser");
    });

    it("should return an error for wrong credentials", async () => {
      const response = await request(app).post("/users/signin").send({
        email: "signinuser@test.com",
        password: "wrongpassword",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("result", false);
      expect(response.body).toHaveProperty(
        "error",
        "User not found or wrong password"
      );
    });

    // Test token refresh
    describe("POST /users/refresh", () => {
      it("should refresh the token", async () => {
        const signInResponse = await request(app).post("/users/signin").send({
          email: "signinuser@test.com",
          password: "password123",
        });
        const validToken = signInResponse.body.data.token;

        const response = await request(app)
          .post("/users/refresh")
          .send({ token: validToken });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("result", true);
        expect(response.body).toHaveProperty("token");
      });

      it("should return an error for an invalid token", async () => {
        const response = await request(app)
          .post("/users/refresh")
          .send({ token: "invalidtoken" });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("result", false);
        expect(response.body).toHaveProperty("error", "Invalid token");
      });
    });
  });
});
