const { errorResponse } = require("../utils/response/response");

const validator = (schema) => {
  //Validator middlewares To Check Input is Correct if not Retuen Error
  return async (req, res, next) => {
    try {
      await schema.validate(req.body);
      next()
    } catch (e) { 
      errorResponse(res,401,'error',e.message);
    }
  };
};

module.exports = validator;
