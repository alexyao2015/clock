import conn from "./backend/connection";

export const prisma = conn;

export default async () => {
  console.log("Server running...");
};
