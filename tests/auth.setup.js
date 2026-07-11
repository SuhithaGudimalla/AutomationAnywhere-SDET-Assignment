import { test as setup } from "@playwright/test";

import LoginPage from "../pages/LoginPage.js";
import { saveAuthState } from "../utils/auth.js";
import { AUTH_FILE } from "../utils/constants.js";

setup.setTimeout(600000);

setup("authenticate", async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    console.log(`
========================================
MANUAL LOGIN

1. Enter Username
2. Enter Password
3. Solve CAPTCHA
4. Click Login
5. Wait until Dashboard loads

Authentication will be saved automatically.
========================================
`);

    await loginPage.waitForLoginComplete();

    await saveAuthState(page.context());

    console.log(`Saved authentication to ${AUTH_FILE}`);

});