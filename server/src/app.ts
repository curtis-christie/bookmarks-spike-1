import express from "express";
import { bookmarksRouter } from "./bookmarks/bookmark.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cors({ origin: "http://localhost:5173" }));
  app.use("/bookmarks", bookmarksRouter);
  app.use(errorHandler);

  return app;
}
