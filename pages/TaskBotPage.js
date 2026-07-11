import { expect } from "@playwright/test";

export default class TaskBotPage {

    constructor(page) {
        this.page = page;

        this.searchActionsInput = page.getByPlaceholder("Search actions");

        this.messageBoxButton = page.getByRole("button", {
            name: /Message box/i,
        });

        // More resilient locator: find the textbox relative to the label text container
        this.messageDisplayInput = page
            .locator('label:has-text("Enter the message to display"), div:has-text("Enter the message to display"), span:has-text("Enter the message to display")')
            .locator('xpath=following::input[@type="text" or @role="textbox" or @name] | xpath=descendant::input[@type="text" or @role="textbox" or @name] | xpath=descendant::textarea | xpath=descendant::*[@role="textbox"]')
            .first();


        this.saveButton = page.getByRole("button", {
            name: "Save",
        });

        this.gotItButton = page.getByRole("button", {
            name: "Got it",
        });
    }

    async addMessageBox() {
        await expect(this.searchActionsInput).toBeVisible();

        await this.searchActionsInput.fill("message");

        await expect(this.messageBoxButton.first()).toBeVisible();

        await this.messageBoxButton.first().click();
    }

    async configureMessageBox(message) {
        await expect(this.messageDisplayInput).toBeVisible({ timeout: 120000 });
        await this.messageDisplayInput.fill(message);
    }


    async saveAutomation() {
        await this.saveButton.click();
    }

    async confirmSave() {
        if (await this.gotItButton.isVisible()) {
            await this.gotItButton.click();
        }
    }
}