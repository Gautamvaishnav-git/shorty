const mongoose = require("mongoose");

const connectToMongo = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("bhai mongoose chal rha hai");
  } catch (error) {
    console.log("bhai mongoose nhi chal rha hai");
  }
};

module.exports = {
  connectToMongo,
};
