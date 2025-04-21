let ajax = new XMLHttpRequest();

const signup = (e) => {
  ajax.open("POST", "/signup");
  ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  ajax.send(
    JSON.stringify({ username: e.form[0].value, password: e.form[1].value })
  );
  ajax.onreadystatechange = () => {
    if (ajax.readyState === XMLHttpRequest.DONE) {
      if (ajax.status === 200) {
        console.log(`Signup success: ${ajax.response}`);
      } else {
        console.log(`Error ${ajax.status}: ${ajax.response}`);
      }
    }
  };
};

export { signup };
