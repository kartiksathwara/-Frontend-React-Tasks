// import mongoose from "mongoose";

// const userAttachedSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   date: Date
// });

// const todoItemSchema = new mongoose.Schema({
//   id: String,
//   title: String,
//   description: String,
//   usersAttached: [userAttachedSchema]
// });

// const todoSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   name: String,
//   email: String,
//   todos: [todoItemSchema]
// });

// export default mongoose.model("Todo", todoSchema);




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
