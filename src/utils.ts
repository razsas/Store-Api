import { DB_FILE_PATH, NAME_SELLER_REGEX, PRICE_REGEX } from "./constants";
import Item from "./types";
import fs from "fs/promises";

export const readDb = async (): Promise<Item[]> => {
  try {
    const data = await fs.readFile(DB_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const writeDb = async (items: Item[]): Promise<void> => {
  await fs.writeFile(DB_FILE_PATH, JSON.stringify(items, null, 2));
};

export const validateItemData = (data: {
  name?: string;
  seller?: string;
  price?: number | string;
}): string | null => {
  const { name, seller, price } = data;

  if (name !== undefined && !NAME_SELLER_REGEX.test(name)) {
    return "Item name must be 3-30 characters and only contain letters, numbers, and spaces.";
  }

  if (seller !== undefined && !NAME_SELLER_REGEX.test(seller)) {
    return "Seller name must be 3-30 characters and only contain letters, numbers, and spaces.";
  }

  if (price !== undefined && !PRICE_REGEX.test(String(price))) {
    return "Price must be a positive number with up to 2 decimal places.";
  }

  return null;
};
