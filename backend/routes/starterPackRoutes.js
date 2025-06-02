import express from "express";
import { StarterPack } from "../models/StarterPack.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newStarterPack = {
      name: req.body.name,
      skin: req.body.skin,
      hair: req.body.hair,
      eyes: req.body.eyes,
      top: req.body.top,
      bottom: req.body.bottom,
      shoes: req.body.shoes,
      box2: req.body.box2,
      box3: req.body.box3,
      box4: req.body.box4,
      color: req.body.color,
    };

    const starterPack = await StarterPack.create(newStarterPack);

    return res.status(201).send(starterPack);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const starterPack = await StarterPack.find();
    return res.status(200).json({
      count: starterPack.length,
      data: starterPack,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const starterPack = await StarterPack.findById(id);
    return res.status(200).json(starterPack);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  if (
    !req.body.text ||
    !req.body.author ||
    !req.body.time ||
    !req.body.skin ||
    !req.body.hair ||
    !req.body.eyes
  ) {
    return res.response(400).send({
      message: "Please fill all the fields",
    });
  }
  try {
    const { id } = req.params;
    const result = await StarterPack.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(400).send({
        message: "StarterPack not found",
      });
    }

    return res.status(200).send({ message: "Starter Pack updated" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await StarterPack.findByIdAndDelete(id);

    if (!result) {
      return res.status(400).send({
        message: "Starter Pack not found",
      });
    }

    return res.status(200).send({ message: "Starter Pack deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

export default router;
