import mongoose from "mongoose";
import { NextRequest } from "next/server";
import * as authHelpers from "../../src/app/api/helpers/authHelpers";
import { MongoMemoryServer } from "mongodb-memory-server";
// Route imports
import { POST as POSTSearchMovies } from "../../src/app/api/movies/search/route";
import { POST as POSTSearchMovieDetails } from "../../src/app/api/movies/search_movie_details/route";

describe("User search API routes without Auth tests", () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        try {
            mongoServer = await MongoMemoryServer.create();
            const URI = mongoServer.getUri();
            process.env.MONGO_URI = URI;
            // process.env.JWT_SECRET = "testsecret";
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


    it("Should not allow access to search for movies without authentication", async () => {
        jest.spyOn(authHelpers, "verifyServerAuth").mockResolvedValueOnce(null);

        const request = new NextRequest("http://localhost:3000/api/movies/search", {
            method: "POST",
            body: JSON.stringify({ query: "Halloween" }),
        });

        const response = await POSTSearchMovies(request);
        const data = await response.json();

        // this will expect a 401 Unauthorized response
        expect(response.status).toBe(401);
        expect(data).toHaveProperty("message");
        expect(data).toHaveProperty("movies");
        expect(Array.isArray(data.movies)).toBe(true);
        expect(data.movies.length).toBe(0);
    });

    it("Should not allow access to search for movie details without authentication", async () => {
        jest.spyOn(authHelpers, "verifyServerAuth").mockResolvedValueOnce(null);

        const request = new NextRequest("http://localhost:3000/api/movies/search_movie_details", {
            method: "POST",
            body: JSON.stringify({ watchmodeId: 12345 }),
        });

        const response = await POSTSearchMovieDetails(request);
        const data = await response.json();
        // this will expect a 401 Unauthorized response
        expect(response.status).toBe(401);
        expect(data).toHaveProperty("message");
        expect(data).toHaveProperty("movieData");
        expect(data.movieData).toBeNull();
    });

});