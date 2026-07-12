import { expect } from "@playwright/test";

export default class LearningInstancePage {

    constructor(page) {
        this.page = page;
        this.iframe = page.locator("iframe").first();
    }

    frame() {
        return this.iframe.contentFrame();
    }

    async startUserDefinedLearningInstance(name) {
        await expect(this.iframe).toBeVisible();

        await this.frame()
            .getByRole("button", { name: "Create Learning Instance" })
            .click();

        await this.frame()
            .getByRole("textbox", { name: "Name" })
            .fill(name);

        await this.selectUserDefinedDocumentType();

        await this.frame()
            .getByRole("button", { name: "Next" })
            .click();
    }

    async selectUserDefinedDocumentType() {
        const frame = this.frame();

        await frame.getByRole("button").nth(2).click();

        for (let attempt = 0; attempt < 6; attempt++) {
            const userDefinedCheckbox = frame
                .locator('label[data-path="CheckboxInput.container"]')
                .filter({ has: frame.getByText("User-defined", { exact: true }) });

            if (await userDefinedCheckbox.isVisible()) {
                await userDefinedCheckbox.click();
                return;
            }

            await frame.getByRole("button").nth(2).click();
        }

        await frame
            .locator('label[data-path="CheckboxInput.container"]')
            .filter({ has: frame.getByText("User-defined", { exact: true }) })
            .click();
    }

    async uploadDocument(filePath) {
        const fileInput = this.frame().locator('input[type="file"]');
        if (await fileInput.count() > 0) {
            await fileInput.setInputFiles(filePath);
        }
    }

    async addFormField({ name, label, type }) {
        const frame = this.frame();

        await frame.locator("button").filter({ hasText: "Add a field" }).click();
        await frame.getByRole("textbox", { name: "Field name" }).fill(name);
        await frame.getByRole("textbox", { name: "Field label" }).fill(label);

        if (type) {
            await this.selectFieldType(type);
        }

        await frame.getByRole("button", { name: "Add a field" }).first().click();
    }

    async selectFieldType(type) {
        const frame = this.frame();

        await frame
            .locator(".field-label__content > .rio-select-input > div > .rio-focus.rio-focus--inset_1px > .rio-select-input-query__single-selection")
            .click();

        await frame
            .locator("div")
            .filter({ hasText: new RegExp(`^${type}$`) })
            .nth(1)
            .click();
    }

    async addFormFields(fields) {
        for (const field of fields) {
            await this.addFormField(field);
        }
    }

    async addTableField({ name, label, type }) {
        const frame = this.frame();

        await frame.getByRole("tab", { name: "Table fields" }).click();
        await frame.locator("button").filter({ hasText: "Add a field" }).click();
        await frame.getByRole("textbox", { name: "Field name" }).fill(name);
        await frame.getByRole("textbox", { name: "Field label" }).fill(label);

        if (type === "Number") {
            await frame.locator("div").filter({ hasText: /^Text$/ }).nth(5).click();
            await frame.locator("div").filter({ hasText: /^Number$/ }).nth(1).click();
        } else if (type) {
            await this.selectFieldType(type);
        }

        await frame.getByRole("button", { name: "Add a field" }).first().click();
    }

    async addTableFields(fields) {
        for (const field of fields) {
            await this.addTableField(field);
        }
    }

    async createFieldRule({ fieldName, value, message }) {
        const frame = this.frame();

        await frame.getByRole("tab", { name: "Form fields" }).click();
        await frame
            .locator("div")
            .filter({ hasText: new RegExp(`^${fieldName}$`) })
            .first()
            .click();

        await frame.getByRole("tab", { name: "Field Rules" }).click();
        await frame.getByRole("button", { name: "Add Rule" }).click();
        await frame.getByRole("button", { name: /Field Rule/ }).click();
        await frame.getByRole("textbox", { name: "Starts with" }).fill(value);

        await frame.getByRole("textbox", { name: "Select Action Type" }).click();
        await frame
            .locator("div")
            .filter({ hasText: /^show error$/i })
            .nth(1)
            .click();

        await frame.getByRole("textbox", { name: "Action Value" }).fill(message);
    }

    async save() {
        await this.frame()
            .getByRole("button", { name: "Create" })
            .click();
    }

    async verifySaveSuccess(instanceName) {
        await expect(this.frame().getByText(instanceName)).toBeVisible();
    }

}
