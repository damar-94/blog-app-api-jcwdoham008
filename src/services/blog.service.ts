import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/api-error.js";

interface GetBlogsQuery {
  page: number;
  take: number;
  sortOrder: string; //asc or desc
  sortBy: string; //based on column
  search: string;
}

export const getBlogsService = async (query: GetBlogsQuery) => {
  const { page, take, sortBy, sortOrder, search } = query;

  const whereClause: Prisma.BlogWhereInput = {
    deletedAt: null,
  };

  if (search) {
    whereClause.title = { contains: search, mode: "insensitive" };
  }

  const blogs = await prisma.blog.findMany({
    where: whereClause,

    skip: (page - 1) * take,
    take: take,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.blog.count({ where: whereClause });
  return {
    data: blogs,
    meta: { page, take, total },
  };
};

export const getBlogService = async (id: number) => {
  const blog = await prisma.blog.findUnique({
    where: {
      id: id,
    },

    omit: {
      deletedAt: true,
    },
  });

 if (!blog) {
    throw new ApiError("blog not found", 404);
  }

  return blog;
};
