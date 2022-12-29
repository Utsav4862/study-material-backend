const jwt = require("jsonwebtoken");
const key = "adsfgdlfpowierure304958fkjd";

const auth = async (req, res, next) => {
  try {
    let token = await req.headers["authorization"].split(" ")[1];
    // console.log(token);
    const decoded = jwt.verify(token, key);
    // console.log(decoded);
    console.log(decoded["user"], "auth");
    req.user = decoded["user"];
    next();
  } catch (err) {
    console.log(err);
    res.send({
      error: "Unauthorized User!!!",
    });
  }
};

module.exports = { auth };
