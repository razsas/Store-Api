import path from "path";

export const PORT = 3002;
export const DB_FILE_PATH = path.resolve(__dirname, "../db.json");

export const NAME_SELLER_REGEX = /^[a-zA-Z0-9 ]{3,30}$/;
export const PRICE_REGEX = /^\d+(\.\d{1,2})?$/;
