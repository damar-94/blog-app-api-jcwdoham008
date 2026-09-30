//===EXPRESSJS===
import express from "express";
import { postRoutes } from "./routes/post.route.js";
import { userRoutes } from "./routes/user.route.js";
import { globalError, notFoundError } from "./utils/errors.js";
import cors from "cors";
import { authRoutes } from "./routes/auth.route.js";

const PORT = 8000;

const app = express();

app.use(cors());

app.use(express.json()); //agar bisa menerima req.body

app.get("/api", (req, res) => {
  res.status(200).send("Welcome to my API");
});

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/auth", authRoutes);

app.use(globalError);
app.use(notFoundError);

app.listen(PORT, () => {
  console.log(`server running on port:${PORT}`);
});

// app.get("/users", (req, res) => {
//   res.status(200).send(users);
// });

// app.get("/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);

//   if (!user) {
//     return res.status(404).send({ message: "User not found" });
//   }
//   res.status(200).send(user);
// });

// app.post("/users", (req, res) => {
//   const latestId = users[users.length - 1].id;

//   users.push({
//     id: latestId + 1,
//     name: req.body.name,
//   });
//   res.status(200).send({ message: "Add new user success!" });
// });

// app.patch("/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const index = users.findIndex((user) => user.id === id);

//   if (index === -1) {
//     return res.status(404).send({ message: "User not found" });
//   }
//   users[index] = { ...users[index], ...req.body };

//   res.status(200).send({ message: "update user success!" });
// });

// app.delete("/users/:id", (req, res) => {
//   const id = Number(req.params.id);

//   const index = users.findIndex((user) => user.id === id);

//   if (index === -1) {
//     return res.status(404).send({ message: "user not found" });
//   }
//   users.splice(index, 1);
//   res.status(200).send({ message: "Delete user success" });
// });

//====NODEJS===
// import http from "http";

// const PORT = 8000;

// const users = [
//   { id: 1, name: "Budi" },
//   { id: 2, name: "Joko" },
//   { id: 3, name: "Siti" },
// ];

// const server = http.createServer((req, res) => {
//   if (req.url === "/api" && req.method === "GET") {
//     res.writeHead(200);
//     res.write("Welcome to my API");
//     res.end();
//   } else if (req.url === "/users" && req.method === "GET") {
//     res.writeHead(200, { "content-type": "application/json" });
//     res.write(JSON.stringify(users));
//     res.end();
//   } else {
//     res.writeHead(404);
//     res.write("Route not found");
//     res.end();
//   }
// });

// server.listen(PORT, () => {
//   console.log(`server running on port: ${PORT}`);
// });
