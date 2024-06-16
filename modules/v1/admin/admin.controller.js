const userModel = require("../../../models/v1/user");
const response = require("../../../utils/response/response");

const showUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    response.successResponse(res, 200, { users });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  if (req.user._id.toString() == id) {
    return response.errorResponse(res, 400, "you cant not remove yourself");
  }
  const user = await userModel.findByIdAndDelete(id);
  if (!user) return response.errorResponse(res, 402, "user does not found");
  return response.successResponse(
    res,
    201,
    `${user.userName} remove successfully`,
  );
};

const createManualUser = async (req, res) => {
  //Get ReqBody
  const { userName, email, role, password } = req.body;
  //Check User email
  const isExsistemail = await userModel.findOne({
    email,
  });
  if (isExsistemail) {
    response.errorResponse(
      res,
      401,
      "error",
      "this email is already used by another",
    );
  }
  //Register User
  await userModel.create({
    userName,
    password,
    email,
    role,
  });
  //Send Response
  response.successResponse(res, 201, "user created succesfully");
};

const search = async (req, res, next) => {
  try {
    //userName role isBan email
    const users = await userModel.find(
      req.query,
      "-password -createdAt -updatedAt -__v",
    );
    response.successResponse(res, 200, { users });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  showUsers,
  remove,
  addUser: createManualUser,
  search,
};
