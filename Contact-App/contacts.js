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

const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");

  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

const saveContact = (name, email, phone) => {
  const contact = { name, email, phone };
  const contacts = loadContact();

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

// Menampilkan daftar semua nama & no Hp
const listContact = () => {
  const contacts = loadContact();

  console.log("======Daftar Kontak======");
  contacts.map((contact, i) =>
    console.log(`${i + 1}. ${contact.name} = ${contact.phone}`)
  );
};

// Menampilkan detail contact
const detailContact = (name) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );

  if (!contact) {
    console.log(`${name} tidak ditemukan!`);
    return;
  }

  console.log("======Detail Kontak======");
  console.log(`Nama: ${contact.name}`);
  console.log(`Nomor Telepon: ${contact.phone}`);
  console.log(`Email: ${contact.email}`);
};

// Menghapus contact berdasarkan nama
const deleteContact = (name) => {
  const contacts = loadContact();

  const newContacts = contacts.filter(
    (contact) => contact.name.toLowerCase() !== name.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(`${name} tidak ditemukan!`);
    return;
  }

  fs.writeFileSync(
    "data/contacts.json",
    JSON.stringify(newContacts),
    "utf-8"
  );

  console.log(`${name} berhasil dihapus!`);
};

module.exports = { saveContact, listContact, detailContact, deleteContact };
