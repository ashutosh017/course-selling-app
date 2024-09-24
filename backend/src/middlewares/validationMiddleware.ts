import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { signupSignupSchema } from "../validators/adminValidation";

export const validateSigninCreds = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requiredBody = signupSignupSchema

  const parsedBody = requiredBody.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      msg: "Invalid input",
      error: parsedBody.error.errors,
    });
  }

  req.body = parsedBody.data;
  next();
};

