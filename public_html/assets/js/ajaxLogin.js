let ajax = new XMLHttpRequest();

const login = (e) => {
  e.preventDefault();
  const username = e.target.elements[0].value;
  const password = e.target.elements[1].value;
  ajax.open("POST", "/login");
  ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  ajax.send(
    JSON.stringify({
      username: username,
      password: password,
    })
  );
  ajax.onreadystatechange = () => {
    if (ajax.readyState === XMLHttpRequest.DONE) {
      if (ajax.status === 200) {
        console.log(`Login success: ${ajax.response}`);
        if (e.target.id === "loginPlayer1Form") {
          localStorage.setItem("player1Name", username);
          localStorage.setItem("player1Id", JSON.parse(ajax.response).id);
        } else {
          localStorage.setItem("player2Name", username);
          localStorage.setItem("player2Id", JSON.parse(ajax.response).id);
        }
      } else {
        console.log(`Error ${ajax.status}: ${ajax.response}`);
      }
    }
  };
};

export { login };
