const { chromium } = require('playwright');

(async () => {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => {
      console.log('CONSOLE:', msg.type(), msg.text());
    });
    
    page.on('pageerror', err => {
      console.error('PAGE_ERROR:', err.message);
    });

    await page.goto('http://127.0.0.1:3001', { waitUntil: 'networkidle' });
    
    // Check if the root element contains content
    const html = await page.$eval('#root', el => el.innerHTML);
    if (!html) console.log('ERROR: #root is empty! React might have crashed silently.');
    
    console.log("Page loaded successfully.");
    
    await browser.close();
} catch(e) { console.error(e); } })();
