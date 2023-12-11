import mongoose from "mongoose";
const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: "date",
    required: true,
  },
  pictures: {
    type: [String],
  },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
