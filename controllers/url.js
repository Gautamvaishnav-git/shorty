const URL = require("../models/url");
const shortid = require("shortid");

const handleGenerateNewUrl = async (req, resp) => {
  let body = req.body;
  if (!body.url) return resp.status(400).json({ error: "please provide url" });
  let shortID = shortid.generate();
  let result = await URL.create({
    shortID,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user.id
  });
  return resp.render("pages/", {
    allUrls: [result],
  });
};

const handleRedirectUrl = async (req, resp) => {
  let findUrl = await URL.findOneAndUpdate(
    { shortID: req.params.id },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  resp.redirect(findUrl.redirectUrl);
};

const handleGetAnalytics = async (req, resp) => {
  let shortID = req.params.shortID;
  let result = await URL.findOne({ shortID });
  resp.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  handleGenerateNewUrl,
  handleRedirectUrl,
  handleGetAnalytics,
};
