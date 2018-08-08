import isEmpty from "./is-empty";

export function userInputValidation(userData) {
  let errors = {};

  if (isEmpty(userData.firstName)) {
    errors.firstName = "First name is required";
  }
  if (isEmpty(userData.lastName)) {
    errors.lastName = "Last name is required";
  }

  if (!userData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
    errors.email = "Email is invalid";
  }

  if (isEmpty(userData.email)) {
    errors.email = "Email is required";
  }

  if (isEmpty(userData.phone)) {
    errors.phone = "Phone is required";
  }
  if (isEmpty(userData.dob)) {
    errors.dob = "DOB is required";
  }
  if (isEmpty(userData.active)) {
    errors.active = "Status is required";
  }
  return errors;
}
