const signupRequest = (user) => {
  const { username, password } = user;
  if (username && password) {
    return fetch("/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  } else {
    throw new Error("username and/or password is missing");
  }
};

export { signupRequest };
// Emmanuel