const puppeteer = require("puppeteer");
const fs = require("fs");
const { promisify } = require("util");
const { PNG } = require("pngjs");
const pixelmatch = require("pixelmatch");

const config = {
  viewport: {
    width: 1920,
    height: 1080
  }
};

const fsStat = promisify(fs.stat);
const fsCopy = promisify(fs.copyFile);

const imageFromFile = filename =>
  new Promise(resolve => {
    const img = fs
      .createReadStream(filename)
      .pipe(new PNG())
      .on("parsed", () => {
        resolve(img.data);
      });
  });
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

  const oldFileCheck = await fsStat("old_file.png").catch(err => undefined);
  if (!oldFileCheck) {
    console.log("file not found");
    await fsCopy("new_file.png", "old_file.png");
    await browser.close();
    return;
  }

  const newFile = await imageFromFile("new_file.png");
  const oldFile = await imageFromFile("old_file.png");

  const diff = new PNG(config.viewport);

  const diffPixels = pixelmatch(
    newFile,
    oldFile,
    diff.data,
    config.viewport.width,
    config.viewport.height,
    { threshold: 0.1 }
  );
  if (diffPixels === 0) {
    console.log("success in rendering");
  } else {
    console.log(`difference is ${diffPixels} in images`);
  }
  console.log("diff pixel :", diffPixels);
  //await page.screenshot({ path: "example.png" });
  await browser.close();
})();
