const fs = require("fs");
const path = require("path");

//////////////////////////////////////
// Static request handler functions //
//////////////////////////////////////

// Corwin: wrote this
//Generic 404 error
exports.fof = function (url, res) {
  respond(res, 404, 'text/plain', url ? `Could not find ${url.pathname}` : "Could not find the specified resource")
};

//Static home page base
// Emmanuel: created this with changes by Corwin
// Corwin: I refactored in the respond() call
exports.home = function (url, res) {
  fs.readFile("./public_html/index.html", (err, content) => {
    if (err) {
      respond(res, 404, "application/json", JSON.stringify({ response: "error finding index.html" }));
    } else {
      respond(res, 200, "text/html", content);
    }
  });
};

//Static leaderboard base
// Corwin: wrote this
exports.leaderboard = function (url, res) {
  fs.readFile("./public_html/leaderboard.html", (err, content) => {
    if (err) {
      respond(res, 404, "application/json", JSON.stringify({ response: "error finding leaderboard.html" }));
    } else {
      respond(res, 200, "text/html", content);
    }
  });
};

//initial serving of signup page
// Emmanuel: created this with changes by Corwin
// Corwin: I refactored in the respond() call
exports.signup = (url, res) => {
  fs.readFile("./public_html/signup.html", (err, content) => {
    if (err) {
      respond(res, 404, "application/json", JSON.stringify({ response: "error finding login.html" }));
    } else {
      respond(res, 200, "text/html", content);
    }
  });
};

//handles serving asset files
// Emmanuel: created this with changes by Corwin
// Corwin: I refactored in the respond() call
exports.assets = (url, res) => {
  console.log(url.pathname)
  fs.readFile("./public_html" + url.pathname, (err, content) => {
    if (err) {
      respond(res, 404, "application/json", JSON.stringify({ response: "file not found" }));
    } else {
      let contentType = "";
      switch (path.extname(url.pathname)) {
        case ".css":
          contentType = "text/css";
          break;

        case ".js":
          contentType = "text/javascript";
          break;

        case ".jpg":
          contentType = "image/jpg";
          break;

        case ".png":
          contentType = "image/png";
          break;
      }
      if (contentType) {
        respond(res, 200, contentType, content);
      } else {
        respond(res, 415, "application/json", JSON.stringify({ response: "unsupported file type" }));
      }
    }
  });
};

////////////////////////
// Responder Function //
////////////////////////

// Corwin: wrote this
// requires res and status, type and body optional
function respond (res, status, type, body){
  console.log(`Sending ${status}`);
  if (!type)
    res.writeHead(status);
  else
    res.writeHead(status, {'Content-Type': type});
  if (body)
    res.write(body);
  res.end();
}