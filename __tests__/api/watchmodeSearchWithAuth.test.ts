//need a user
//need an api key
//make a search request
//expect unauthorized response

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

describe("placeholder for User search API routes with Auth tests", () => {
    // let mongoServer: MongoMemoryServer;

    //  beforeAll(async () => {
    //         try {
    //             mongoServer = await MongoMemoryServer.create();
    //             const URI = mongoServer.getUri();
    //             process.env.MONGO_URI = URI;
    //             // process.env.JWT_SECRET = "testsecret";
    //             await mongoose.connect(process.env.MONGO_URI);
    //         } catch (error) {
    //             console.error("Error setting up test database from MongoMemoryServer:", error);
    //         }
    //     });

    //     afterEach(() => {
    //         jest.clearAllMocks();
    //     });


    //     afterAll(async () => {
    //         await mongoose.connection.db?.dropDatabase();
    //         await mongoose.disconnect();
    //         await mongoServer.stop();
    //         console.log("Cleaned up after watchlist no auth tests");
    //     });

    it("Should run a test", () => {
        expect(1 === 1);
    });

});