// src/routes/studentRoutes.ts

import { Router } from "express";
import StudentController from "../controllers/studentControllers";
import { isAdmin, isAuthenticated } from "../middlewares/authMiddlewares";

const router = Router();
const studentController = new StudentController();

router.get("/", isAdmin, studentController.getStudents);
router.get("/:id", isAuthenticated, studentController.getStudentById);
router.post("/", isAdmin, studentController.createStudent);
router.put("/:id", isAdmin, studentController.updateStudent);
router.delete("/:id", isAdmin, studentController.deleteStudent);

export default router;
