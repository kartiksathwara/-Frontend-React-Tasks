import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getTodoList,
  getTodoDetails,
  saveTodo,
  deleteTodo,
  cloneTodo,
  reorderTodo,
} from "../controller/todoController.js";

const router = express.Router();

router.get("/todos", auth, getTodoList);
router.get("/:id", auth, getTodoDetails);
router.post("/save", auth, saveTodo);
router.put("/save/:id", auth, saveTodo); // update route
router.delete("/:id", auth, deleteTodo);
router.post("/clone/:id", auth, cloneTodo);
router.post("/reorder", auth, reorderTodo);

export default router;
