export const automationData = {
    taskBot: {
        namePrefix: "Playwright-TaskBot",
        searchCommand: "message",
        messageDisplay: "Playwright automated test message",
    },

    learningInstance: {
        namePrefix: "Playwright-LearningInstance",
        documentFile: "alias-case-1.pdf",
        formFields: ["Invoice Number", "Invoice Date"],
        tableFields: ["Unit Price", "Quantity"],
        rule: {
            field: "Invoice Number",
            condition: "is empty",
            action: "Invalid value entered",
        },
    },
};
