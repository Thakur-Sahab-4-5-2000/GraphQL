module.exports.validationRegisterInput = (username, email, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const emailExpression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = emailExpression.test(String(email).toLowerCase());
    if (!emailValid) {
      errors.email = "Email is not valid please enter the correct email";
    }
  }

  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  } else {
    const regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (password.length < 8 || !regularExpression.test(password)) {
      errors.password =
        "Password must be greater than 8 characters and contains a 1 special character and one numeral";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validationLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const emailExpression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = emailExpression.test(String(email).toLowerCase());
    if (!emailValid) {
      errors.email = "Email is not valid please enter the correct email";
    }
  }

  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  } else {
    const regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (password.length < 8 || !regularExpression.test(password)) {
      errors.password =
        "Password must be greater than 8 characters and contains a 1 special character and one numeral";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
