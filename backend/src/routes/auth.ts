import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post(
  "/login",
  [
    //Express validator
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],

  async (req: Request, res: Response) => {
    //Express validator sends error, if there is any.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    //Server getting the request from a user
    const { email, password } = req.body;

    try {
      //Finding the user by his email
      const user = await User.findOne({ email: email });

      //If he does not exist in database, sending error response
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      //Comparing the user's password with his registered password by hashing it with bcrypt
      const isMatch = await bcrypt.compare(password, user.password);

      //If the passwords dont match, sending error response
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      //If passwords match, creating a token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      //Sending the token as a cookie to the user's browser
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      //Sending user id, i dont know where.I hope chatgpt can explain this part
      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});

export default router;
