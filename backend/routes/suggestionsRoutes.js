import express from "express";
import {Suggestion} from '../models/Suggestions.js'

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.text || !req.body.author  ) {
      // !req.body.skin || !req.body.hair || !req.body.eyes
      return res.status(400).send({
        message: "Please fill all the fields",
      });
    }
    const newSuggestion = {
      text: req.body.text,
      author: req.body.author,
    };

    const suggestion = await Suggestion.create(newSuggestion);

    return res.status(201).send(suggestion);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const suggestions = await Suggestion.find();
    return res.status(200).json({
      count: suggestions.length,
      data: suggestions,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const suggestion = await Suggestion.findById(id);
    return res.status(200).json(suggestion);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  if (!req.body.text || !req.body.author || !req.body.time || !req.body.skin || !req.body.hair || !req.body.eyes ) {
    return res.response(400).send({
      message: "Please fill all the fields",
    });
  }
  try {
    const { id } = req.params;
    const result = await Suggestion.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(400).send({
        message: "Suggestion not found",
      });
    }

    return res.status(200).send({ message: "Suggestion updated" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Suggestion.findByIdAndDelete(id);

    if (!result) {
      return res.status(400).send({
        message: "Suggestion not found",
      });
    }

    return res.status(200).send({ message: "Suggestion deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

export default router;
