import test, { expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import {standard_user, locked_out_user, not_existing_user} from "../utils/testData" 
import InventoryPage from "../pages/InventoryPage";

test.describe('Login tests', () => { 
    
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.goto();
    })

    test('successful login with standard_user', async ({page}) => {
        await loginPage.loginWithUser(standard_user);
        await expect(await inventoryPage.getProductsSpanHeader()).toBeVisible();
        await expect(page).toHaveURL('inventory.html');
    });

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


// 6. 🔁 Retry + flaky test
// test('flaky test', async ({ page }) => {
//   expect(Math.random()).toBeGreaterThan(0.3);
// });


// 7. ⏱️ Waits i async

// waitForResponse