const http = require("http");
const fs = require("fs");

const port = 5050;
const host = "127.0.0.1";

const renderHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("Error: 404 Not Found");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
    }
    res.end();
  });
};

http
  .createServer((req, res) => {
    const url = req.url;

    switch (url) {
      case "/about":
        renderHTML("./src/about.html", res);
        break;
      case "/contact":
        renderHTML("./src/contact.html", res);
        break;
      default:
        renderHTML("./src/index.html", res);
        break;
    }
  })
  .listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
  });
