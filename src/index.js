import express from "express";
import { bootStrap } from "./index.ruoter.js";

const app = express();
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await bootStrap(app, express);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();
