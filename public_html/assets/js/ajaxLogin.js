const loginRequest = (user) => {
  const { username, password } = user;
  if (username && password) {
    return fetch("/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  } else {
    throw new Error("username and/or password is missing");
  }
};

export { loginRequest };
// Emmanuel