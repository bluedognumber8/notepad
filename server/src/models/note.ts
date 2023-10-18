import mongoose, { Schema, model } from "mongoose";

interface INote {
  content: string;
  author: Schema;
  favoriteCount: Number;
  favoritedBy: Schema;
}

const noteSchema = new Schema<INote>(
  {
    content: { type: String, required: true },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    favoriteCount: {
      type: Number,
      default: 0,
    },
    favoritedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Note = model<INote>("Note", noteSchema);

export default Note;
