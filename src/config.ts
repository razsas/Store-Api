import path from "path";
import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 3002,
  dbFilePath: path.resolve(__dirname, "../db.json"),
} as const;
