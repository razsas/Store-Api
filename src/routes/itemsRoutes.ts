import { Router } from "express";
import {
  readAllItems,
  readItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemsController";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

router.get("/", asyncHandler(readAllItems));
router.get("/:id", asyncHandler(readItemById));
router.post("/", asyncHandler(createItem));
router.put("/:id", asyncHandler(updateItem));
router.delete("/:id", asyncHandler(deleteItem));

export default router;
