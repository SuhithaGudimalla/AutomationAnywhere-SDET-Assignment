import { expect } from "@playwright/test";

export default class LearningInstancePage {

    constructor(page) {
        this.page = page;

        // TODO: Inspect AI menu — confirm Learning Instances navigation locator
        this.learningInstancesLink = page.getByRole("link", { name: "Learning Instances" });

        // TODO: Inspect Learning Instances page — confirm Create button locator
        this.createButton = page.getByRole("button", { name: "Create" });

        // TODO: Inspect create menu — confirm User Defined Learning Instance option locator
        this.userDefinedOption = page.getByText("User Defined Learning Instance");

        // TODO: Inspect create dialog — confirm learning instance name field locator
        this.instanceNameInput = page.getByLabel("Name");

        // TODO: Inspect upload section — confirm file input locator for document upload
        this.documentUploadInput = page.locator('input[type="file"]');

        // TODO: Inspect form fields section — confirm Add Form Field button locator
        this.addFormFieldButton = page.getByRole("button", { name: /add form field/i });

        // TODO: Inspect table fields section — confirm Add Table Field button locator
        this.addTableFieldButton = page.getByRole("button", { name: /add table field/i });

        // TODO: Inspect rules section — confirm Add Rule button locator
        this.addRuleButton = page.getByRole("button", { name: /add rule/i });

        // TODO: Inspect dialog footer — confirm Save button locator
        this.saveButton = page.getByRole("button", { name: "Save" });

        // TODO: Inspect post-save notification — confirm success message locator
        this.successMessage = page.getByText(/created successfully|saved successfully|success/i);
    }

    async navigateToLearningInstances() {
        await this.learningInstancesLink.click();
    }

    async startUserDefinedLearningInstance() {
        await this.createButton.click();
        await this.userDefinedOption.click();
    }

    async enterInstanceName(name) {
        await this.instanceNameInput.fill(name);
    }

    async uploadDocument(filePath) {
        await this.documentUploadInput.setInputFiles(filePath);
    }

    async addFormField(fieldName) {
        await this.addFormFieldButton.click();
        // TODO: Inspect form field dialog — confirm field name input locator
        await this.page.getByLabel("Field name").fill(fieldName);
        await this.page.getByRole("button", { name: "Add" }).click();
    }

    async addFormFields(fieldNames) {
        for (const fieldName of fieldNames) {
            await this.addFormField(fieldName);
        }
    }

    async addTableField(fieldName) {
        await this.addTableFieldButton.click();
        // TODO: Inspect table field dialog — confirm field name input locator
        await this.page.getByLabel("Field name").fill(fieldName);
        await this.page.getByRole("button", { name: "Add" }).click();
    }

    async addTableFields(fieldNames) {
        for (const fieldName of fieldNames) {
            await this.addTableField(fieldName);
        }
    }

    async createFieldRule({ field, condition, action }) {
        await this.addRuleButton.click();
        // TODO: Inspect rule builder — confirm field, condition, and action locators
        await this.page.getByLabel("Field").selectOption({ label: field });
        await this.page.getByLabel("Condition").selectOption({ label: condition });
        await this.page.getByLabel("Action").fill(action);
        await this.page.getByRole("button", { name: "Add" }).click();
    }

    async save() {
        await this.saveButton.click();
    }

    async verifySaveSuccess() {
        await expect(this.successMessage).toBeVisible();
    }

}
