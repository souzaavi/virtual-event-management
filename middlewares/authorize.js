const CustomError = require("../utils/CustomError");

const authorize =(...allowedRoles) => {
  return (req, res, next) => {
    if(!req.user || !req.user.role) return next(new CustomError(401, ['Unauthorized Request']));
    const roles = [...allowedRoles];
    const result = roles.includes(req.user.role);
    if(!result) return next(new CustomError(401, ['Not authorized to access this route']));
    next();
  }
};

module.exports = authorize;
