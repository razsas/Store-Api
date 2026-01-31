import { Request, Response } from "express";
import { HttpStatus } from "../constants";
import { readDb, writeDb, validateItemData } from "../utils";
import Item from "../types";

export const readAllItems = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const items = await readDb();
    res.status(HttpStatus.OK).json(items);
  } catch (error) {
    console.error("readAllItems:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch items" });
  }
};

export const readItemById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const items = await readDb();
    const item = items.find((i) => i.id === req.params.id);
    if (!item) {
      res.status(HttpStatus.NOT_FOUND).json({ error: "Item not found" });
      return;
    }
    res.status(HttpStatus.OK).json(item);
  } catch (error) {
    console.error("readItemById:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch item" });
  }
};

export const createItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, type, seller, price } = req.body;

    if (name == null || seller == null || price == null) {
      res.status(HttpStatus.BAD_REQUEST).json({
        error: "Missing required fields: name, seller, and price are required.",
      });
      return;
    }

    const newItemType = (type as string)?.trim() || "Other";
    const validationError = validateItemData({
      name,
      seller,
      price,
      type: newItemType,
    });
    if (validationError) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: validationError });
      return;
    }

    const newItemName = (name as string).trim();
    const newItemSeller = (seller as string).trim();
    const newItemPrice = Number(price);

    const items = await readDb();
    const newItem: Item = {
      id: crypto.randomUUID(),
      name: newItemName,
      type: newItemType,
      seller: newItemSeller,
      price: newItemPrice,
    };

    items.push(newItem);
    await writeDb(items);

    res.status(HttpStatus.CREATED).json(newItem);
  } catch (error) {
    console.error("createItem:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to create item" });
  }
};

export const updateItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, type, seller, price } = req.body;

    const hasBody =
      name !== undefined ||
      type !== undefined ||
      seller !== undefined ||
      price !== undefined;
    if (!hasBody) {
      res.status(HttpStatus.BAD_REQUEST).json({
        error:
          "At least one field to update is required: name, type, seller, or price.",
      });
      return;
    }

    const items = await readDb();
    const index = items.findIndex((i) => i.id === id);

    if (index === -1) {
      res.status(HttpStatus.NOT_FOUND).json({ error: "Item not found" });
      return;
    }

    const validationError = validateItemData({ name, seller, price, type });
    if (validationError) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: validationError });
      return;
    }

    if (name !== undefined) items[index].name = (name as string).trim();
    if (seller !== undefined) items[index].seller = (seller as string).trim();
    if (price !== undefined) items[index].price = Number(price);
    if (type !== undefined) items[index].type = (type as string).trim();

    await writeDb(items);

    res.status(HttpStatus.OK).json(items[index]);
  } catch (error) {
    console.error("updateItem:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to update item" });
  }
};

export const deleteItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const items = await readDb();
    const filtered = items.filter((i) => i.id !== id);

    if (filtered.length === items.length) {
      res.status(HttpStatus.NOT_FOUND).json({ error: "Item not found" });
      return;
    }

    await writeDb(filtered);
    res.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error("deleteItem:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to delete item" });
  }
};
