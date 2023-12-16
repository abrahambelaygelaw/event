import randomstring from "randomstring";
import bcrypt from "bcrypt";
import User from "./../models/User.js";
import sendEmail from "../utils/sendEmails.js";
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
    sendEmail(email, "Password ", `here is your password ${password}`);
    res.json("success");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {};
const deleteUser = async (req, res) => {};
const getUser = async (req, res) => {
  try {
  } catch (error) {}
};
export { updateUser, createUser, getUser, deleteUser };
