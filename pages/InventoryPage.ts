import { expect, Locator, Page } from "@playwright/test"


export default class InventoryPage { 

    private readonly productsSpan: Locator;
    private readonly basketIcon: Locator;
    private readonly shoppingBagBadge: Locator;
    private readonly addToCartBtn: Locator;
    private readonly removeProductBtn: Locator;
    

    constructor(public readonly page: Page){
        this.productsSpan = this.page.getByText('Products');
        this.basketIcon = this.page.getByTestId('shopping-cart-link');
        this.shoppingBagBadge = this.page.getByTestId('shopping-cart-badge');
        this.addToCartBtn = this.page.getByTestId(/^add-to-cart-.+/);
        this.removeProductBtn = this.page.getByTestId(/^remove-.+/);
    }

    async getProductsSpanHeader() : Promise<Locator> { 
        return this.productsSpan;
    }
    
    async getShoppingBagBadge() {
        return this.shoppingBagBadge;
    }


    async getRemoveProductBtnByName(name: string) { 
        return this.page.getByTestId(`remove-${name}`);
    }

    async addFirstProductToCart () {
        let fullName : string | null = await this.addToCartBtn.first().getAttribute('name');

        if (fullName) fullName = fullName.replace('add-to-cart-', '');
        else throw new Error('Product Full name is not present - something went wrong while checking if remove button appeared after adding product to Cart');
        
        await this.addToCartBtn.first().click();
        
        await expect(await this.getRemoveProductBtnByName(fullName)).toBeVisible();
        
        return fullName;
    }
}