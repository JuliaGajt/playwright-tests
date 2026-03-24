import {test as base, expect} from "@playwright/test"
import LoginPage from "../pages/LoginPage"
import { standard_user } from "../utils/testData";
import InventoryPage from "../pages/InventoryPage";
import ShoppingBagPage from "../pages/ShoppingBagPage";
import CheckoutPage from "../pages/CheckoutPage";

let productsName: string;
let productsName1: string;

const loggedInAndAddProductsTest = base.extend<{loginPage: LoginPage, shoppingBagPage: ShoppingBagPage, inventoryPage: InventoryPage, checkoutPage: CheckoutPage}>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.loginWithUser(standard_user);
        await expect(page).toHaveURL('inventory.html');
        await use(loginPage);

    },
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        productsName = await inventoryPage.addFirstProductToCart();
        productsName1 = await inventoryPage.addFirstProductToCart();

        await expect(await inventoryPage.getShoppingBagBadge()).toHaveText('2');

        await use(inventoryPage);

    },
    shoppingBagPage: async ({ page }, use) => {
        const shoppingBagPage = new ShoppingBagPage(page);
        await shoppingBagPage.goToShoppingBag();
        await expect(await shoppingBagPage.getCartTitle()).toHaveText('Your Cart');
        await expect(await shoppingBagPage.getProductInBasket(productsName)).toBeVisible();
        await expect(await shoppingBagPage.getProductInBasket(productsName1)).toBeVisible();
        
        await use(shoppingBagPage);
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
});


loggedInAndAddProductsTest('I go to checkout with products in Cart', async ({page, loginPage, inventoryPage, shoppingBagPage, checkoutPage}) => {

    await shoppingBagPage.goToCheckout();

    await expect(page).toHaveURL('checkout-step-one.html');

    await checkoutPage.fillCheckoutForm('Test', 'Test', '12345');
    await checkoutPage.clickContinueBtn();

    await expect(page).toHaveURL('checkout-step-two.html');
    await expect(await checkoutPage.getCheckoutStepTwoTitle()).toHaveText('Checkout: Overview');

    await checkoutPage.placeOrder();

    await expect(page).toHaveURL('checkout-complete.html')

    await checkoutPage.checkConfirmationForm();

})