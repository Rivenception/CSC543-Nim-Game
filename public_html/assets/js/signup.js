import { signupRequest } from "./ajaxSignup.js";

const signup = async (e) => {
  e.preventDefault();
  const spinner = document.getElementById("spinner");
  const user = {
    username: e.target.elements[0].value,
    password: e.target.elements[1].value,
  };
  try {
    spinner.hidden = false;
    const signupResult = await signupRequest(user);
    if (signupResult.ok) {
      const res = await signupResult.json();
      console.log(`Ok ${signupResult.status}: ${JSON.stringify(res)}`);
      alert("Account created successfully!");
    } else {
      throw new Error(`${signupResult.status}: ${signupResult.statusText}`);
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
  spinner.hidden = true;
};

const registerFormElement = document.getElementById("signup");
registerFormElement.addEventListener("submit", signup);
