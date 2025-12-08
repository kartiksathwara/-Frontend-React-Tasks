import mongoose from "mongoose";

const todoItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  usersAttached: Array,
}, { timestamps: true });

const todoSchema = new mongoose.Schema({
  userId: String,
  todos: [todoItemSchema],
});

export default mongoose.model("Todo", todoSchema);
