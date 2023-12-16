import Event from "../models/Event.js";
const getEvents = async (req, res) => {
  try {
    const count = await Event.countDocuments();
    const data = await Event.find();
    res.json({ count, data });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Event.findById(id);
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const createEvent = async (req, res) => {
  try {
    const formData = req.body;
    formData.pictures = req.files.map((file) => file.path);
    const newEvent = new Event(formData);
    newEvent.save();
    res.json("formdata saved");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
const updateEvent = async (req, res) => {};
const deleteEvent = async (req, res) => {};
export { getEvent, getEvents, updateEvent, deleteEvent, createEvent };
