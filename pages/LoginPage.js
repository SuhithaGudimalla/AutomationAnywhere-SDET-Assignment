export default class LoginPage {

    constructor(page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto("/", { waitUntil: "domcontentloaded" });
    }

    async waitForLoginComplete() {
        await this.page
            .getByRole("link", { name: "Automation", exact: true })
            .waitFor({ state: "visible", timeout: 600000 });

        await this.page.waitForLoadState("networkidle");
    }

}
