const User = require("../models/user");
const { setUser } = require("../service/auth");

const handleUserSignUp = async (req, resp, next) => {
  let { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return resp.redirect("/");
};

const handleUserLogin = async (req, resp) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email, password });
  if (!user) {
    return resp.render("pages/login", {
      message: "Email or password incorrect",
    });
  }
  let token = setUser(user);
  resp.cookie("uid", token);
  return resp.redirect("/");
};

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
