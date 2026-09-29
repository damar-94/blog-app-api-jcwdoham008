import { db } from "../config/db.js";
import { Prisma, User } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/api-error.js";



interface GetUsersQuery {
  page: number;
  take: number;
  sortOrder: string; //asc or desc
  sortBy: string; //based on column
  search: string;
}

export const getUsersService = async (query: GetUsersQuery) => {
  const { page, take, sortBy, sortOrder, search } = query;

  const whereClause: Prisma.UserWhereInput = {
    deletedAt: null,
  };

  if (search) {
    whereClause.email = { contains: search, mode: "insensitive" };
  }

  const users = await prisma.user.findMany({
    where: whereClause,
    include: {
      posts: {
        select: { id: true, content: true },
      },
    },
    skip: (page - 1) * take,
    take: take,
    orderBy: { [sortBy]: sortOrder },
    omit: { password: true },
  });

  const total = await prisma.user.count({ where: whereClause });
  return {
    data: users,
    meta: { page, take, total },
  };
};

export const getUserService = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
    omit: { password: true },
  });

  if (!user) {
    throw new ApiError("user not found", 404);
  }

  return user;
};

export const createUserService = async (body: User) => {
  await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({ data: body });

    // await tx.post.create({
    //   data: {
    //     content: "lorem ipsum",
    //     userId: newUser.id,
    //   },
    // });
  });
  return { message: "create user success" };
};

// export const createUserService = async (body: User) => {
//   await prisma.user.create({ data: body });

//   return { message: "create user success" };
// };

export const updateUserService = async (id: number, body: { name: string }) => {
  // const index = users.findIndex((user) => user.id === id);

  await getUserService(id);
  await prisma.user.update({
    where: { id: id },
    data: body,
  });
  return { message: "update user success" };
};

export const deleteUserService = async (id: number) => {
  await getUserService(id);
  //softdelete -> data tidak sepenuhnya hilang, tapi kita mengisi kolom deleteAt
  await prisma.user.update({
    where: { id: id },
    data: { deletedAt: new Date() },
  });
  //hard delete-> data hilang di db
  // await prisma.user.delete({
  //   where: { id: id },
  // });
  return { message: "delete user success" };
};
