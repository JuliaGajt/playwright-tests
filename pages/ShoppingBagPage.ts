import { expect, Locator, Page } from "@playwright/test";


export default class ShoppingBagPage { 

    private readonly removeProductBtn: Locator;
    private readonly shoppingBagBadge: Locator;
    private readonly basketIcon: Locator;
    private readonly cartTitle: Locator;
    private readonly checkoutBtn: Locator;

    constructor(public readonly page: Page){
        this.removeProductBtn = this.page.getByTestId(/^remove-.+/);
        this.shoppingBagBadge = this.page.getByTestId('shopping-cart-badge');
        this.basketIcon = this.page.getByTestId('shopping-cart-link');
        this.cartTitle = this.page.getByTestId('title');
        this.checkoutBtn = this.page.getByTestId('checkout');
    }

    async getCartTitle() {
        return this.cartTitle;
    }

    async getShoppingBagIcon() { 
        return this.basketIcon;
    }

    async goToShoppingBag() {
        await this.basketIcon.click();
    }

    async getProductInBasket(productName: string) { 
        return this.page.getByText(`${productName.replace(/-/g, ' ')}`, {exact: false});
    }

    async goToCheckout() { 
        await this.checkoutBtn.click();
    }

    async removeAllProducts() { 
        let currentProductsCount = await this.removeProductBtn.count();
        while (await this.removeProductBtn.count() > 0) { 
            await this.removeProductBtn.first().click();
            await expect(this.removeProductBtn).toHaveCount(currentProductsCount-1);
            currentProductsCount = await this.removeProductBtn.count();
        }
        await expect(this.basketIcon).toBeEmpty();
    }
}