const express = require("express");
const router = express.Router();
const {
  handleGenerateNewUrl,
  handleRedirectUrl,
  handleGetAnalytics,
} = require("../controllers/url");

const { restrictToLoggedInUserOnly } = require("../middleware/auth");

router.post("/", restrictToLoggedInUserOnly, handleGenerateNewUrl);
router.get("/:id", handleRedirectUrl);
router.get(
  "/analytics/:shortID",
  restrictToLoggedInUserOnly,
  handleGetAnalytics
);

module.exports = router;
