const http = require("http");
const handleRoutes = require("./routes/userRoutes");

const port = 3000;
const host = "localhost";

const server = http.createServer((req, res) => {
  handleRoutes(req, res);
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
