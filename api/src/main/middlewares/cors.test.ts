import request from "supertest";
import app from "../config/app";

describe("CORS Middleware", () => {
  it("should enable cors", async () => {
    app.get("/", (req, res) => res.send());
    await request(app).get("/").expect("content-type", /json/);
  });
});
