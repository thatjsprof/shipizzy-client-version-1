import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .nullable()
    .required("Please enter your email")
    .email("Please enter a valid email"),
  password: Yup.string().nullable().required("Please enter your password"),
});

export const signupValidation = Yup.object().shape({
  name: Yup.string().nullable().required("Please enter your name"),
  email: Yup.string()
    .nullable()
    .required("Please enter your email")
    .email("Please enter a valid email"),
  password: Yup.string()
    .nullable()
    .required("Please enter your password")
    .min(6, "Your password must be greater than 6 characters"),
  confirm_password: Yup.string()
    .nullable()
    .required("Please confirm your password.")
    .min(6, "Your password must be greater than 6 characters")
    .oneOf(
      [Yup.ref("password"), null],
      "Password and confirm password must match"
    ),
});

export const forgotPasswordValidation = Yup.object().shape({
  email: Yup.string()
    .nullable()
    .required("Please enter your email")
    .email("Please enter a valid email"),
});
