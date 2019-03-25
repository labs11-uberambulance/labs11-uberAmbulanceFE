const Page = require('./helpers/page');

let page;
beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000/');
})
afterEach(async () => {
    await page.close();
})

test('should start Oauth when clicking on "G" button', async () => {
    const newPagePromise = new Promise(resolve => page.once('targetcreated', target => resolve(target.page())));
    await page.click('img[alt="G"]');
    const popup = await newPagePromise;
    const url = await popup.url()
    expect(url).toMatch('birth-ride\.firebaseapp\.com/__/auth')
})
