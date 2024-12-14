// src/controllers/StudentController.ts

import { Request, Response } from "express";
import Student from "../models/Student";
import bcrypt from "bcryptjs";

class StudentController {
  // Get all students
  public async getStudents(req: Request, res: Response): Promise<void> {
    try {
      const students = await Student.find();
      // If an Axios request comes through, send JSON response
      if (req.xhr || req.accepts("json")) {
        res.status(200).json(students);
      } else {
        // Otherwise, render the dashboard view with the students data
        res.render("admin/dashboard", { students });
      }
    } catch (error) {
      // Error handling
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res
          .status(500)
          .json({ success: false, message: "An unknown error occurred." });
      }
    }
  }

  // Get student by ID
  public async getStudentById(req: Request, res: Response): Promise<void> {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        res.status(404).json({ message: "Student not found" });
        return;
      }
      res.status(200).render("student/studentPage", { student });
      // res.status(200).json(student);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res
          .status(500)
          .json({ success: false, message: "An unknown error occurred." });
      }
    }
  }

  // Create new student
  public async createStudent(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, grade, password } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const student = new Student({
        name,
        email,
        grade,
        password: hashedPassword,
      });

      console.log(student);

      const savedStudent = await student.save();

      if (savedStudent) {
        res.status(201).redirect("/students");
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res
          .status(500)
          .json({ success: false, message: "An unknown error occurred." });
      }
    }
  }

  // Update student by ID
  public async updateStudent(req: Request, res: Response): Promise<void> {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      // console.log(updatedStudent);
      if (!updatedStudent) {
        res.status(404).json({ message: "Student not found" });
        return;
      }
      res.status(200).json(updatedStudent);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res
          .status(500)
          .json({ success: false, message: "An unknown error occurred." });
      }
    }
  }

  // Delete student by ID
  public async deleteStudent(req: Request, res: Response): Promise<void> {
    try {
      const deletedStudent = await Student.findByIdAndDelete(req.params.id);
      if (!deletedStudent) {
        res.status(404).json({ message: "Student not found" });
        return;
      }
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res
          .status(500)
          .json({ success: false, message: "An unknown error occurred." });
      }
    }
  }
}

export default StudentController;
