import { signup } from "./signupMethods.js";

const registerFormElement = document.getElementById("signupSubmit");
registerFormElement.addEventListener("click", function () {
  signup(this);
});
