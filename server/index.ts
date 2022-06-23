import Prisma from "./backend/prisma";
import Redis from "./backend/redis";

export const prisma = Prisma;
export const redis = Redis;

export default async () => {
  await redis.connect();
  console.log("Server running...");
};
