import { Schema, model } from "mongoose";

interface INote {
  content: string;
  author: string;
}

const noteSchema = new Schema<INote>(
  {
    content: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true }
);

const Note = model<INote>("Note", noteSchema);

export default Note;
