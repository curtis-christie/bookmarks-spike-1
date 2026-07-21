import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../app.js";
import { db } from "../db.js";

const app = createApp();

beforeEach(async () => {
  await db.bookmark.deleteMany();
});

afterAll(async () => {
  await db.$disconnect();
});

describe("bookmarks API", () => {
  it("returns an emtpy list when there are no bookmarks", async () => {
    const res = await request(app).get("/bookmarks").expect(200);
    expect(res.body).toEqual([]);
  });

  it("creates, lists, updates, and deletes a bookmark", async () => {
    const created = await request(app)
      .post("/bookmarks")
      .send({ title: "Vitest", url: "https://vitest.dev" })
      .expect(201);

    expect(created.body).toMatchObject({
      title: "Vitest",
      url: "https://vitest.dev",
      note: null,
    });
    expect(created.body.id).toEqual(expect.any(String));

    const id = created.body.id as string;

    const listed = await request(app).get("/bookmarks").expect(200);
    expect(listed.body).toHaveLength(1);

    const patched = await request(app)
      .patch(`/bookmarks/${id}`)
      .send({ note: "test runner" })
      .expect(200);

    expect(patched.body).toMatchObject({
      title: "Vitest",
      note: "test runner",
    });

    await request(app).delete(`/bookmarks/${id}`).expect(204);
    await request(app).get(`/bookmarks/${id}`).expect(404);
  });

  it("rejects a body that fails validation", async () => {
    const res = await request(app)
      .post("/bookmarks")
      .send({ url: "not-a-url" })
      .expect(400);

    expect(res.body.error).toContain("title");
    expect(res.body.error).toContain("url");
  });

  it("rejects unknown fields and empty updates", async () => {
    await request(app)
      .post("/bookmarks")
      .send({ title: "x", url: "https://x.com", isAdmin: true })
      .expect(400);

    const created = await request(app)
      .post("/bookmarks")
      .send({ title: "x", url: "https://x.com" })
      .expect(201);

    await request(app)
      .patch(`/bookmarks/${created.body.id}`)
      .send({})
      .expect(400);
  });

  it("404s a missing id on every verb", async () => {
    await request(app).get("/bookmarks/does-not-exist").expect(404);
    await request(app)
      .patch("/bookmarks/does-not-exist")
      .send({ note: "x" })
      .expect(404);
    await request(app).delete("/bookmarks/does-not-exist").expect(404);
  });
});
