const { test, expect } = require('@playwright/test');



test.only('Lets Shop Playwright Test', async ({ page }) => {


    const email = page.locator('#userEmail');
    const psw = page.locator('#userPassword');
    const loginBtn = page.locator('#login');
    const cardTitles = page.locator('.card-body b');

    await page.goto("https://rahulshettyacademy.com/client");

    await email.fill("mujeeb@gmail.com");
    await psw.fill('Mujeeb@8143');
    await loginBtn.click();

    await page.waitForLoadState('networkidle');
    const allTitles = (await cardTitles.allTextContents());
    console.log(allTitles);




});