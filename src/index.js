require("dotenv").config();

const app = require("./app");
const port = process.env.PORT || 4201;

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});