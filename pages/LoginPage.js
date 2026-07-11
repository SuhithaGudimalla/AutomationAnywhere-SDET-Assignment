class LoginPage {

    constructor(page) {
        this.page = page;
    }

    async gotoHome() {
        await this.page.goto(process.env.BASE_URL);
    }

}

module.exports = LoginPage;