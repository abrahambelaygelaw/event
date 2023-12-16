import Event from "../models/Event.js";
import Registree from "../models/Registrees.js";
import sendEmail from "../utils/sendEmails.js";

const getRegistree = async (req, res) => {};
const createRegistree = async (req, res) => {
  try {
    const formData = req.body;
    console.log(req.body);
    const registeredEvent = await Event.findById(formData.event);
    const newRegistree = new Registree({
      name: formData.name,
      email: formData.email,
      event: formData.event,
    });
    await newRegistree.save();
    sendEmail(
      formData.email,
      "Event Confirmation",
      `You successfully registered to ${registeredEvent.title}. See you at ${
        registeredEvent.location
      } ${new Date(registeredEvent.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      })}.
      For more information ${formData.link}`
    );
    res.json("success");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateRegistree = async (req, res) => {};
const deleteRegistree = async (req, res) => {};

export { getRegistree, updateRegistree, deleteRegistree, createRegistree };
