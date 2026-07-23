const request = require("supertest");
const bcrypt = require("bcryptjs");
const User = require("../../src/models/User");
const app = require("../../src/app");

describe("POST /api/auth/login", () => {

    it("should login successfully with valid credentials", async () => {

        // Arrange (Setup)
        const hashedPassword = await bcrypt.hash("123456", 10);

        await User.create({
            name: "Kishan",
            email: "kishan@gmail.com",
            password: hashedPassword,
        });

        // Act
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "kishan@gmail.com",
                password: "123456",
            });

        // Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.token).toBeDefined();
        expect(response.body.user.email).toBe("kishan@gmail.com");

    });

});