const dotenv = require("dotenv");
dotenv.config({ path: ".env.test" });
require("@testing-library/jest-dom");


beforeAll(() => {
    // silence all console.log / info / warn
    // jest.spyOn(console, 'log').mockImplementation(() => { });
    // jest.spyOn(console, 'info').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

afterAll(() => {
    // restore console.log / info / warn
    jest.restoreAllMocks();
});