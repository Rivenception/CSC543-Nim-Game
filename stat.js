const fs = require("fs");
const path = require("path");

//Generic 404 error
exports.fof = function (url, res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.write(
    url
      ? `Could not find ${url.pathname}`
      : "Could not find the specified resource"
  );
  res.end();
};

//Static home page base
exports.home = function (url, res) {
  fs.readFile("./public_html/index.html", (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/json" });
      res.write(JSON.stringify({ response: "error finding index.html" }));
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(content);
    }
    res.end();
  });
};

//Static leaderboard base
exports.leaderboard = function (url, res) {
  fs.readFile("./public_html/leaderboard.html", (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/json" });
      res.write(JSON.stringify({ response: "error finding index.html" }));
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(content);
    }
    res.end();
  });

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write(url.pathname);
  res.end();
};

//initial serving of signup page
exports.signup = (url, res) => {
  fs.readFile("./public_html/signup.html", (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/json" });
      res.write(JSON.stringify({ response: "error finding login.html" }));
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(content);
    }
    res.end();
  });
};

//handles serving asset files
exports.assets = (url, res) => {
  fs.readFile("./public_html" + url.pathname, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/json" });
      res.write(JSON.stringify({ response: "file not found" }));
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
        res.writeHead(200, { "Content-Type": contentType });
        res.write(content);
      } else {
        res.writeHead(415, { "Content-Type": "text/json" });
        res.write(JSON.stringify({ response: "unsupported file type" }));
      }
    }
    res.end();
  });
};
