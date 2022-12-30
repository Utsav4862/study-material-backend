const { log } = require("console");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const cloudinary = require("../cloudinary");
const Material = require("../Model/Material");

const materialUpload = async (req, res) => {
  try {
    let student = await req.user;
    let { material, semester, subject } = req.body;

    let resp = await cloudinary.cloudinaryUpload(req.file.path);
    await unlinkAsync(req.file.path);
    let mat = {
      material,
      semester,
      subject,
      pdf: resp.secure_url,
      student: student._id,
    };

    let mate = await Material.create(mat);
    let respo = await Material.findOne({ _id: mate._id }).populate(
      "student",
      "-password"
    );
    res.send(respo);
  } catch (error) {
    console.log(error);
  }
};

const allMaterial = async (req, res) => {
  let all = await Material.find()
    .populate("student", "-password")
    .sort({ createdAt: -1 });
  res.send(all);
};

const searchMaterial = async (req, res) => {
  let sem = req.body.semester;

  const keyword =
    req.body.semester && req.body.search
      ? {
          $and: [
            {
              $or: [
                { material: { $regex: req.body.search, $options: "i" } },
                { subject: { $regex: req.body.search, $options: "i" } },
              ],
            },
            {
              semester: sem,
            },
          ],
        }
      : req.body.search
      ? {
          $or: [
            { material: { $regex: req.body.search, $options: "i" } },
            { subject: { $regex: req.body.search, $options: "i" } },
          ],
        }
      : req.body.semester
      ? {
          semester: sem,
        }
      : {};

  let mat = await Material.find(keyword)
    .populate("student", "-password")
    .sort({ createdAt: -1 });

  res.send(mat);
};

module.exports = { materialUpload, allMaterial, searchMaterial };
