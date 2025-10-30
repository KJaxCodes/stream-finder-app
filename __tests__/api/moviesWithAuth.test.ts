import mongoose from "mongoose";
import { NextRequest } from "next/server";
import * as authHelpers from "../../src/app/api/helpers/authHelpers";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../../src/models/userModel";
import Movie from "../../src/models/movieModel";
// Route imports
import { GET as GETUserWatchlist } from "../../src/app/api/movies/watchlist/route";
// helpers 
import { createMockMovie } from "../helpers/mockData";

describe("User Movie API routes with Auth tests", () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        try {
            mongoServer = await MongoMemoryServer.create();
            const URI = mongoServer.getUri();
            process.env.MONGO_URI = URI;
            await mongoose.connect(process.env.MONGO_URI);
        } catch (error) {
            console.error("Error setting up test database from MongoMemoryServer:", error);
        }
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    afterAll(async () => {
        await mongoose.connection.db?.dropDatabase();
        await mongoose.disconnect();
        await mongoServer.stop();
        console.log("Cleaned up after watchlist no auth tests");
    });

    it("Should return a User watchlist if a user is authenticated", async () => {
        // setup mock data in the DB for the test
        // test user 
        const user = await User.create({ email: "test@mail.com", password: "password" });
        // test Movie models (simulates the playlist)
        const { _id } = user;
        const movies = await Movie.create([createMockMovie(String(_id)), createMockMovie(String(_id))]);
        user.watchlist = movies.map((movie) => movie._id);
        await user.save();

        // spy on / intercept auth
        jest.spyOn(authHelpers, "verifyServerAuth").mockResolvedValue({ id: String(user._id), email: user.email });

        const request = new NextRequest("http://localhost:3000/api/movies/watchlist", {
            method: "GET",
        });

        const response = await GETUserWatchlist(request);
        const data = await response.json();

        // test response status
        expect(response.status).toBe(200);
        // the next 3 expects are for the structure of the response data
        expect(data).toHaveProperty("message");
        expect(data).toHaveProperty("watchlist");
        expect(data).toHaveProperty("errors");

        // test data content
        expect(Array.isArray(data.watchlist)).toBe(true);
        expect(data.watchlist.length).toBe(2);
        expect(data.errors).toBeNull();
    });

});
