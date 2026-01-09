import { Router } from "express";
import { categoriesController } from "./categories.controller";

const router = Router();

router.post("/", categoriesController.createCategories);
router.get("/", categoriesController.getAllCategories);
router.put("/:id", categoriesController.updateCategories);
router.delete("/:id", categoriesController.deleteCategories);

export const categoriesRoutes = router;
