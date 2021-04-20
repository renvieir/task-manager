import request from "supertest";
import app from "../config/app";

describe("Content Type Middleware", () => {
  it("should parse body as json", async () => {
    app.get("/", (req, res) => res.send({ msg: "ola" }));
    await request(app).get("/").expect({ msg: "ola" });
  });
});
