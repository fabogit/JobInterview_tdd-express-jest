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
  res.status(200).json(users);
});

/**
 * TODO write missing endpoints to pass the test
 */

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Sandbox listening on port ${port}`);
  });
}
export { app };
