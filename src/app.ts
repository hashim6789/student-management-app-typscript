import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "./config/db";
import userRouter from "./routes/authRoutes";
import studentRoutes from "./routes/studentRoutes";
import adminRouter from "./routes/adminRoutes";
import morgan from "morgan";
import path from "path";

const app = express();

connectDB();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session handling
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

//for cache handling
app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.set("Surrogate-Control", "no-store");

  next();
});

app.use(morgan("dev"));
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.session);
  next();
});

app.use("/", userRouter);
app.use("/students", studentRoutes);
app.use("/admin", adminRouter);

// / Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).render("_404");
});
export default app;
