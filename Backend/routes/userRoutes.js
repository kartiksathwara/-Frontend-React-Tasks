import express from "express";
import { getUSers, creatUser, loginUser } from "../controller/userController.js";

const router = express.Router();

router.get("/", getUSers);
router.post("/register", creatUser);
router.post("/login",loginUser);

export default router;