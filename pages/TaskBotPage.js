import { expect } from "@playwright/test";

export default class TaskBotPage {

    constructor(page) {
        this.page = page;

        this.searchActionsInput = page.getByPlaceholder("Search actions");

        this.messageBoxCategory = page.getByRole("button", {
            name: /Message box/,
        });

        this.messageBoxAction = page.getByRole("button", {
            name: "Message box",
            exact: true,
        });

        this.messageDisplayInput = page.getByRole("textbox").last();

        this.saveButton = page.getByRole("button", {
            name: "Save",
        });

        this.gotItButton = page.getByRole("button", {
            name: "Got it",
        });
    }

    async addMessageBox() {

        console.log("Searching Message Box...");

        await expect(this.searchActionsInput).toBeVisible({
            timeout: 60000,
        });

        await this.searchActionsInput.fill("message");

        await expect(this.messageBoxCategory.first()).toBeVisible({
            timeout: 60000,
        });

        await this.messageBoxCategory.first().click();

        await expect(this.messageBoxAction).toBeVisible({
            timeout: 60000,
        });

        await this.messageBoxAction.click();
    }

    async configureMessageBox(message) {

        console.log("Configuring Message Box...");

        await expect(this.messageDisplayInput).toBeVisible({
            timeout: 60000,
        });

        await this.messageDisplayInput.fill(message);
    }

    async saveAutomation() {

        console.log("Saving...");

        await this.saveButton.click();
    }

    async confirmSave() {

        try {

            await expect(this.gotItButton).toBeVisible({
                timeout: 10000,
            });

            await this.gotItButton.click();

        } catch {

            console.log("No confirmation popup.");

        }
    }

}