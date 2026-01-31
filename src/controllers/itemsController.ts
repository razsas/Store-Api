import { Request, Response } from "express";
import { readDb, writeDb, validateItemData } from "../utils";
import Item from "../types";

export const readAllItems = async (req: Request, res: Response) => {
  try {
    const items = await readDb();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
};

export const readItemById = async (req: Request, res: Response) => {
  try {
    const items = await readDb();
    const item = items.find((i) => i.id === req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch item" });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, type, seller, price } = req.body;

    const validationError = validateItemData({ name, seller, price });
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const newItemName = name.trim();
    const newItemType = type?.trim() || "Other";
    const newItemSeller = seller.trim();
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

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to create item" });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, type, seller, price } = req.body;

    const items = await readDb();
    const index = items.findIndex((i) => i.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Item not found" });
    }

    const validationError = validateItemData({ name, seller, price });
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    if (name !== undefined) items[index].name = name;
    if (seller !== undefined) items[index].seller = seller;
    if (price !== undefined) items[index].price = Number(price);

    if (type !== undefined) items[index].type = type;

    await writeDb(items);

    res.json(items[index]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update item" });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let items = await readDb();

    const initialLength = items.length;
    items = items.filter((i) => i.id !== id);

    if (items.length === initialLength) {
      return res.status(404).json({ error: "Item not found" });
    }

    await writeDb(items);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item" });
  }
};
