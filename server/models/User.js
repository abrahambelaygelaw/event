import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "must provide first name"],
  },
  lastName: {
    type: String,
    required: [true, "must provide last name"],
  },
  email: {
    type: String,
    required: [true, "must provide email"],
  },
  // picture: String,
  password: {
    type: String,
  },
  // firstTimeLogin: {
  //   type: Boolean,
  //   default: true,
  // },
  // role: {
  //   type: String,
  //   enum: ["admin", "user"],
  //   default: "user",
  // },
  // createdAt: {
  //   type: Date,
  //   default: new Date(),
  // },
});
const User = mongoose.model("User", userSchema);

export default User;
