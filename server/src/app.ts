import express from "express";
import { bookmarksRouter } from "./bookmarks/bookmark.routes.js";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use("/bookmarks", bookmarksRouter);

  return app;
}
