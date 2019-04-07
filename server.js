const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("./dist/news-app"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/news-app/index.html"));
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server started");
});
