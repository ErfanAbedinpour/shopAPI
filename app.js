const app = require("./server");
const path = require("path");
const { connect } = require("mongoose");

require("dotenv").config({ path: path.join(__dirname, "config", ".env") });

(async function () {
  await connectDB(process.env.MONGODB_URL || "");
  runServer(process.env.PORT || 3000);
})();

//run server
function runServer(port) {
  try {
    port = parseInt(port);
    if (isNaN(port) || port < 0) {
      return new Error("please enter a valid port");
    }
    app.listen(port, () => {
      console.log("server is on port " + port);
    });
  } catch (err) {
    return new Error(err.message);
  }
}

//connecred to mongo db
async function connectDB(url) {
  try {
    console.log("url is ", url);
    await connect(url);
    console.log("DB is connected");
  } catch (err) {
    return new Error(err.message);
  }
}
