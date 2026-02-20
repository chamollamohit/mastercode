import { PrismaClient } from "../../src/generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;
const db =
    globalThis.prisma ||
    new PrismaClient({
        log: ["error"],
        adapter: new PrismaPg({ connectionString }),
    });

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export default db;
