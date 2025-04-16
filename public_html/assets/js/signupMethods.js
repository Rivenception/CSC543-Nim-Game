let ajax = new XMLHttpRequest();

const signup = (e) => {
  ajax.open("POST", "/signup");
  ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  ajax.send(
    JSON.stringify({ username: e.form[0].value, password: e.form[1].value })
  );
};

export { signup };
