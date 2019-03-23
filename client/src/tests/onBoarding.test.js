const Page = require('./helpers/page');

let page;
beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000/onboarding');
})
afterEach(async () => {
    page.close()
})

test('should display three buttons', async () => {
    const buttons = await page.getAllElements('button')
    expect(buttons.length).toEqual(3)
})

describe('when clicking on a button', () => {
    test('should autofocus on "Full Name" input', async () => {
        await page.click('button[value="DRIVER"]')
        await page.waitFor('label');
        const text = await page.getContent('.inputHolder:focus-within > div > label')
        expect(text).toMatch(/Full Name/)
    })
})