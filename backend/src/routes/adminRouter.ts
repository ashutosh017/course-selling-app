import { Router} from "express";
import {validateSigninCreds} from "../middlewares/validationMiddleware";
import { adminSignin, adminSignup, createCourse, fetchAdminCourses, updateCourse } from "../controllers/adminController";
import { isAdminLoggedIn } from "../middlewares/adminMiddleware";

const adminRouter = Router();

adminRouter.post("/signup",validateSigninCreds,adminSignup );
adminRouter.post("/signin", validateSigninCreds,adminSignin);
adminRouter.get("/course", isAdminLoggedIn, fetchAdminCourses)
adminRouter.post("/course", isAdminLoggedIn, createCourse)    //todo
adminRouter.put("/course", isAdminLoggedIn, updateCourse)   //todo

export default adminRouter;
