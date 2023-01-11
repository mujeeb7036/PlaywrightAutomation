const { test, expect, request } = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginpayload = { userEmail: "mujeeb7036@gmail.com", userPassword: "Mujeeb@8143" }
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6262e990e26b7e1a10e89bfa" }] }

let response;


test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginpayload);
   response = await apiUtils.createOrder(orderPayLoad);
});


test('Place the Order', async ({ page }) => {



    //Inserting the token in localstorage in the window with js
    page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token );


    await page.goto("https://rahulshettyacademy.com/client");

    //await page.pause();
    await page.locator("button[routerlink*='myorders']").click()

    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    //const orderidCount = orderIds.count();
    for (let i = 0; i < await rows.count(); ++i) {

        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {

            await rows.nth(i).locator("button").first().click();
            break;
        }

    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
    console.log("completed")

});




