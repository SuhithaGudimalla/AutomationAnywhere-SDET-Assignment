import { chromium } from "@playwright/test";
import dotenv from "dotenv";

import { AUTH_FILE } from "./constants.js";
import { authFileExists } from "./auth.js";

dotenv.config();

async function dumpAccessibleSnapshot(page, label) {
    const snapshot = await page.locator("body").ariaSnapshot();
    console.log(`\n========== ${label} ==========\n`);
    console.log(snapshot);
}

async function main() {
    if (!authFileExists()) {
        console.error(`Auth file not found: ${AUTH_FILE}`);
        console.error("Run: npm run test:setup");
        process.exit(1);
    }

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        baseURL: process.env.BASE_URL,
        storageState: AUTH_FILE,
    });
    const page = await context.newPage();

    await page.goto("/");
    await page.getByRole("link", { name: "Automation", exact: true }).waitFor({ state: "visible" });
    await dumpAccessibleSnapshot(page, "Dashboard");
    await dumpAccessibleSnapshot(page, "Automation Page");

    await page.getByRole("button", { name: "Create" }).click();
    await dumpAccessibleSnapshot(page, "Create Menu");

    await browser.close();
}

main();
