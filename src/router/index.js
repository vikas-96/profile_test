import express from 'express';
import { isAuthunticated } from "../middleware/auth.js";
import * as AuthController from "../controllers/AuthController.js";
import * as UserController from "../controllers/UserController.js";
const router = express.Router();

//Auth
router.post("/auth/login", AuthController.login);

//User
router.get("/user", isAuthunticated, UserController.get_users);
router.post("/user", UserController.create_user);
router.get(
  "/user/:id([0-9]+)",
  isAuthunticated,
  UserController.show_user
);
router.patch(
  "/user/:id([0-9]+)",
  isAuthunticated,
  UserController.update_user
);

export default router;