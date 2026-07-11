# Automation Anywhere SDET Internship Assignment

Playwright test automation framework for **Automation Anywhere Community Edition**, built with JavaScript (ES Modules) and the Page Object Model.

## Project Structure

```
AutomationAnywhere-SDET-Assignment
├── pages/
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   ├── AutomationPage.js
│   ├── TaskBotPage.js
│   └── LearningInstancePage.js
├── tests/
│   ├── auth.setup.js
│   ├── login.spec.js
│   ├── taskBot.spec.js
│   └── learningInstance.spec.js
├── utils/
│   ├── auth.js
│   ├── constants.js
│   └── helper.js
├── test-data/
│   ├── automationData.js
│   └── alias-case-1.pdf          ← place your test PDF here
├── playwright.config.js
├── package.json
└── .env
```

## Prerequisites

- Node.js 18+
- Automation Anywhere Community Edition account

## Setup

1. Install dependencies:

```bash
npm install
npx playwright install
```

2. Configure environment variables in `.env`:

```env
BASE_URL=https://community.cloud.automationanywhere.digital
EMAIL=your_email@example.com
PASSWORD=your_password
```

3. Place `alias-case-1.pdf` in the `test-data/` folder (required for Use Case 2).

## Authentication (One-Time Manual Login)

Automation Anywhere uses CAPTCHA. **Do not automate CAPTCHA.**

Run the setup project once to log in manually and save session state:

```bash
npm run test:setup
```

What happens:

1. A headed browser opens at the login page.
2. You enter credentials and solve CAPTCHA manually.
3. The setup waits until the URL **no longer contains `/login`**.
4. Session is saved to `playwright/.auth/user.json`.

All other tests reuse this `storageState` automatically.

Re-run setup only when the session expires.

## Running Tests

| Command | Description |
|---------|-------------|
| `npm run test:setup` | One-time manual login + save auth state |
| `npm run test:login` | Verify dashboard loads with saved auth |
| `npm run test:taskbot` | Use Case 1 — Task Bot + Message Box |
| `npm run test:learning` | Use Case 2 — Learning Instance |
| `npm test` | Run all tests (except setup) |
| `npm run report` | Open HTML report |

Run all tests:

```bash
npm test
```

## Test Coverage

### Use Case 1 — Task Bot

1. Login (via `storageState`)
2. Navigate to Automation → Create → Task Bot
3. Enter bot name → Create & Edit
4. Search "Message Box" → double-click to add
5. Verify right panel is visible
6. Save → verify success message

### Use Case 2 — Learning Instance

1. Navigate to AI → Learning Instances
2. Create User Defined Learning Instance
3. Upload `alias-case-1.pdf`
4. Add 2 Form Fields and 2 Table Fields
5. Create one Field Rule
6. Save → verify success

## Locator Strategy

- Prefer `getByRole()`, `getByLabel()`, and `getByPlaceholder()` over XPath.
- All locators live inside Page Objects only.
- Spec files contain business flow only — no raw selectors.
- Locators marked with `TODO` comments require inspection against the live application.

## Reporting & Artifacts

Configured in `playwright.config.js`:

- **HTML report** — `playwright-report/`
- **Screenshots** — on failure
- **Video** — retained on failure
- **Trace** — on first retry

View the HTML report:

```bash
npm run report
```

## Design Principles

- Page Object Model with reusable methods
- Playwright auto-waiting (no hardcoded sleeps)
- Unique test data via timestamped names
- Centralized constants and auth utilities
- Interview-quality, maintainable structure
