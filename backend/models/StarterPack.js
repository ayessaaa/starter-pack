import mongoose from "mongoose";

const starterPackSchema = mongoose.Schema(
  {
    name: { type: String, required: false },
    skin: { type: String, required: true },
    hair: { type: String, required: true },
    eyes: { type: String, required: true },
    top: { type: String, required: true },
    bottom: { type: String, required: true },
    shoes: { type: String, required: true },
    box2: { type: String, required: true },
    box3: { type: String, required: true },
    box4: { type: String, required: true },
    color: { type: String, required: true },
  },
  { timestamps: true }
);

export const StarterPack = mongoose.model("StarterPack", starterPackSchema);
