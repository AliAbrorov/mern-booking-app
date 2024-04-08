import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();
router.post(
  "/register",
  [
    //EXPRESS-VALIDATOR
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email ise required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    //Express validator sending errors if there is an error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      //1.Find if the user exists
      let user = await User.findOne({
        email: req.body.email,
      });

      //2.If he does, then send the message telling the user already exists
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      //3.If he does not exist, create a new user with the data sent.
      user = new User(req.body);

      //4.Save the created user to the database
      await user.save();

      //Creating jsonwebtoken
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      //Sending the token to the user's browser as a cookie
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      return res.status(200).send({ message: "User registered OK" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

export default router;
