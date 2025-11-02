import mongoose from "mongoose";
import { NextRequest } from "next/server";
import * as authHelpers from "../../src/app/api/helpers/authHelpers";
import { MongoMemoryServer } from "mongodb-memory-server";
// Route imports
import { GET as GETUserWatchlist } from "../../src/app/api/movies/watchlist/route";

describe("User Movie watchlist route without Auth tests", () => {
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

    it("Should not allow access to watchlist without authentication", async () => {
        jest.spyOn(authHelpers, "verifyServerAuth").mockResolvedValueOnce(null);

        const request = new NextRequest("http://localhost:3000/api/movies/watchlist", {
            method: "GET",
        });

        const response = await GETUserWatchlist(request);
        const data = await response.json();

        // this will expect a 401 Unauthorized response
        expect(response.status).toBe(401);

        // the next 3 expects are for the structure of the response data
        expect(data).toHaveProperty("message");
        expect(data).toHaveProperty("watchlist");
        expect(data).toHaveProperty("errors");

        // test data content
        expect(Array.isArray(data.watchlist)).toBe(true);
        expect(data.watchlist.length).toBe(0);
        expect(Array.isArray(data.errors)).toBe(true);
        expect(data.errors.length).toBeGreaterThan(0);
    });

});