import dotenv from "dotenv";
import "@testing-library/jest-dom";

dotenv.config({ path: ".env.test" });

beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => { });
    jest.spyOn(console, "warn").mockImplementation(() => { });
});

afterAll(() => {
    jest.restoreAllMocks();
});