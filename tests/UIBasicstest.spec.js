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
    await signIn.click();
    // grabbing the text of product
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    //grabbing the text of all products 
    const allTitles = (await cardTitles.allTextContents());
    console.log(allTitles);




});

test('Page Playwright Test', async ({ page }) => {

    await page.goto("https:google.com");
    //get titile - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});

test.only('Lets Shop Playwright Test', async ({ browser }) => {

    //chrome - plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();

    const email = page.locator('#userEmail');
    const loginBtn = page.locator('#login');
    const cardTitles = page.locator('#products > div.container > div.row > div > div > div > h5 > b');

    await page.goto("https://rahulshettyacademy.com/client");

    await email.type("mujeeb@gmail.com");
    await page.locator('#userPassword').type('Mujeeb@8143');
    await loginBtn.click();
    console.log(await page.locator('#toast-container').textContent());
    await expect(page.locator('#toast-container')).toContainText('Incorrect');
    
    await email.fill("");
    // entering the text 
    await email.fill("mujeeb7036@gmail.com");
    //clicking button
    await loginBtn.click();
    // grabbing the text of product
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    //grabbing the text of all products 
    const allTitles = (await cardTitles.allTextContents());
    console.log(allTitles);




});
