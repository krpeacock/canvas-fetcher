const fs = require("fs");
const https = require("https");
var cron = require("node-cron");

// URL of the image
const url = "https://reao4-zqaaa-aaaab-qadvq-cai.raw.ic0.app/overview.png";

console.log("Fetching images every 5 minutes. Leave this open");
cron.schedule("5 * * * *", () => {
  https.get(url, (res) => {
    // Image will be stored at this path
    const path = `${__dirname}/files/${new Date().toISOString()}_overview.png`;
    const filePath = fs.createWriteStream(path);
    res.pipe(filePath);
    filePath.on("finish", () => {
      filePath.close();
      console.log("Download Completed");
    });
  });
});
