const { readUsers, writeUsers } = require("../utils/file");
const { nanoid } = require("nanoid");
const validator = require("validator");

const getUsers = (res) => {
  const users = readUsers();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(users));
  res.end();
};

const createUser = (req, res) => {
  let body = "";

  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    try {
      const { name, email, phone, address, age, bornDate } = JSON.parse(body);

      if (!name || !email || !age || !phone || !address || !bornDate) {
        res.writeHead(400);
        return res.end(JSON.stringify({ message: "All fields are required" }));
      }

      const users = readUsers();

      // Cek Duplicate user
      const duplicate = users.find(
        (user) => user.name.toLowerCase() === name.toLowerCase()
      );

      if (duplicate) {
        res.writeHead(409);
        return res.end(JSON.stringify({ message: "User already exists" }));
      }

      // Cek Email
      if (!validator.isEmail(email)) {
        res.writeHead(400);
        return res.end(JSON.stringify({ message: "Email is not valid" }));
      }

      // Cek phone
      if (!validator.isMobilePhone(phone, "id-ID")) {
        res.writeHead(400);
        return res.end(JSON.stringify({ message: "Phone is not valid" }));
      }

      // Validasi bornDate DD-MM-YYYY
      if (!validator.isDate(bornDate, { format: "DD-MM-YYYY" })) {
        res.writeHead(400);
        return res.end(JSON.stringify({ message: "Born Date is not valid" }));
      }

      const newUser = {
        id: nanoid(16),
        name,
        email,
        address,
        phone,
        age,
        bornDate,
        createdAt: new Date(),
      };

      users.push(newUser);

      writeUsers(users);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User created successfully" }));
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error.message }));
    }
  });
};

// Get user by id
const getUserById = (res, id) => {
  const users = readUsers();

  const user = users.find((user) => user.id === id);

  if (!user) {
    res.writeHead(404);
    return res.end(JSON.stringify({ message: "User not found" }));
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(user));
};

// Handler untuk update user
const updateUser = (req, res, id) => {
  let body = "";

  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    try {
      const { name, email, phone, address, age, bornDate } = JSON.parse(body);
      const users = readUsers();
      const index = users.findIndex((user) => user.id === id);

      if (index === -1) {
        res.writeHead(404);
        return res.end(JSON.stringify({ error: "User not found" }));
      }

      if (!name || !email || !age || !phone || !address || !bornDate) {
        res.writeHead(400);
        return res.end(JSON.stringify({ message: "All fields are required" }));
      }

      // Cek Email
      if (!validator.isEmail(email)) {
        res.writeHead(400);
        return res.end(JSON.stringify({ message: "Email is not valid" }));
      }

      // Cek phone
      if (!validator.isMobilePhone(phone, "id-ID")) {
        res.writeHead(400);
        return res.end(JSON.stringify({ message: "Phone is not valid" }));
      }

      // Validasi bornDate DD-MM-YYYY
      if (!validator.isDate(bornDate, { format: "DD-MM-YYYY" })) {
        res.writeHead(400);
        return res.end(JSON.stringify({ message: "Born Date is not valid" }));
      }

      users[index] = {
        ...users[index],
        name,
        email,
        address,
        phone,
        age,
        bornDate,
        updatedAt: new Date(),
      };

      writeUsers(users);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User updated successfully" }));
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error.message }));
    }
  });
};

// fungsi untuk menghapus user
const deleteUser = (res, id) => {
  const users = readUsers();

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    res.writeHead(404);
    return res.end(JSON.stringify({ message: "User not found" }));
  }

  users.splice(index, 1);

  writeUsers(users);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "User deleted successfully" }));
};

module.exports = { getUsers, createUser, getUserById, updateUser, deleteUser };
