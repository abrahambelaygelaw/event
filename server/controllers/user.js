import randomstring from "randomstring";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import User from "./../models/User.js";
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const password = randomstring.generate(8);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const resetLink = "https://google.com";
    sendResetEmail(email, resetLink);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendResetEmail = (email, resetLink) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abrahambelaygelaw@gmail.com",
      pas: "299792458M/s",
    },
  });
  const mailOptions = {
    from: "abrahambelaygelaw@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `Click the link to reset your password: ${resetLink}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export { createUser };
