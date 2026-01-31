import { Router, Request, Response } from "express";
import {
  readAllItems,
  readItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemsController";

const router = Router();

router.get("/", readAllItems);
router.get("/:id", readItemById);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
