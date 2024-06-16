const yup = require("yup");

exports.sendMail = yup.object({
  userName: yup.string().required("userName is required"),
  text: yup.string().required("please enter your text"),
  email: yup.string().email("enter valid email").required("email is required"),
});
