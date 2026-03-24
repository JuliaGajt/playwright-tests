import { Locator, Page } from "@playwright/test";
import { User } from "../utils/testData";


export default class LoginPage { 

    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly submitButton: Locator;
    private readonly errorMessage: Locator;

    constructor(public readonly page: Page){
        this.emailInput = page.getByTestId('username');
        this.passwordInput = page.getByPlaceholder('password');
        this.submitButton = page.getByTestId("login-button");
        this.errorMessage = page.getByTestId("error");
    }

    async goto() { 
        await this.page.goto('');
    }

    async loginWithUser(user: User) {
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.submitButton.click();
    }

    async getErrorMessage() {
        return this.errorMessage;
    }

}