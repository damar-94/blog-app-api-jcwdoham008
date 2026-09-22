import { Request, Response } from "express";

import { getBlogService, getBlogsService } from "../services/blog.service.js";

export const getBlogsController = async (req: Request, res: Response) => {
  const query = {
    page: parseInt(req.query.page as string) || 1,

    take: parseInt(req.query.take as string) || 3,

    sortOrder: (req.query.sortOrder as string) || "desc",

    sortBy: (req.query.sortBy as string) || "createdAt",

    search: (req.query.search as string) || "",
  };

  const result = await getBlogsService(query);

  res.status(200).send(result);
};

export const getBlogController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await getBlogService(id);

  res.status(200).send(result);
};
