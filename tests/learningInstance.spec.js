import { test } from "@playwright/test";

import DashboardPage from "../pages/DashboardPage.js";
import LearningInstancePage from "../pages/LearningInstancePage.js";
import LoginPage from "../pages/LoginPage.js";
import { automationData } from "../test-data/automationData.js";
import { generateUniqueName, resolveTestDataFile } from "../utils/helper.js";

test.describe("Use Case 2 — User Defined Learning Instance", () => {

    test("should create a learning instance with fields, rule, and document", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const learningInstancePage = new LearningInstancePage(page);

        const instanceName = generateUniqueName(
            automationData.learningInstance.namePrefix
        );

        const documentPath = resolveTestDataFile(
            automationData.learningInstance.documentFile
        );

        await loginPage.navigate();
        await dashboardPage.verifyDashboardLoaded();

        await dashboardPage.openAI();
        await dashboardPage.openDocumentAutomation();

        await learningInstancePage.startUserDefinedLearningInstance(instanceName);
        await learningInstancePage.uploadDocument(documentPath);

        await learningInstancePage.addFormFields(
            automationData.learningInstance.formFields
        );

        await learningInstancePage.addTableFields(
            automationData.learningInstance.tableFields
        );

        await learningInstancePage.createFieldRule(
            {
    fieldName: "invoice_number",
    value: "100",
    message: "Invalid value entered"
}
        );

        await learningInstancePage.save();
        await learningInstancePage.verifySaveSuccess(instanceName);
    });

});
