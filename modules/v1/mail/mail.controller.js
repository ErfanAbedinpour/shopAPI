const mailModel = require("../../../models/v1/mail");
const sendEmail = require("../../../utils/helper/sendMail");
const response = require("../../../utils/response/response");

//send email
exports.sendMail = async (req, res) => {
  const { userName, email, text } = req.body;
  const result = await mailModel.create({
    userName,
    email,
    text,
  });
  if (!result)
    return response.errorResponse(
      res,
      401,
      "error",
      "faild to send please try again later",
    );
  response.successResponse(res, 200, {
    code: "success",
    msg: "mail send successfully",
  });
};

//delete email
exports.deleteMail = async (req, res) => {
  const { id } = req.params;
  const result = await mailModel.deleteOne({
    _id: id,
  });
  if (!result)
    return response.errorResponse(res, 401, "error", "email deleted faild ");
  response.successResponse(res, 200, {
    code: "success",
    msg: "email deleted successfully",
  });
};

//send answer to email
exports.sendAnswer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const { email } = await mailModel.findById(id);
    if (await sendEmail(email, "online shop answer", text)) {
      await mailModel.findByIdAndUpdate(id, {
        $set: { isAnswer: true },
      });
      return response.successResponse(res, 201, {
        msg: "email send successfully",
      });
    } else {
      return response.errorResponse(res, 400, "error", "faild to send email");
    }
  } catch (error) {
    next(error);
  }
};

//show all emails
exports.showEmails = async function(req, res, next) {
  try {
    const emails = await mailModel
      .find({})
      .select("-createdAt -updatedAt -__v");
    response.successResponse(res, 200, { emails });
  } catch (e) {
    next(e);
  }
};
