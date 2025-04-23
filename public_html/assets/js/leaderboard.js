import { getStatistics } from "./ajaxLeaderboard.js";

let tableBody = document.getElementById("table-body");

window.addEventListener("load", async () => {
  let stats = JSON.parse(await getStatistics());
  console.log(typeof stats);
  tableBody.innerHTML = ""
  stats.map(i => {
    tableBody.innerHTML += `<td>${i.username}</td>
                            <td>${i.wins}</td>
                            <td>${i.losses}</td>`;
  });
});
