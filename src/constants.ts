import path from "path";

export const PORT = 3002;
export const DB_FILE_PATH = path.resolve(__dirname, "../src/db/db.json");

export const NAME_SELLER_REGEX = /^[a-zA-Z0-9 ]{3,30}$/;
export const PRICE_REGEX = /^\d+(\.\d{1,2})?$/;

export const ALLOWED_ITEM_TYPES = [
  "Electronics",
  "Clothing",
  "Books",
  "Home",
  "Other",
] as const;

export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
