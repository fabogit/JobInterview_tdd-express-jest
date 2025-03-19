import express from "express";
import qs from "qs";
import { default as db } from "./data.json";

type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
};

const users = db.users as User[];

const app = express();
const port = 3000;

app.set("query parser", function (str: string) {
  return qs.parse(str, {
    /* custom options */
  });
});

app.get("/", (_req, res) => {
  res.send("Server Online");
});

app.get("/users", (_req, res) => {
  if (Object.keys(_req.query).length > 0) {
    const filters = _req.query;
    let filteredUsers = [...users];

    if (filters.starts_with) {
      const startsWith = filters.starts_with as string;
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().startsWith(startsWith.toLowerCase())
      );
    }

    res.status(200).json(filteredUsers);
  } else {
    res.status(200).json(users);
  }
});

app.get("/users/:id", (_req, res) => {
  const userId = parseInt(_req.params.id);
  res.status(200).json(users.find((user) => userId === user.id));
});

app.post("/users", (_req, res) => {
  const newUser = _req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

app.delete("/users/:id", (_req, res) => {
  const userId = parseInt(_req.params.id);
  const deletedUser = users.findIndex((user) => user.id === userId);
  users.splice(deletedUser, 1);
  res.status(204).json();
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Sandbox listening on port ${port}`);
  });
}
export { app };
