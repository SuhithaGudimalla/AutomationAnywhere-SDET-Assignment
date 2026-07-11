import { expect } from "@playwright/test";

export default class DashboardPage {

    constructor(page) {
        this.page = page;

        this.automationMenu = page.getByRole("link", {
            name: "Automation",
            exact: true,
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

}
