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
const VolunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "volunteer"],
    required: true,
    default: "volunteer",
  },
});

// Pre-save hook to generate a random numeric code starting with "VOL_"
VolunteerSchema.pre("save", function (next) {
  if (!this.code) {
    const randomString = generateRandomString(8); 
    this.code = `VOL_${randomString}`; 
  }
  next();
});

export default mongoose.model("volunteers", VolunteerSchema);
