const puppeteer = require("puppeteer");
const config = {
  viewport: {
    width: 1920,
    height: 1080
  }
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.setViewport(config.viewport);
  await page.goto("http://localhost:3000");

  await page.waitFor("input");
  await page.focus("input");
  await page.keyboard.type("Hello World!");
  await page.screenshot({ path: "new_file.png" });

  await browser.close();
})();
