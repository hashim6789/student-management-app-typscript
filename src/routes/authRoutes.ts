import { Router } from "express";
import AuthController from "../controllers/authController";
import {
  isAuthenticated,
  redirectIfAuthenticated,
} from "../middlewares/authMiddlewares";

const authRouter = Router();
const authController = new AuthController();

authRouter.get("/login", redirectIfAuthenticated, authController.getLogin);
authRouter.post("/login", redirectIfAuthenticated, authController.postLogin);

authRouter.get("/logout", isAuthenticated, authController.logout);

export default authRouter;
