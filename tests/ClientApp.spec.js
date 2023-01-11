const { test, expect } = require('@playwright/test');
const { copyFileSync } = require('fs');
const path = require('path');
const { text } = require('stream/consumers');



test.only('Lets Shop Playwright Test', async ({ page }) => {


    const myemail = "mujeeb7036@gmail.com";
    const productName = 'adidas original';
    const email = page.locator('#userEmail');
    const psw = page.locator('#userPassword');
    const loginBtn = page.locator('#login');
    const cardTitles = page.locator('.card-body b');
    const products = page.locator('.card-body');
    const rows = page.locator("tbody tr");

    await page.goto("https://rahulshettyacademy.com/client");

    await email.fill(myemail);
    await psw.fill('Mujeeb@8143');
    await loginBtn.click();

    await page.waitForLoadState('networkidle');
    const allTitles = (await cardTitles.allTextContents());
    console.log(allTitles);

    const count = await products.count();
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {

            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*=cart]").click();
    await page.locator("div li").last().waitFor();
    const bool = await page.locator("h3:has-text('adidas original')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click()

    await page.locator("[placeholder*='Country']").type('indi', { delay: 1000 });
    const dropdown = await page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();
    for (let i = 0; i < optionsCount; ++i) {

        const text = await dropdown.locator('button').nth(i).textContent();
        if (text === " India") {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }



    await expect(page.locator(".user__name label[type='text']")).toHaveText(myemail);
        await page.locator('.action__submit').click({force:true})

    await page.waitForLoadState();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
    const ordId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent()
    console.log(ordId)

    //await page.pause();
    await page.locator("button[routerlink*='myorders']").click()

    await page.locator("tbody").waitFor();
    //const orderidCount = orderIds.count();
    for (let i = 0; i < await rows.count(); ++i) {

        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (ordId.includes(rowOrderId))
        {

            await rows.nth(i).locator("button").first().click();
            break;
        }
        
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
        expect(ordId.includes(orderIdDetails))
        console.log("completed")



});

