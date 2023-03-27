const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongo } = require("./connection");

const { checkAuth } = require("./middleware/auth");
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/static");
const userRouter = require("./routes/user");

const PORT = process.env.PORT | 8001;
connectToMongo("mongodb://127.0.0.1:27017/shortner");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", urlRouter);
app.use("/", checkAuth, staticRouter);
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`bhai server ${PORT} per chal rha hai`));
