import mongoose from "mongoose";
const registeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
});

const Registree = mongoose.model("Registree", registeeSchema);

export default Registree;
