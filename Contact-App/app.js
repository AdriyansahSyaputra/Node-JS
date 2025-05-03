const { writeQuestion, saveContact } = require("./contacts");
const yargs = require("yargs");

yargs.command({
  command: "add",
  describe: "Menambahkan contact baru",
  builder: {
    name: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "Email",
      demandOption: false,
      type: "string",
    },
    phone: {
      describe: "Nomor Telepon",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    const contact = {
      name: argv.name,
      email: argv.email,
      phone: argv.phone,
    };

    saveContact(contact.name, contact.email, contact.phone);
  },
});

yargs.parse();

// const main = async () => {
//   const name = await writeQuestion("Masukkan Nama: ");
//   const email = await writeQuestion("Masukkan Email: ");
//   const phone = await writeQuestion("Masukkan Nomor Telepon: ");

//   saveContact(name, email, phone);
// };

// main();
