const puppeteer = require('puppeteer');

const searchGoogle = async (searchQuery) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.goto('https://google.com');

    //Finds input element with name attribue 'q' and types searchQuery
    await page.type('input[name="q"]', searchQuery);

    //Finds an input with name 'btnK', after so it executes .click() DOM Method
    await page.$eval('input[name=btnK]', button => button.click());

    //Wait until the first div element with id search laods
    await page.waitForSelector('div[id=search]');

    //Find all div elements with class 'bkWMgd'
    const searchResults = await page.$$eval('div[class=g]', results => {

        let data = [];

        //Iterate over all the results
        results.forEach(parent => {

            //Check if parent has h2 with text 'Web Results'
            const ele = parent.querySelector('h2');

            //If element with 'Web Results' Title is not found  then continue to next element
            if (ele === null) {
                return;
            }

            const result = parent.querySelector('div > div[class=tF2Cxc] > div[class=yuRUbf] ')

            //Target the url
            const url = result.querySelector('a').href;

            //Add to the return Array
            data.push(url);
        });

        //Return the search results
        return data;
    });


    // yahoo finance scraping
    const url = searchResults[0];
    const page1 = await browser.newPage();
    // let url = `https://finance.yahoo.com/quote/${ticker}?p=${ticker}&.tsrc=fin-srch`;
    await page1.goto(url);
    await page1.waitForTimeout('#quote-market-notice', { timeout: 1000 });
    let price = await page1.evaluate(() => document.querySelector("#quote-header-info > div.Pos\\(r\\) > div > div > span").textContent);

    let change = await page1.evaluate(() => document.querySelector("#quote-header-info > div.Pos\\(r\\) > div > div > span:nth-child(2)").textContent);

    await browser.close();

    return ({ price, change });
};

module.exports = searchGoogle;

