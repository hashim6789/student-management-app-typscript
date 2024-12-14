import { Request, Response, NextFunction } from "express";

// Middleware to check if the user is authenticated
export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.session && req.session.studentId) {
    return next();
  }
  res.redirect("/login");
}

// Middleware to check if the admin is authenticated
export function isAdmin(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.adminId) {
    return next();
  }
  res.redirect("/admin/login");
}

// Middleware to redirect if already authenticated
export function redirectIfAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.session) {
    if (req.session.studentId) {
      return res.redirect(`/students/${req.session.studentId}`);
    } else if (req.session.adminId) {
      return res.redirect("/admin/dashboard");
    }
  }
  next();
}
