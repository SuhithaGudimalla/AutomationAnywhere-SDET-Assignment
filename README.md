# Playwright UI Automation Framework

A scalable UI automation framework built using **Playwright**, **JavaScript (ES Modules)**, and the **Page Object Model (POM)**. This project demonstrates end-to-end automation of a web application, including authentication, workflow automation, file upload, form handling, rule creation, and reporting.

---

## Test Execution Report

> All automated test cases executed successfully.

<img width="1483" height="813" alt="image" src="https://github.com/user-attachments/assets/54415aeb-282e-4c21-a6c8-027f8ce9c4c7" />


---

## Features

- Playwright with JavaScript (ES Modules)
- Page Object Model (POM)
- Reusable page classes and helper utilities
- Manual authentication with saved browser session
- Automated workflow execution
- File upload automation
- Dynamic test data
- HTML Reporting
- Screenshots, Videos and Traces on failure
- Maintainable and scalable project structure

---

## Tech Stack

- Playwright
- JavaScript (ES Modules)
- Node.js
- HTML Reporter

---

## Project Structure

```text
playwright-ui-automation
├── pages/
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   ├── AutomationPage.js
│   ├── TaskBotPage.js
│   └── LearningInstancePage.js
│
├── tests/
│   ├── auth.setup.js
│   ├── login.spec.js
│   ├── taskBot.spec.js
│   └── learningInstance.spec.js
│
├── utils/
│   ├── auth.js
│   ├── constants.js
│   └── helper.js
│
├── test-data/
│   ├── automationData.js
│   └── alias-case-1.pdf
│
├── playwright.config.js
├── package.json
├── .env.example
└── README.md
```

---

## Prerequisites

- Node.js 18+
- npm
- Playwright

Install Playwright browsers:

```bash
npx playwright install
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/playwright-ui-automation.git
```

Move into the project:

```bash

cd playwright-ui-automation
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Environment Variables

Create a `.env` file using `.env.example` as a template.

Example:

```env
BASE_URL=https://your-application-url

EMAIL=your_email@example.com

PASSWORD=your_password
```

---

## Authentication

The application requires CAPTCHA during login.

Instead of automating CAPTCHA, the framework performs a one-time manual login and stores the authenticated browser session for reuse.

Run:

```bash
npm run test:setup
```

Workflow:

1. Browser opens.
2. Enter credentials.
3. Complete CAPTCHA manually.
4. Login successfully.
5. Authentication state is saved.
6. Remaining test cases reuse the saved session automatically.

---

## Running Tests

Run all tests:

```bash
npm test
```

Individual commands:

| Command | Description |
|----------|-------------|
| `npm run test:setup` | Save authentication session |
| `npm run test:login` | Login validation |
| `npm run test:taskbot` | Execute Use Case 1 |
| `npm run test:learning` | Execute Use Case 2 |
| `npm run report` | Open HTML Report |

---

## Automated Test Scenarios

### Login Validation

- Verify dashboard loads using saved authentication state.

### Use Case 1 – Task Bot

- Create a Task Bot
- Add Message Box action
- Save the Task Bot
- Verify successful creation

### Use Case 2 – User Defined Learning Instance

- Create a Learning Instance
- Upload sample document
- Configure form fields
- Configure table fields
- Create validation rule
- Save and verify successful creation
---

## Reporting

The framework automatically generates:

- HTML Report
- Screenshots on Failure
- Videos on Failure
- Playwright Trace on Retry

Open the report using:

```bash
npm run report
```

---

## Execution Result

| Result | Status |
|---------|--------|
| Total Tests | 4 |
| Passed | ✅ 4 |
| Failed | ✅ 0 |
| Execution Time | ~2.4 Minutes |

---

## Framework Design

- Page Object Model (POM)
- Modular page classes
- Centralized locators
- Reusable helper methods
- Environment-based configuration
- Automatic waiting using Playwright
- Timestamp-based unique test data
- Clean separation between page logic and test logic

---

## Future Improvements

- Cross-browser execution
- Parallel test execution
- CI/CD integration using GitHub Actions
- Allure Reporting
- Docker support

---

## Author

**Suhitha Gudimalla**

GitHub: https://github.com/SuhithaGudimalla
LinkedIn: https://www.linkedin.com/in/suhitha-gudimalla/
