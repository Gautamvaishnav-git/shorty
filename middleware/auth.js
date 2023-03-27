const { getUser } = require("../service/auth");

const restrictToLoggedInUserOnly = async (req, resp, next) => {
  const userUid = req.cookies?.uid;
  if (!userUid) return resp.redirect("/login");

  let user = getUser(userUid);
  if (!user) return resp.redirect("/login");
  req.user = user;
  next();
};

const checkAuth = async (req, resp, next) => {
  const userUid = req.cookies?.uid;
  let user = getUser(userUid);
  req.user = user;
  next();
};

module.exports = {
  restrictToLoggedInUserOnly,
  checkAuth,
};
