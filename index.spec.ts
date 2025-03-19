import request from "supertest";
import { app } from "./index";
import { users } from "./data.json";

const client = request(app);

describe("Jest Tests", () => {
  // Get Root
  it("should GET /", async () => {
    const res = await client.get("/").send();
    expect(res.status).toBe(200);
    expect(res.text).toBe("Server Online");
  });

  // Get ALL users
  it("should GET /users", async () => {
    const res = await client.get("/users").send();
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(users);
  });

  // Get a single user by ID
  it("should GET /users/:id", async () => {
    const res = await client.get("/users/63672771").send();
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      id: 63672771,
      name: "Sherman",
      surname: "Macejkovic",
      email: "Micaela63@hotmail.com",
    });
  });

  // Get SOME users using filter
  it("should GET /users with filters", async () => {
    const res = await client.get("/users?starts_with=T").send();
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual([
      {
        id: 54312671,
        name: "Tyler",
        surname: "Hahn",
        email: "Aidan13@yahoo.com",
      },
      {
        id: 53487949,
        name: "Tianna",
        surname: "Tremblay",
        email: "Florencio.Morar@yahoo.com",
      },
    ]);
  });

  // Add 1 user
  it("should POST /users", async () => {
    const getRes = await client.get("/users").send();
    const length = getRes.body.length;

    const res = await client.post("/users").send({
      name: "John",
      surname: "Doe",
      email: "john.doe@example.com",
    });
    expect(res.status).toBe(201);
    const getRes2 = await client.get("/users").send();
    expect(getRes2.body.length).toBe(length + 1);
  });

  // Delete 1 user
  it("should DELETE /users", async () => {
    const getRes = await client.get("/users").send();
    const length = getRes.body.length;

    const res = await client.delete("/users/63672771").send();
    expect(res.status).toBe(204);
    const getRes2 = await client.get("/users").send();
    expect(getRes2.body.length).toBe(length - 1);
  });
});
