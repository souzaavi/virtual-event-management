const CustomError = require("../utils/CustomError");

const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({errors: err.errors});
  } else {
    res.status(500).json({errors: ['Internal Server Error']});
  }
}

module.exports = errorHandler;
