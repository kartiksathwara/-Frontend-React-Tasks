// import Todo from "../models/Todo.js";

// export const getTodoList = async (req, res) => {
//   try {
//     const result = await Todo.findOne({ userId: req.user.userId });

//     if (!result) return res.status(404).json({ message: "Not found" });

//     res.json(result.todos);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching list" });
//   }
// };

// export const getTodoDetails = async (req, res) => {
//   try {
//     const result = await Todo.findOne({ userId: req.user.userId });

//     const todo = result.todos.find((t) => t.id === req.params.id);

//     res.json(todo);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching details" });
//   }
// };

// // export const saveTodo = async (req, res) => {
// //   try {
// //     const { id, title, description, usersAttached } = req.body;

// //     const todoDoc = await Todo.findOne({ userId: req.user.userId });

// //     if (id) {
// //       const index = todoDoc.todos.findIndex((t) => t.id === id);
// //       todoDoc.todos[index] = { id, title, description, usersAttached };
// //     } else {
// //       todoDoc.todos.push({
// //         id: uuidv4(),
// //         title,
// //         description,
// //         usersAttached
// //       });
// //     }

// //     await todoDoc.save();
// //     res.json({ message: "Saved successfully" });
// //   } catch (err) {
// //     res.status(500).json({ message: "Save error" });
// //   }
// // };

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



// // export const deleteTodo = async (req, res) => {
// //   try {
// //     const todoDoc = await Todo.findOne({ userId: req.user.userId });

// //     todoDoc.todos = todoDoc.todos.filter((t) => t.id !== req.params.id);

// //     await todoDoc.save();
// //     res.json({ message: "Deleted" });
// //   } catch (err) {
// //     res.status(500).json({ message: "Delete error" });
// //   }
// // };



// export const deleteTodo = async (req, res) => {
//   try {
//     const todoDoc = await Todo.findOne({ userId: req.user.userId });

//     todoDoc.todos.id(req.params.id).deleteOne();

//     await todoDoc.save();
//     res.json({ message: "Deleted" });

//   } catch (err) {
//     res.status(500).json({ message: "Delete error" });
//   }
// };

// // export const cloneTodo = async (req, res) => {
// //   try {
// //     const todoDoc = await Todo.findOne({ userId: req.user.userId });

// //     const original = todoDoc.todos.find((t) => t.id === req.params.id);

// //     const clone = {
// //       ...original._doc,
// //       id: uuidv4(),
// //       title: original.title + " (Copy)"
// //     };

// //     todoDoc.todos.push(clone);

// //     await todoDoc.save();
// //     res.json({ message: "Cloned" });
// //   } catch (err) {
// //     res.status(500).json({ message: "Clone error" });
// //   }
// // };


// export const cloneTodo = async (req, res) => {
//   try {
//     const todoDoc = await Todo.findOne({ userId: req.user.userId });

//     const original = todoDoc.todos.id(req.params.id);

//     todoDoc.todos.push({
//       title: original.title + " (Copy)",
//       description: original.description,
//       usersAttached: original.usersAttached,
//     });

//     await todoDoc.save();
//     res.json({ message: "Cloned" });

//   } catch (err) {
//     res.status(500).json({ message: "Clone error" });
//   }
// };

// export const reorderTodo = async (req, res) => {
//   try {
//     const { from, to } = req.body;

//     const todoDoc = await Todo.findOne({ userId: req.user.userId });

//     const arr = todoDoc.todos;
//     const item = arr.splice(from, 1)[0];
//     arr.splice(to, 0, item);

//     todoDoc.todos = arr;
//     await todoDoc.save();

//     res.json({ message: "Reordered" });
//   } catch (err) {
//     res.status(500).json({ message: "Reorder error" });
//   }
// };




import Todo from "../models/Todo.js";

// Get all todos
export const getTodoList = async (req, res) => {
  try {
    const result = await Todo.findOne({ userId: req.user.userId });
    if (!result) return res.status(404).json({ message: "Not found" });
    res.json(result.todos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching list" });
  }
};

// Get todo details
export const getTodoDetails = async (req, res) => {
  try {
    const result = await Todo.findOne({ userId: req.user.userId });
    const todo = result.todos.id(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Error fetching details" });
  }
};

// Save or update todo
export const saveTodo = async (req, res) => {
  try {
    const { id, title, description, usersAttached } = req.body;

    let todoDoc = await Todo.findOne({ userId: req.user.userId });
    if (!todoDoc) {
      todoDoc = new Todo({ userId: req.user.userId, todos: [] });
    }

    if (id) {
      const index = todoDoc.todos.findIndex((t) => t._id.toString() === id);
      if (index === -1) return res.status(404).json({ message: "Todo not found" });
      todoDoc.todos[index] = { ...todoDoc.todos[index]._doc, title, description, usersAttached };
    } else {
      todoDoc.todos.push({ title, description, usersAttached });
    }

    await todoDoc.save();
    res.json({ message: "Saved successfully" });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ message: "Save error" });
  }
};

// Delete todo
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

// Clone todo
export const cloneTodo = async (req, res) => {
  try {
    const todoDoc = await Todo.findOne({ userId: req.user.userId });
    const original = todoDoc.todos.id(req.params.id);
    if (!original) return res.status(404).json({ message: "Todo not found" });

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

// Reorder todos
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
