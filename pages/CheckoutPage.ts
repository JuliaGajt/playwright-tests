import { expect, Locator, Page } from "@playwright/test";


export default class CheckoutPage { 

    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly zipCodeInput: Locator;
    private readonly submitCheckoutButton: Locator;
    private readonly checkoutStepTwoTitle: Locator;
    private readonly finishOrderBtn: Locator;
    private readonly confirmationTitle: Locator;
    private readonly confirmationText: Locator;
    private readonly confirmationIcon: Locator;
    private readonly confirmationGoBackBtn: Locator;


    constructor(public readonly page: Page){
        this.firstNameInput = this.page.getByTestId('firstName');
        this.lastNameInput = this.page.getByTestId('lastName');
        this.zipCodeInput = this.page.getByTestId('postalCode');
        this.submitCheckoutButton = this.page.getByTestId('continue');
        this.checkoutStepTwoTitle = this.page.getByTestId('title');
        this.finishOrderBtn = this.page.getByTestId('finish');
        this.confirmationTitle = this.page.getByTestId('complete-header');
        this.confirmationText = this.page.getByTestId('complete-text');
        this.confirmationIcon = this.page.getByTestId('pony-express');
        this.confirmationGoBackBtn = this.page.getByTestId('back-to-products');

    }

    async fillCheckoutForm(firstName: string, lastName: string, zipCode: string){
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
        // await this.submitCheckoutButton.click();
    }

    async clickContinueBtn() {
        await this.submitCheckoutButton.click();
    }

    async getCheckoutStepTwoTitle() { 
        return this.checkoutStepTwoTitle;
    }

    async placeOrder() { 
        await this.finishOrderBtn.scrollIntoViewIfNeeded();
        await this.finishOrderBtn.click();
    }

    async checkConfirmationForm() {

        await expect(this.confirmationIcon).toBeVisible();
        await expect(this.confirmationText).toBeVisible();
        await expect(this.confirmationTitle).toBeVisible();
        await expect(this.confirmationGoBackBtn).toBeVisible();
    }
}