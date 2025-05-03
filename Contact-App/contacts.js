const fs = require("fs");
const validator = require("validator");
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// Membuat direktori data
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Membuat file contact
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// const writeQuestion = (question) => {
//   return new Promise((resolve, reject) => {
//     rl.question(question, (answer) => {
//       resolve(answer);
//     });
//   });
// };

const saveContact = (name, email, phone) => {
  const contact = { name, email, phone };
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");

  const contacts = JSON.parse(fileBuffer);

  // Cek Duplikat
  const duplicate = contacts.find((contact) => contact.name === name);
  if (duplicate) {
    console.log("Contact sudah ada, silahkan gunakan nama lain");
    return;
  }

  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log("Email tidak valid!");
      return;
    }
  }

  // Cek phone
  if (!validator.isMobilePhone(phone, "id-ID")) {
    console.log("Nomor telepon tidak valid!");
    return;
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log("Terima kasih sudah memasukkan data");
};

module.exports = { saveContact };
