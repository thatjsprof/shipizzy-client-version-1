import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .nullable()
    .required("Please enter your email")
    .email("Please enter a valid email"),
  password: Yup.string().nullable().required("Please enter your password"),
});

export const editUserValidation = Yup.object().shape({});

export const signupValidation = Yup.object().shape({
  name: Yup.string().nullable().required("Please enter your name"),
  email: Yup.string()
    .nullable()
    .required("Please enter your email")
    .email("Please enter a valid email"),
  accountType: Yup.string().nullable().required("Account Type is required"),
  businessName: Yup.string().when("accountType", {
    is: "business",
    then: Yup.string().required("Business Name is required"),
  }),
  rcNumber: Yup.string().when("accountType", {
    is: "business",
    then: Yup.string().required("RC Number is required"),
  }),
  password: Yup.string()
    .nullable()
    .required("Please enter your password")
    .min(8, "Your password must be at least 8 characters"),
  confirm_password: Yup.string()
    .nullable()
    .required("Please confirm your password.")
    .min(8, "Your password must be at least 8 characters")
    .oneOf(
      [Yup.ref("password"), null],
      "Password and confirm password must match"
    ),
  agree: Yup.bool().isTrue("You must agree to our terms and conditions"),
});

export const forgotPasswordValidation = Yup.object().shape({
  email: Yup.string()
    .nullable()
    .required("Please enter your email")
    .email("Please enter a valid email"),
});

export const resetPasswordValidation = Yup.object().shape({
  password: Yup.string().nullable().required("Password is required"),
  newPassword: Yup.string().nullable().required("New Password is reuired"),
});

export const changePasswordValidation = Yup.object().shape({
  password: Yup.string().nullable().required("Please enter your password"),
  newPassword: Yup.string()
    .nullable()
    .required("Please enter new password")
    .min(8, "Your password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .nullable()
    .required("Please confirm your new password.")
    .min(8, "Your password must be at least 8 characters")
    .oneOf(
      [Yup.ref("newPassword"), null],
      "New Password and confirm password must match"
    ),
});
