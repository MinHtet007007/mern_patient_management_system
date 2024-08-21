import mongoose from "mongoose";

// Function to generate a random numeric string
function generateRandomString(length) {
  const characters = "0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Volunteer Schema
const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    unique: true,
  },
  volunteer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "volunteers",
    required: true,
  },
});

// Pre-save hook to generate a random numeric code
PatientSchema.pre("save", function (next) {
  if (!this.code) {
    const randomString = generateRandomString(6);
    this.code = `${randomString}`;
  }
  next();
});

export default mongoose.model("patients", PatientSchema);
