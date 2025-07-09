import dotenv from "dotenv";
import app from "./app.js";
import connectDb from "./db/index.js";
import setupSocket from "./socket.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 5000;

// Connect to the database and start the server
connectDb()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`App is listening at http://localhost:${port}`);
    });
    setupSocket(server);
  })
  .catch((error) => {
    console.log("MONGO db connection failed !!! ", error);
  });
