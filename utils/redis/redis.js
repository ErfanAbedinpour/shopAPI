const { createClient } = require("redis");

const client = createClient();

client.on("error", function (err) {
  throw new Error(err.message);
});

(async function () {
  await client.connect();
  console.log("redis connected succesfully");
})();

module.exports = client;
