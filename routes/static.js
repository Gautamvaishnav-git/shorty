const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/", async (req, resp) => {
  if (!req.user) return resp.redirect("/login");
  const allUrls = await URL.find({ createdBy: req.user._id });
  return resp.render("pages/", { allUrls });
});

router.get("/about", async (req, resp) => {
  return resp.render("pages/about");
});

router.get("/signup", (req, resp) => {
  return resp.render("pages/signup");
});

router.get("/login", (req, resp) => {
  return resp.render("pages/login");
});

module.exports = router;
