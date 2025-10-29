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
    let mongoServer: MongoMemoryServer;

     beforeAll(async () => {
            try {
                mongoServer = await MongoMemoryServer.create();
                const URI = mongoServer.getUri();
                process.env.MONGO_URI = URI;
                process.env.WATCHMODE_API_KEY = "API_KEY_FOR_TESTING_PURPOSES";
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

        it("Should allow access to search for movies with authentication and return results", async () => {
            // setup mock data in the DB for the test
            // test user 
            const user = await User.create({ email: "mock@mail.com", password: "password" });
            // spy on / intercept auth
            jest.spyOn(authHelpers, "verifyServerAuth").mockResolvedValue({ id: String(user._id), email: user.email });
            // how do I handle the api key?

            // mock axios call to watchmode
            const mockWatchmodeResponse = {
                data: {
                    title_results: [
                        {
                            id: 1,
                            title: "Mock Movie 1",
                            year: 2020,
                            type: "movie",
                        },
                        {
                            id: 2,
                            title: "Mock Movie 2",
                            year: 2021,
                            type: "movie",
                        },
                    ],
                },
            };
            jest.spyOn(axios, "get").mockResolvedValueOnce(mockWatchmodeResponse);

            const request = new NextRequest("http://localhost:3000/api/movies/search", {
                method: "POST",
                body: JSON.stringify({ query: "Mock" }),
            });

            const response = await POSTSearchWatchmodeMovies(request);
            const data = await response.json();

            // this will expect a 200 OK response
            expect(response.status).toBe(200);
            expect(Array.isArray(data)).toBe(true);
            expect(data.length).toBe(2);
            expect(data[0]).toHaveProperty("id", 1);
            expect(data[0]).toHaveProperty("title", "Mock Movie 1");
            expect(data[1]).toHaveProperty("id", 2);
            expect(data[1]).toHaveProperty("title", "Mock Movie 2");
        });

});