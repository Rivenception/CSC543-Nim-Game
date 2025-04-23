// This file does just URL routing and POST body parsing
// All functionality related to responses and serving should go in stat.js or ajax.js for static or ajax responses respectively

const http = require("http");
const url = require("url");

const staticServe = require("./stat.js");
const ajaxServe = require("./ajax.js");

//Parse the URL and decide if req is AJAX
//AJAX goes by POST,
function serverParse(req, res) {
  console.log(`${req.method} Request received: ${req.url}`);
  let urlObj = url.parse(req.url);
  switch (req.method) {
    case "POST":
    case "PUT":
    case "DELETE":
      handleAjax(urlObj, req, res);
      break;

    case "GET":
    case "HEAD":
      handlePage(urlObj, res);
      break;

    default:
      staticServe.fof(urlObj, res);
      break;
  }
}

//Does url switching for static pages
function handlePage(url, res) {
  switch (url.pathname) {
    //logically equivalent default pathnames fallthrough cases
    case "/home":
    case "/":
    case "/index":
      staticServe.home(url, res);
      break;

    case "/leaderboard":
      staticServe.leaderboard(url, res);
      break;

    case "/signup":
      staticServe.signup(url, res);
      break;

    case "/assets":
      staticServe.assets(url, res);
      break;

    default:
      staticServe.fof(url, res);
      break;
  }
}

//Does url switching for AJAX backend handlers
//Stores data from POST body in req.body
function handleAjax(url, req, res) {
  let body = "";
  req.on("data", (block) => (body += block));
  req.on("end", () => {
    console.log(`  Got data: ${body}`);

    switch (url.pathname) {
      case "/":
      case "/index":
      case "/home":
        ajaxServe.home(body, res);
        break;

      case "/leaderboard":
        ajaxServe.leaderboard(body, res);
        break;

      case "/signup":
        ajaxServe.signup(body, res);
        break;

      case "/login":
        ajaxServe.login(body, res);
        break;

      case "/game/new":
        ajaxServe.newGame(body, res);

      case "/game/move":
        ajaxServe.moveGame(body, res);

      default:
        ajaxServe.fof(body, res);
        break;
    }
  });
}

http
  .createServer(serverParse)
  .listen(80, () => console.log("Started Server: Listening on port 80"));
