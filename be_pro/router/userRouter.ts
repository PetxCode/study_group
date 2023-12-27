import { Router } from "express";
import {
  logOutUser,
  readOneUser,
  readUser,
  readUserCookie,
  registerUser,
  signinUser,
  verifyUser,
} from "../controller/userController";

const router: Router = Router();

router.route("/register").post(registerUser);
router.route("/read-users").get(readUser);
router.route("/read-one-user/:userID").get(readOneUser);
router.route("/sign-in").post(signinUser);
router.route("/user-cookie").get(readUserCookie);
router.route("/logout").delete(logOutUser);
router.route("/verify-user/:userID").patch(verifyUser);

export default router;
