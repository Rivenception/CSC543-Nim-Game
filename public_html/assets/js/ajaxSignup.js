let ajax = new XMLHttpRequest();

const signup = (e) => {
  e.preventDefault();
  ajax.open("POST", "/signup");
  ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  ajax.send(
    JSON.stringify({
      username: e.target.elements[0].value,
      password: e.target.elements[1].value,
    })
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
