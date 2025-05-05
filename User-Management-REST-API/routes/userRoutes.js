const {
  getUsers,
  createUser,
  updateUser,
  getUserById,
  deleteUser
} = require("../controllers/userController");

const handleRoutes = (req, res) => {
  const { method, url } = req;

  if (url === "/users" && method === "GET") return getUsers(res);
  if (url === "/users" && method === "POST") return createUser(req, res);

  if (url.startsWith("/users/")) {
    const id = url.split("/")[2];

    if (method === "GET") return getUserById(res, id);
    if (method === "PUT") return updateUser(req, res, id);
    if (method === "DELETE") return deleteUser(res, id);
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: "Route not found" }));
};

module.exports = handleRoutes;
