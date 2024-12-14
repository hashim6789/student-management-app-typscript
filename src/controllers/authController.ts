import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Student from "../models/Student";

class AuthController {
  public getLogin(req: Request, res: Response): void {
    try {
      const error: string = req.session.error || "";
      delete req.session.error;
      res.render("student/login", { msg: error });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  public async postLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      let user = await Student.findOne({ email });
      console.log(user);
      if (user && (await bcrypt.compare(password, user.password))) {
        req.session.studentId = String(user._id);
        res.redirect(`/students/${user._id}`);
        // res.status(200).json({ message: "user login successfully" });
      } else {
        req.session.error = "The student doesn't exist";
        res.status(404).redirect("/login");
        // res.status(404).json({ message: "No user found the database!!!" });
      }
    } catch (err) {
      res.status(500).json({ message: "server error!!!" });
    }
  }

  public async logout(req: Request, res: Response): Promise<void> {
    try {
      req.session.destroy((err) => {
        if (err) {
          res.status(500).json({ success: false, message: "Logout failed." });
        } else {
          res.clearCookie("connect.sid"); // Clear the session cookie if needed
          res.redirect("/login");
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

export default AuthController;
