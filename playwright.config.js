import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

import { AUTH_FILE, TEST_TIMEOUT, VIEWPORT } from "./utils/constants.js";

dotenv.config();

export default defineConfig({
    testDir: "./tests",
    timeout: TEST_TIMEOUT,
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: 1,
    reporter: [["html", { open: "never" }]],

    expect: {
        timeout: TEST_TIMEOUT,
    },

    use: {
        baseURL: process.env.BASE_URL,
        headless: false,
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        viewport: VIEWPORT,
        actionTimeout: TEST_TIMEOUT,
    },

    projects: [
        {
            name: "setup",
            testMatch: /auth\.setup\.js/,
            timeout: 0,
            use: {
                headless: false,
                actionTimeout: 0,
                navigationTimeout: 0,
            },
        },
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
                storageState: AUTH_FILE,
            },
        },
    ],
});
