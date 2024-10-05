import dotenv from "dotenv";
import app from "./app.js";
import connectDb from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 5000;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`App is listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("MONGO db connection failed !!! ", error);
  });
