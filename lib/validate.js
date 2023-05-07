const LoginValidate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be between 8 and 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid password";
  }
  return errors;
};

export default LoginValidate;

export const registerValidate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length > 15) {
    errors.username = "Must be 15 characters or less";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be between 8 and 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid password";
  }
  if (!values.cPassword) {
    errors.cPassword = "Required";
  } else if (values.password !== values.cPassword) {
    errors.cPassword = "Password not match";
  }
  return errors;
};
