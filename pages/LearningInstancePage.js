import { expect } from "@playwright/test";

export default class LearningInstancePage {
    constructor(page) {
        this.page = page;

        // Entire Learning Instance UI is inside an iframe
        this.frame = page.locator("iframe").first().contentFrame();

        // Verified iframe locators (from provided codegen)
        this.createLearningInstanceButton =
            this.frame.getByRole("button", {
                name: "Create Learning Instance",
            });

        this.instanceNameInput = this.frame.getByRole("textbox", {
            name: "Name",
        });

        this.nextButton = this.frame.getByRole("button", {
            name: "Next",
        });

        this.searchInput = this.frame.getByRole("textbox", {
            name: "Search",
        });

        this.addFieldButton = this.frame
            .locator("button")
            .filter({ hasText: "Add a field" });

        this.fieldNameInput = this.frame.getByRole("textbox", {
            name: "Field name",
        });

        this.fieldLabelInput = this.frame.getByRole("textbox", {
            name: "Field label",
        });

        this.successMessage = this.frame.getByText(
            /success|created successfully|saved successfully/i
        );
    }

    // Keep Page Object Model method names as used by tests
    async startUserDefinedLearningInstance() {
        await this.createLearningInstanceButton.click();
    }

    async enterInstanceName(name) {
        await this.instanceNameInput.fill(name);
        await this.nextButton.click();
    }

    async uploadDocument(filePath) {
        // TODO: iframe locator for document upload not provided in verified codegen.
        throw new Error(
            "TODO: uploadDocument locator not verified for this UI"
        );
    }

    async addFormField(fieldName) {
        await this.searchInput.click();
        await this.addFieldButton.click();

        await this.fieldNameInput.fill(fieldName);
        await this.fieldLabelInput.fill(fieldName);
    }

    async addFormFields(fieldNames) {
        for (const fieldName of fieldNames) {
            await this.addFormField(fieldName);
        }
    }

    async addTableField(fieldName) {
        // TODO: table field flow not provided in verified codegen.
        throw new Error(
            "TODO: addTableField locator not verified for this UI"
        );
    }

    async addTableFields(fieldNames) {
        for (const fieldName of fieldNames) {
            await this.addTableField(fieldName);
        }
    }

    async createFieldRule({ field, condition, action }) {
        // TODO: rule builder locators not provided in verified codegen.
        throw new Error(
            "TODO: createFieldRule locator not verified for this UI"
        );
    }

    async save() {
        // TODO: save button locator not provided in verified codegen.
        throw new Error("TODO: save locator not verified for this UI");
    }

    async verifySaveSuccess() {
        await expect(this.successMessage).toBeVisible();
    }
}

