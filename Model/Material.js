const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    material: String,
    semester: String,
    subject: String,
    pdf: String,
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Material", materialSchema);
