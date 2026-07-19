import { Router } from "express";
import * as controller from "./bookmark.controller.js";

export const bookmarksRouter = Router();

bookmarksRouter.get("/", controller.list);
