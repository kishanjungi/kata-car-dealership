const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../../src/app");

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();

    await mongoServer.stop();
});

describe("POST /api/auth/register", () => {

    it("should register a new user", async () => {

        const response = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Kishan",
                email: "kishan@gmail.com",
                password: "123456"
            });

        expect(response.statusCode).toBe(201);

    });

});