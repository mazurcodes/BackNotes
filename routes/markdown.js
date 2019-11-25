const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

// markdown-it packages
const MarkdownIt = require("markdown-it");
const mdAnchor = require("markdown-it-anchor");
const mdToc = require("markdown-it-table-of-contents");
const mdPath = path.join(__dirname, "..", "/public/", "markdown.md");

// markdown-it init and adding packages
const md = new MarkdownIt();
md.use(mdAnchor);
md.use(mdToc);

router.get("/", async (req, res) => {
  try {
    const mdData = await fs.readFile(mdPath, "utf-8");
    const mdResult = md.render(mdData);
    res.send(mdResult);
  } catch (err) {
    console.log(err);
    res.status(400);
    process.exit();
  }
});

router.get("/raw", async (req, res) => {
  try {
    const mdData = await fs.readFile(mdPath, "utf-8");
    res.send(mdData);
  } catch (err) {
    console.log(err);
    res.status(400);
    process.exit();
  }
});

// router.post("/", async (req, res) => {});

module.exports = router;
