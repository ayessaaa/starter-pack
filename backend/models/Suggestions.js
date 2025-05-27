import mongoose from "mongoose";

const suggestionsSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    author: { type: String, required: true },
    time: { type: Date, required: false },
    skin: { type: String, required: false },
    hair: { type: String, required: false },
    eyes: { type: String, required: false },
    likes: { type: Number, required: false },
  },
  { timestamps: true }
);

export const Suggestion = mongoose.model("Suggestion", suggestionsSchema);
