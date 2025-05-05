import fs from "fs";
import readline from "readline";
import { nanoid } from "nanoid";
import chalk from "chalk";

// Membuat interface readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Membuat direktori data
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Membuat file todo
const dataPath = "./data/todos.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// Membuat pertanyaan
const writeQuestion = (question) => {
  return new Promise((resolver, reject) => {
    rl.question(question, (answer) => {
      resolver(answer);
    });
  });
};

// Membuat file buffer
const loadTodo = () => {
  const fileBuffer = fs.readFileSync("data/todos.json", "utf-8");

  const todos = JSON.parse(fileBuffer);
  return todos;
};

// Membuat fungsi untuk menyimpan todo
const saveTodo = (title, deadline) => {
  const todo = { title, deadline };
  const todos = loadTodo();
  const id = nanoid(16);
  const createdAt = new Date();

  // Cek todo duplicate
  const duplicate = todos.find(
    (todo) => todo.title.toLowerCase() === title.toLowerCase()
  );
  if (duplicate) {
    console.log("Todo sudah ada, silahkan gunakan todo lain");
    rl.close();
    return;
  }

  // Cek deadline
  if (!deadline) {
    console.log(chalk.red("Deadline tidak boleh kosong!"));
    rl.close();
    return;
  }

  // Cek jika title kosong
  if (!title) {
    console.log(chalk.red("Title tidak boleh kosong!"));
    rl.close();
    return;
  }

  todos.push({ id, ...todo, status: "active", createdAt });

  fs.writeFileSync("data/todos.json", JSON.stringify(todos));
  console.log(chalk.green("Todo berhasil disimpan✅"));

  rl.close();
};

// Buat warna status todo
const statusColor = {
  active: chalk.yellow,
  complete: chalk.green,
};

// Fungsi untuk menampilkan todo
const listTodo = () => {
  const todos = loadTodo();

  // Menampilkan daftar todo
  console.log("======Daftar Todo======");
  todos.map((todo, i) =>
    console.log(
      `${i + 1}. ${chalk.cyan('Title:')} ${todo.title} \n ${chalk.cyan('Status:')} ${statusColor[todo.status](
        todo.status
      )} \n ${chalk.cyan('Deadline:')} ${todo.deadline}`
    )
  );

  rl.close();
};

// Fungsi untuk mengubah status todo
const updateTodo = (id) => {
  const todos = loadTodo();

  const todo = todos.find((todo) => todo.id === id);
  todo.status = todo.status === "active" ? "complete" : "active";

  fs.writeFileSync("data/todos.json", JSON.stringify(todos));

  console.log(chalk.green("Status Todo berhasil diubah✅"));

  rl.close();
};

// Fungsi untuk menghapus todo
const deleteTodo = (id) => {
  const todos = loadTodo();

  const newTodos = todos.filter((todo) => todo.id !== id);

  if (todos.length === newTodos.length) {
    console.log(`${id} tidak ditemukan!`);
    rl.close();
    return;
  }

  fs.writeFileSync("data/todos.json", JSON.stringify(newTodos), "utf-8");

  console.log(`Todo ${id} berhasil dihapus!`);
  rl.close();
};

// Filter berdasarkan status'
const filterTodo = (status) => {
  const todos = loadTodo();

  const filteredTodos = todos.filter((todo) => todo.status === status);

  console.log(`======Daftar Todo ${status}======`);
  filteredTodos.map((todo, i) =>
    console.log(
      `${i + 1}. ${todo.title} = ${statusColor[todo.status](todo.status)}`
    )
  );

  rl.close();
};

export {
  writeQuestion,
  saveTodo,
  listTodo,
  updateTodo,
  deleteTodo,
  filterTodo,
};
