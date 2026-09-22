import express from "express";

import {
  getBlogController,
  getBlogsController,
} from "../controllers/blog.controller.js";

const blogRoutes = express.Router();

blogRoutes.get("/", getBlogsController);

blogRoutes.get("/:id", getBlogController);

export { blogRoutes };