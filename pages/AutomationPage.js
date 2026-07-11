import { expect } from "@playwright/test";

export default class AutomationPage {

    constructor(page) {
        this.page = page;

        this.createButton = page
            .getByRole("heading", { name: "Automation Create Manage" })
            .getByLabel("Create");

        this.taskBotButton = page.getByRole("button", { name: /Task Bot/ });

        this.botNameInput = page.getByRole("textbox", { name: "Name" });

        this.createAndEditButton = page.getByRole("button", {
            name: "Create & edit",
        });

        this.searchActionsInput = page.getByPlaceholder("Search actions");
    }

    async createTaskBot(botName) {
        await expect(this.createButton).toBeVisible();
        await this.createButton.click();

        await expect(this.taskBotButton).toBeVisible();
        await this.taskBotButton.click();

        await expect(this.botNameInput).toBeVisible();
        await this.botNameInput.fill(botName);

        await expect(this.createAndEditButton).toBeVisible();
        await this.createAndEditButton.click();

        await expect(this.searchActionsInput).toBeVisible({
            timeout: 30000,
        });
    }

}
