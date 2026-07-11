import { expect } from "@playwright/test";

export default class DashboardPage {
    constructor(page) {
        this.page = page;

        this.automationMenu = page.getByRole("link", {
            name: "Automation",
            exact: true,
        });

        this.aiMenu = page.getByRole("link", {
            name: "AI",
            exact: true,
        });

        this.documentAutomationMenu = page.getByRole("link", {
            name: "Document Automation",
            description: "Document Automation",
        });

        this.createButton = page
            .getByRole("heading", { name: "Automation Create Manage" })
            .getByLabel("Create");
    }

    async verifyDashboardLoaded() {
        await expect(this.automationMenu).toBeVisible();
    }

    async openAutomation() {
        await this.automationMenu.click();
    }

    async clickCreate() {
        await this.createButton.click();
    }

    async openAI() {
        await this.aiMenu.click();
    }

    async openDocumentAutomation() {
        await this.documentAutomationMenu.click();
    }
}