let fs = require("fs");

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
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write(url.pathname);
  res.end();
};

//initial serving of login page
exports.login = (url, res) => {
  fs.readFile("./public_html/login/login.html", (err, content) => {
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
      const splitUrl = url.pathname.toLowerCase().split("/");
      let contentType = "";
      switch (splitUrl[splitUrl.length - 1].split(".")[1]) {
        case "css":
          contentType = "text/css";
          break;

        case "js":
          contentType = "text/javascript";
          break;

        case "jpg":
          contentType = "image/jpg";
          break;

        case "png":
          contentType = "image/png";
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
