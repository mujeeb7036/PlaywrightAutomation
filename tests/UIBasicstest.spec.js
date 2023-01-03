const { test, expect } = require('@playwright/test');
const { text } = require('stream/consumers');


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

test.only('UI Controls', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    //selecting fields and entering
    //selecting dropdown option
    // check the radio button
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const documentLink = page.locator('[href*="documents-request"]');
    const dropdown = page.locator('select[class="form-control"]');

    await dropdown.selectOption("consult");
    await page.locator('.checkmark').nth(1).click();
    await page.locator('#okayBtn').click();
    //assertion whether the checkbox is checked or not
    console.log(await page.locator('.checkmark').nth(1).isChecked());
    await expect(page.locator('.checkmark').nth(1)).toBeChecked();
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();

    //Checking the attribute and its value
    await expect(documentLink).toHaveAttribute("class", "blinkingText")

    // await page.pause();

});

//handlimg child windows
test('child windows hadl', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator('[href*="documents-request"]');
    const [newPage] = await Promise.all([

        context.waitForEvent('page'),
        documentLink.click()

    ])

   const  text = await newPage.locator('.im-para.red').textContent();
    console.log(text)
    //Splitting the array 
    const arrayText = text.split('@');
    const domain = arrayText[1].split(' ')[0];
    console.log(domain);
    await page.locator('#username').type(domain);
    //await page.pause();
    console.log(await page.locator('#username').textContent());

})
