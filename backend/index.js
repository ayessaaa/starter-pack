import express, { response } from "express";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from 'dotenv';
import suggestionsRoutes from './routes/suggestionsRoutes.js';
import starterPackRoutes from './routes/starterPackRoutes.js';

dotenv.config();

const app = express();

// middleware
app.use(express.json());

app.use(cors())

const port = process.env.PORT || 3000;
const mongodb_url = process.env.MONGODB_URL

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("welcome");
});

app.use("/suggestions", suggestionsRoutes)
app.use("/starter-pack", starterPackRoutes)

mongoose
  .connect(mongodb_url)
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`App is listening to port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

