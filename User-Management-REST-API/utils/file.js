const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/users.json");

const readUsers = () => {
  if (!fs.existsSync(dataPath)) return [];
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

const writeUsers = (users) => {
  fs.writeFileSync(dataPath, JSON.stringify(users), "utf-8");
};

module.exports = { readUsers, writeUsers };
