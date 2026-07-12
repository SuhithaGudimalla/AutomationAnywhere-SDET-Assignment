import { test } from "@playwright/test";

import LoginPage from "../pages/LoginPage.js";
import DashboardPage from "../pages/DashboardPage.js";
import AutomationPage from "../pages/AutomationPage.js";
import TaskBotPage from "../pages/TaskBotPage.js";
import { automationData } from "../test-data/automationData.js";
import { generateUniqueName } from "../utils/helper.js";

test.describe("Use Case 1 - Task Bot", () => {

    test("Create Task Bot with Message Box", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const automationPage = new AutomationPage(page);
        const taskBotPage = new TaskBotPage(page);

        const botName = generateUniqueName(automationData.taskBot.namePrefix);

        await loginPage.navigate();
        await dashboardPage.verifyDashboardLoaded();

        await dashboardPage.openAutomation();
        await automationPage.createTaskBot(botName);

        await taskBotPage.addMessageBox();
        await taskBotPage.verifyRightPanel();
        await taskBotPage.configureMessageBox(automationData.taskBot.messageDisplay);
        await taskBotPage.saveAutomation();
        await taskBotPage.confirmSave();
    });

});
