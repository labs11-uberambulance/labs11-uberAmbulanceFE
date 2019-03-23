const puppeteer = require('puppeteer');

module.exports = class Page {
    static async build() {
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox']
        });
        const page = await browser.newPage();
        const enhancedPage = new Page(page);
        return new Proxy({ enhancedPage, page, browser }, {
            get: (t, key) => {
                return t.enhancedPage[key] || t.browser[key] || t.page[key];
            }
        })
    }
    constructor(page) {
        this.page = page
    }
    getAllElements(selector) {
        return this.page.$$(selector)
    }
    getContent(selector) {
        return this.page.$eval(selector, el => el.textContent)
    }
}