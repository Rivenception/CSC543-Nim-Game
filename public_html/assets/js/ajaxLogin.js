let ajax = new XMLHttpRequest();

const login = (e) => {
  ajax.open("POST", "/login");
  ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  ajax.send(
    JSON.stringify({ username: e.form[0].value, password: e.form[1].value })
  );
  ajax.onreadystatechange = () => {
    if (ajax.readyState === XMLHttpRequest.DONE) {
      if (ajax.status === 200) {
        console.log(`Login success: ${ajax.response}`);
        if (e.id === "loginPlayer1Submit") {
          localStorage.setItem("player1Name", e.form[0].value);
          localStorage.setItem("player1Id", JSON.parse(ajax.response).id);
        } else {
          localStorage.setItem("player2Name", e.form[0].value);
          localStorage.setItem("player2Id", JSON.parse(ajax.response).id);
        }
      } else {
        console.log(`Error ${ajax.status}: ${ajax.response}`);
      }
    }
  };
};

export { login };
