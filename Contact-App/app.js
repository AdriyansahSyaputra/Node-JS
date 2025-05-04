const { saveContact, listContact, detailContact, deleteContact } = require("./contacts");
const yargs = require("yargs");

yargs
  .command({
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
  })
  .demandCommand();

yargs
  .command({
    command: "list",
    describe: "Menampilkan daftar semua nama & no Hp",
    handler() {
      listContact();
    },
  })
  .demandCommand();

yargs
  .command({
    command: "detail",
    describe: "Menampilkan detail contact",
    builder: {
      name: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      detailContact(argv.name);
    },
  })
  .demandCommand();

yargs
  .command({
    command: "delete",
    describe: "Menghapus contact berdasarkan nama",
    builder: {
      name: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      deleteContact(argv.name);
    },
  })
  .demandCommand();

yargs.parse();

// const main = async () => {
//   const name = await writeQuestion("Masukkan Nama: ");
//   const email = await writeQuestion("Masukkan Email: ");
//   const phone = await writeQuestion("Masukkan Nomor Telepon: ");

//   saveContact(name, email, phone);
// };

// main();
