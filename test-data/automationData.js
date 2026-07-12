export const automationData = {
    taskBot: {
        namePrefix: "Playwright-TaskBot",
        messageDisplay: "Playwright automated test message",
    },

    learningInstance: {
        namePrefix: "Playwright-LearningInstance",
        documentFile: "alias-case-1.pdf",
        formFields: [
            { name: "invoice_number", label: "Invoice Number" },
            { name: "invoice_date", label: "Invoice Date", type: "Date" },
        ],
        tableFields: [
            { name: "quantity", label: "Quantity", type: "Number" },
            { name: "unit_price", label: "Unit Price", type: "Number" },
        ],
        rule: {
            fieldName: "invoice_number",
            value: "100",
            message: "Invalid value entered",
        },
    },
};
