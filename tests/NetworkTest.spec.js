const { test, expect, request } = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginpayload = { userEmail: "mujeeb7036@gmail.com", userPassword: "Mujeeb@8143" }
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6262e990e26b7e1a10e89bfa" }] }
const fakePayLoadOrders = {data:[],message:"No Orders"}

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

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6350f0f9c4d0c51f4f42cf22",
    async route=>
    {
        const response = await page.request.fetch(route.request());
        let body = fakePayLoadOrders;
        route.fulfill(
            {
                response,
                body,
            });
        
        //intercepting response - API Response ->{playwright fake response}->browser-> render data in front-end

    });

    await page.locator("button[routerlink*='myorders']").click()

    await page.pause();
    console.log(await page.locator(".mt-4").textContent());
    

});




