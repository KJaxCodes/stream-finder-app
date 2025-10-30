import mongoose from "mongoose";
import { NextRequest } from "next/server";
import * as authHelpers from "../../src/app/api/helpers/authHelpers";
import { MongoMemoryServer } from "mongodb-memory-server";
import axios from "axios";
import User from "../../src/models/userModel";
import Movie from "../../src/models/movieModel";
// Route imports
import { POST as POSTSearchWatchmodeMovies } from "../../src/app/api/movies/search/route";
// helpers
import { createMockMovie } from "../helpers/mockData";

const mockWatchmodeResponse = {
    data: {
        title_results: [
            {
                id: 1,
                name: "Mock Movie 1",
                year: 2020,
                tmdb_type: "movie",
                type: "movie"
            },
            {
                id: 2,
                name: "Mock Movie 2",
                year: 2021,
                tmdb_type: "movie",
                type: "movie"
            },
        ],
    },
};

describe("placeholder for User search API routes with Auth tests", () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        try {
            mongoServer = await MongoMemoryServer.create();
            const URI = mongoServer.getUri();
            process.env.MONGO_URI = URI;
            process.env.WATCHMODE_API_KEY = "API_KEY_FOR_TESTING_PURPOSES";
            await mongoose.connect(process.env.MONGO_URI);
        } catch (error) {
            console.error(
                "Error setting up test database from MongoMemoryServer:",
                error
            );
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

    it("Should allow access to search for movies with authentication and return results", async () => {
        // setup mock data in the DB for the test
        // test user
        const user = await User.create({
            email: "mock@mail.com",
            password: "password",
        });
        // spy on / intercept auth
        // this is in memory
        jest.spyOn(authHelpers, "verifyServerAuth").mockResolvedValue({ id: String(user._id), email: user.email });
     
        // mock axios call to watchmode
        jest.spyOn(axios, "get").mockResolvedValueOnce(mockWatchmodeResponse);

        const request = new NextRequest("http://localhost:3000/api/movies/search", {
            method: "POST",
            body: JSON.stringify({ query: "Mock" }),
        });

        const response = await POSTSearchWatchmodeMovies(request);
        const data = await response.json();

        // test response status
        expect(response.status).toBe(200);
        
        // the next 3 expects are for the structure of the response data
        expect(data).toHaveProperty("message");
        expect(data).toHaveProperty("movies");
        expect(data).toHaveProperty("errors");

        // test data content
        expect(Array.isArray(data.movies)).toBe(true);
        expect(data.movies.length).toBe(2);
        expect(data.errors).toBeNull();
    });
});