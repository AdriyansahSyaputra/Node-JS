import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  saveTodo,
  writeQuestion,
  listTodo,
  updateTodo,
  deleteTodo,
  filterTodo,
} from "./handler.js";

yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "Menambahkan todo baru",
    handler: async () => {
      const title = await writeQuestion("Masukkan judul todo: ");
      const deadline = await writeQuestion("Masukkan deadline todo: ");
      saveTodo(title, deadline);
    },
  })
  .command({
    command: "list",
    describe: "Menampilkan daftar todo",
    handler: () => {
      listTodo();
    },
  })
  .command({
    command: "update",
    describe: "Mengubah status todo",
    handler: async () => {
      const id = await writeQuestion("Masukkan id todo: ");
      updateTodo(id);
    },
  })
  .command({
    command: "delete",
    describe: "Menghapus todo",
    handler: async () => {
      const id = await writeQuestion("Masukkan id todo: ");
      deleteTodo(id);
    },
  })
  .command({
    command: "filter",
    describe: "Filter todo berdasarkan status",
    handler: async () => {
      const status = await writeQuestion(
        "Masukkan status todo (active/complete): "
      );
      filterTodo(status);
    },
  })
  .demandCommand()
  .parse();
