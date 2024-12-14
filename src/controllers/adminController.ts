import { Request, Response } from "express";
import Student from "../models/Student";
import dotenv from "dotenv";

dotenv.config();

class AdminController {
  public getAdminLogin(req: Request, res: Response): void {
    const error: string = req.session.error || "";
    delete req.session.error;
    res.render("admin/login", { msg: error });
  }

  public postAdminLogin(req: Request, res: Response): void {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      req.session.adminId = email;

      return res.redirect("/admin/dashboard");
    }

    req.session.error = "Invalid email or password";
    return res.redirect("/admin/login");
    // res.status(401).json({ message: "Invalid email or password" });
  }

  public async getDashboard(req: Request, res: Response): Promise<void> {
    try {
      const students = await Student.find();
      res.status(200).render("admin/dashboard", { students });
      //   res.status(200).json(students);
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

  public async logout(req: Request, res: Response): Promise<void> {
    try {
      req.session.destroy((err) => {
        if (err) {
          res.status(500).json({ success: false, message: "Logout failed." });
        } else {
          res.clearCookie("connect.sid");
          res.redirect("/admin/login");
          // res
          //   .status(200)
          //   .json({ success: true, message: "Logged out successfully." });
        }
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "An unknown error occurred." });
    }
  }
}

export default AdminController;
