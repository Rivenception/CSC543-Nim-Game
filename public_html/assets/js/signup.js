import { signupRequest } from "./ajaxSignup.js";

const signup = async (e) => {
  e.preventDefault();
  const user = {
    username: e.target.elements[0].value,
    password: e.target.elements[1].value,
  };
  try {
    const signupResult = await signupRequest(user);
    if (signupResult.ok) {
      const res = await signupResult.json();
      console.log(`Ok ${signupResult.status}: ${JSON.stringify(res)}`);
    } else {
      throw new Error(`${signupResult.status}: ${signupResult.statusText}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const registerFormElement = document.getElementById("signup");
registerFormElement.addEventListener("submit", signup);
