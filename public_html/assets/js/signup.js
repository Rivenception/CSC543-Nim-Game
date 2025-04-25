import { signup } from "./ajaxSignup.js";

const registerFormElement = document.getElementById("signup");
registerFormElement.addEventListener("submit", signup);
