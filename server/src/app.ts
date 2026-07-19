import express from "express";
import { bookmarksRouter } from "./bookmarks/bookmark.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use("/bookmarks", bookmarksRouter);
  app.use(errorHandler);

  return app;
}
