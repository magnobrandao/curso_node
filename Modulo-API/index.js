const http = require("http");
const { randomUUID } = require("crypto");

let users = [];

const server = http.createServer((req, res) => {
  const METHOD = req.method;
  const URL = req.url;
  if (URL.startsWith("/users")) {
    if (METHOD === "POST") {
      req.on("data", (data) => {
        const body = JSON.parse(data);
        const user = {
          ...body,
          id: randomUUID(),
        };
        users.push(user);
        return res.end(JSON.stringify(user));
      });
    }
    if (METHOD === "GET") {
      return res.end(JSON.stringify(users));
    }
    if (METHOD === "PUT") {
      const paramsSplit = URL.split("/");
      const id = paramsSplit[2];

      req.on("data", (data) => {
        const body = JSON.parse(data);
        const userIndex = users.findIndex((user) => user.id === id);
      });
    }
  }
});

server.listen(3000, () => console.log("Servidor rodando"));
