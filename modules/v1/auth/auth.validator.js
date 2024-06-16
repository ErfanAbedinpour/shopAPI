//This Module most Check Input
const yup = require("yup");

//This is Check Singup Input
const singUp = yup.object({
    userName: yup.string().min(3, "must be 3 characters long").required(),
    email: yup
        .string()
        .email("please enter valid email address")
        .required("email is required"),
    password: yup
        .string()
        .min(8, "password must be at least 8 characters long")
        .required("password is requried"),
    confirmPassword: yup
        .string()
        .oneOf(
            [yup.ref("password"), "confirm Password is required"],
            "Passwords must match",
        )
        .required("confirm pass is required"),
    role: yup.string().oneOf(["ADMIN", "USER"], "role is not valid").optional(),
});

//Login Input Validator
const login = yup.object({
    email: yup
        .string()
        .email("please enter valid email address")
        .required("email is required"),
    password: yup
        .string()
        .min(8, "password must be at least 8 characters long")
        .required("password is requried"),
});

const changePassword = yup.object({
    password: yup
        .string()
        .min(8, "password must be at least 8 characters long")
        .required("password is requried"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    token: yup.string().required(),
});

//
// const ProductAdd = yup.object({
//     title: yup
//         .string()
//         .required()
//         .error(new Error("لطفا  یک نام معتبر برای محصول وارد کنید")),
//     describe: yup
//         .string()
//         .error(new Error("لطفا یک توضیح برای محصول بنویسید"))
//         .required(),
//     price: yup
//         .string()
//         .max(30)
//         .required()
//         .error(new Error("محصول بدون قیمت نمیشه ک میشه؟")),
//     model: yup
//         .string()
//         .required()
//         .error(new Error("به هر حال یک مدلی هم داره دیگ؟")),
//     invent: yup.string().required().error(new Error("لطفا تعداد را وارد کنید")),
//     categorie: yup.string().required(),
//     disCount: yup.string().allow(),
// });

// const validator = (schema) => {
//   //Validator middlewares To Check Input is Correct if not Retuen Error
//   return async (body) => {
//     try {
//       await schema.validate(body);
//       next();
//     } catch (e) {
//       errorResponse(res,401,'error',e.message)
//     }
//   };
// };

// validator(singUp)(JSON.stringify({"userName":"erfan",
//     "email":"erfan@gmail.com",
//     "password":"erfan12341234_"}))
module.exports = {
    singUp,
    login,
    changePassword,
};
