const CustomError = require("../utils/CustomError");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return next(new CustomError(401, ["Unauthorized Request"]));
    }
    console.log(token);
    req.user = await jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    console.log(e);
    next(new CustomError(401, ["Unauthorized Request"]));
  }
}





module.exports = verifyToken;
