import { expect } from "@playwright/test";

export default class TaskBotPage {

    constructor(page) {
        this.page = page;

        this.searchActionsInput = page.getByPlaceholder("Search actions");

        this.messageBoxCategory = page.getByRole("button", {
            name: /Message box/i,
        });

        this.messageBoxAction = page.getByRole("button", {
            name: "Message box",
            exact: true,
        });

        this.messageBoxPanel = page.getByRole("banner").filter({
            hasText: "Message box",
        });

        this.messageDisplayInput = page.getByRole("textbox").nth(2);

        this.saveButton = page.getByRole("button", { name: "Save" });

        this.gotItButton = page.getByRole("button", { name: "Got it" });
    }

    async addMessageBox() {
        await expect(this.searchActionsInput).toBeVisible();
        await this.searchActionsInput.fill("message");

        await this.messageBoxCategory.first().click();
        await this.messageBoxAction.dblclick();
    }

    async verifyRightPanel() {
        await expect(this.page.getByText("Enter the message to display")).toBeVisible();
        await expect(this.page.getByText("Enter the message box window title")).toBeVisible();
    }

    async configureMessageBox(message) {
        await this.messageBoxPanel.click();
        await this.messageDisplayInput.click();
        await this.messageDisplayInput.fill(message);
    }

    async saveAutomation() {
        await expect(this.saveButton).toBeEnabled();
        await this.saveButton.click();
    }

    async confirmSave() {
        if (await this.gotItButton.isVisible()) {
            await this.gotItButton.click();
        }
    }

}
