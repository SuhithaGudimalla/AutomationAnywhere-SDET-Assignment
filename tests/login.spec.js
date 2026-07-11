const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test('Open Automation Anywhere Home', async ({ page }) => {

    const login = new LoginPage(page);

    await login.gotoHome();

    await expect(page).toHaveURL(/automationanywhere/);

});