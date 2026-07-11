import { test } from "@playwright/test";

import LoginPage from "../pages/LoginPage.js";
import DashboardPage from "../pages/DashboardPage.js";

test.describe("Login & Dashboard", () => {

    test("should load dashboard using saved authentication state", async ({ page }) => {

        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await loginPage.navigate();

        await dashboardPage.verifyDashboardLoaded();

    });

});