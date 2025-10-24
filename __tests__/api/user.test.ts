import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { MongoMemoryServer } from "mongodb-memory-server";

import { POST as POSTUserSignup } from "../../src/app/api/users/signup/route";
import { POST as POSTUserLogin } from "../../src/app/api/users/login/route";

import User from "../../src/models/userModel";

describe("User Model and /users API tests", () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        console.log("Will run before tests");
        mongoServer = await MongoMemoryServer.create();
        const URI = mongoServer.getUri();
        console.log("Our temp test database URI: ", URI);
        process.env.MONGO_URI = URI;
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Test database running at: ", process.env.MONGO_URI);
    });

    afterAll(async () => {
        await mongoose.connection.db?.dropDatabase();
        await mongoose.disconnect();
        await mongoServer.stop();
        console.log("Cleaned up");
    })

    it("Should run a test", () => {
        expect(1 === 1);
    });

    // Successful signup with valid data
    it("Should successfully signup a User with correct User data", async () => {
        const request = new NextRequest("http://localhost:3000/api/signup", {
            method: "POST",
            body: JSON.stringify({
                email: "testuser@mail.com",
                password: "password"
            })
        });

        // check that users === 0 before signup
        let users = await User.find({});
        expect(users.length).toBe(0);

        const res = await POSTUserSignup(request);
        const data = await res.json();

        // check that user is created in the database
        users = await User.find({});
        expect(users.length).toBe(1);

        expect(res.status).toBe(201);
    });
    // Fail signup without email
    it("Should not allow signup without email", async () => {

        const request = new NextRequest("http://localhost:3000/api/signup", {
            method: "POST",
            body: JSON.stringify({
                password: "password123"
            })
        });

        const res = await POSTUserSignup(request);
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.message).toBe("Email is required");
    });

    // Fail signup without password
    it("Should not allow signup without password", async () => {

        const request = new NextRequest("http://localhost:3000/api/signup", {
            method: "POST",
            body: JSON.stringify({
                email: "testuser@mail.com"
            })
        });

        const res = await POSTUserSignup(request);
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.message).toBe("Password is required");
    });

    it("Should not allow signup with an existing email", async () => {

        // First, create a user
        const firstRequest = new NextRequest("http://localhost:3000/api/signup", {
            method: "POST",
            body: JSON.stringify({
                email: "duplicateuser@mail.com",
                password: "password123"
            })
        });
        await POSTUserSignup(firstRequest);

        // Attempt to create another user with the same email
        const secondRequest = new NextRequest("http://localhost:3000/api/signup", {
            method: "POST",
            body: JSON.stringify({
                email: "duplicateuser@mail.com",
                password: "password123"
            })
        });

        const res = await POSTUserSignup(secondRequest);
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.message).toBe("User already exists");

        let users = await User.find({});
        console.log("Users in DB after duplicate signup attempt:", users);
        expect(users.length).toBe(2); // Two users should exist: one from previous test and one from this test
    });
});