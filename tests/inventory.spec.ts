import test, {test as base, expect} from "@playwright/test"
import LoginPage from "../pages/LoginPage"
import { standard_user } from "../utils/testData";
import InventoryPage from "../pages/InventoryPage";
import ShoppingBagPage from "../pages/ShoppingBagPage";

const loggedInTest = base.extend<{loginPage: LoginPage, shoppingBagPage: ShoppingBagPage, inventoryPage: InventoryPage}>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await test.step(`Login with standard user`, async() => {
            await loginPage.loginWithUser(standard_user);
            await expect(page).toHaveURL('inventory.html');
        } );
        await use(loginPage);

    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    shoppingBagPage: async ({ page }, use) => {
        const shoppingBagPage = new ShoppingBagPage(page);
        await use(shoppingBagPage);

        await test.step(`Remove all products from Cart if present`, async() => {
            if (await (await shoppingBagPage.getShoppingBagIcon()).textContent()){
                await shoppingBagPage.goToShoppingBag();
                await shoppingBagPage.removeAllProducts();
            }
        });
    }

});

loggedInTest('add product to cart', async ({loginPage, inventoryPage, shoppingBagPage}) => {

    let productsName: string;

    await test.step(`I add first product to Cart`, async () => {
        productsName = await inventoryPage.addFirstProductToCart();    
        await expect(await inventoryPage.getShoppingBagBadge()).toHaveText('1');
    });
    
    await test.step(`And I go to shopping bag`, async () => {
        await shoppingBagPage.goToShoppingBag();    
        await expect(await shoppingBagPage.getCartTitle()).toHaveText('Your Cart');
    })

    await test.step(`And I check that product is in Shopping bag`, async () => {
        await expect(await shoppingBagPage.getProductInBasket(productsName)).toBeVisible();
    })
})



loggedInTest('add multiple product to cart', async ({loginPage, inventoryPage, shoppingBagPage}) => {
    const productsName = await inventoryPage.addFirstProductToCart();
    const productsName1 = await inventoryPage.addFirstProductToCart();

    await expect(await inventoryPage.getShoppingBagBadge()).toHaveText('2');

    await shoppingBagPage.goToShoppingBag();

    await expect(await shoppingBagPage.getCartTitle()).toHaveText('Your Cart');
    await expect(await shoppingBagPage.getProductInBasket(productsName)).toBeVisible();
    await expect(await shoppingBagPage.getProductInBasket(productsName1)).toBeVisible();

})





