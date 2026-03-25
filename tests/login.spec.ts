import test, { expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import {standard_user, locked_out_user, not_existing_user, visual_user, performance_glitch_user} from "../utils/testData" 
import InventoryPage from "../pages/InventoryPage";

// parametryzacja
// test.step()

const users = [standard_user, visual_user, performance_glitch_user]

test.describe('Login tests', () => { 
    
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.goto();
    })

    for (let user of users) {
        test(`successful login with ${user.email}`, async ({page}) => {
            await loginPage.loginWithUser(user);
            await expect(await inventoryPage.getProductsSpanHeader()).toBeVisible();
            await expect(page).toHaveURL('inventory.html');
        });
    }


    test('unsuccessful login with locked_out_user', async ({page}) => {
        await loginPage.loginWithUser(locked_out_user);
        await expect(await loginPage.getErrorMessage()).toBeVisible();
        await expect(await loginPage.getErrorMessage()).toHaveText(/Sorry, this user has been locked out.$/ );
    });

        test('unsuccessful login with not_existing_user', async ({page}) => {
        await loginPage.loginWithUser(not_existing_user);
        await expect(await loginPage.getErrorMessage()).toBeVisible();
        await expect(await loginPage.getErrorMessage()).toHaveText(/Username and password do not match any user in this service$/);
    });

})





// 4. 🔄 Network mocking (🔥 ważne na assessment)

// przechwyć request /inventory
// zwróć fake dane
