import { Router } from "express";
import AdminController from "../controllers/adminController";
import {
  isAdmin,
  redirectIfAuthenticated,
} from "../middlewares/authMiddlewares";

const adminRouter = Router();
const adminController = new AdminController();

adminRouter.get(
  "/login",
  redirectIfAuthenticated,
  adminController.getAdminLogin
);
adminRouter.post(
  "/login",
  redirectIfAuthenticated,
  adminController.postAdminLogin
);
adminRouter.get("/dashboard", isAdmin, adminController.getDashboard);
adminRouter.get("/logout", isAdmin, adminController.logout);

export default adminRouter;
