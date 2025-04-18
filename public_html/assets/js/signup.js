import { signup } from "./ajaxSignup.js";

const registerFormElement = document.getElementById("signupSubmit");
registerFormElement.addEventListener("click", function () {
  signup(this);
});
