import mongoose from "mongoose";

const suggestionsSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    author: { type: String, required: true },
    time: { type: Date, required: false },
    skin: { type: String, required: true },
    hair: { type: String, required: true },
    eyes: { type: String, required: true },
    likes: { type: Number, required: false },
    color: { type: String, required: true },
  },
  { timestamps: true }
);

export const Suggestion = mongoose.model("Suggestion", suggestionsSchema);
