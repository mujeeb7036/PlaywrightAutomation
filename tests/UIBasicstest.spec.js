const { test, expect } = require('@playwright/test');


test('Browser Context Playwright Test', async ({ browser }) => {

    //chrome - plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //CSS 
    await userName.type("rahulshetty");
    await page.locator('[type$="password"]').type('learning');
    await signIn.click();
    //webdriverwait
    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect');
    //type - fill - used for entering text
    //clearing already entered text
    await userName.fill("");
    // entering the text 
    await userName.fill("rahulshettyacademy");
    //clicking button
    await Promise.all([


        page.waitForNavigation(),
        signIn.click(),

    ]  
    );
    // grabbing the text of product
            // console.log(await cardTitles.first().textContent());
            // console.log(await cardTitles.nth(1).textContent());
    //grabbing the text of all products 
    const allTitles = (await cardTitles.allTextContents());
    console.log(allTitles);




});

test('UI Controls', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const dropdown = page.locator('select[class="form-control"]');
    await dropdown.selectOption("consult");
    await page.locator('.checkmark').nth(1).click();
    await page.locator('#okayBtn').click();
    await page.pause();


   

});
