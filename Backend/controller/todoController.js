import Todo from "../models/Todo.js";

export const getTodoList = async (req, res) => {
  try {
    const result = await Todo.findOne({ userId: req.user.userId });

    if (!result) return res.status(404).json({ message: "Not found" });
    // if (!result) return res.json([]);

    res.json(result.todos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching list" });
  }
};

export const getTodoDetails = async (req, res) => {
  try {
    const result = await Todo.findOne({ userId: req.user.userId });

    const todo = result.todos.find((t) => t.id === req.params.id);

    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Error fetching details" });
  }
};
// export const saveTodo = async (req, res) => {
//   try {
//     console.log("Received todo data:", req.body);
//     console.log("User ID:", req.user.userId);

//     let todoDoc = await Todo.findOne({ userId: req.user.userId });

//     if (!todoDoc) {
//       todoDoc = new Todo({
//         userId: req.user.userId,
//         todos: [],
//       });
//     }

//     todoDoc.todos.push({
//       title: req.body.title,
//       description: req.body.description,
//       usersAttached: req.body.usersAttached,
//     });

//     await todoDoc.save();

//     res.json({ message: "Saved successfully" });
//   } catch (err) {
//     console.error("Save error:", err);
//     res.status(500).json({ message: "Save error" });
//   }
// };

export const saveTodo = async (req, res) => {
  try {
    console.log("Received todo data:", req.body);
    console.log("User ID:", req.user.userId);

    let todoDoc = await Todo.findOne({ userId: req.user.userId });

    if (!todoDoc) {
      todoDoc = new Todo({
        userId: req.user.userId,
        todos: [],
      });
    }

    if (req.body.id) {
      // Update existing todo
      const existingTodo = todoDoc.todos.id(req.body.id);
      if (!existingTodo) return res.status(404).json({ message: "Todo not found" });

      existingTodo.title = req.body.title;
      existingTodo.description = req.body.description;
      existingTodo.usersAttached = req.body.usersAttached;
    } else {
      // Create new todo
      todoDoc.todos.push({
        title: req.body.title,
        description: req.body.description,
        usersAttached: req.body.usersAttached,
      });
    }

    await todoDoc.save();
    res.json({ message: "Saved successfully" });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ message: "Save error" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todoDoc = await Todo.findOne({ userId: req.user.userId });

    todoDoc.todos.id(req.params.id).deleteOne();

    await todoDoc.save();
    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json({ message: "Delete error" });
  }
};

export const cloneTodo = async (req, res) => {
  try {
    const todoDoc = await Todo.findOne({ userId: req.user.userId });

    const original = todoDoc.todos.id(req.params.id);

    todoDoc.todos.push({
      title: original.title + " (Copy)",
      description: original.description,
      usersAttached: original.usersAttached,
    });

    await todoDoc.save();
    res.json({ message: "Cloned" });

  } catch (err) {
    res.status(500).json({ message: "Clone error" });
  }
};

export const reorderTodo = async (req, res) => {
  try {
    const { from, to } = req.body;

    const todoDoc = await Todo.findOne({ userId: req.user.userId });

    const arr = todoDoc.todos;
    const item = arr.splice(from, 1)[0];
    arr.splice(to, 0, item);

    todoDoc.todos = arr;
    await todoDoc.save();

    res.json({ message: "Reordered" });
  } catch (err) {
    res.status(500).json({ message: "Reorder error" });
  }
};