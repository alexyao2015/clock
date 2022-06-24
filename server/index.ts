import Prisma from "./backend/prisma";
import Util from "./backend/util";

export const prisma = Prisma;
export const util = Util;

export default async () => {
  console.log("Server running...");
};
