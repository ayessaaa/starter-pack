import express from "express";
import {Book} from '../models/Suggestions.js'

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.text || !req.body.author || !req.body.time || !req.body.skin || !req.body.hair || !req.body.eyes ) {
      return res.response(400).send({
        message: "Please fill all the fields",
      });
    }
    const newSuggestion = {
      text: req.body.text,
      author: req.body.author,
      time: req.body.time,
      skin: req.body.skin,
      hair: req.body.hair,
      eyes: req.body.eyes,
    };

    const suggestion = await Book.create(newSuggestion);

    return res.status(201).send(suggestion);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

export default router;
