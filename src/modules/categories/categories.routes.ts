import { Router } from "express";
import auth from "../../middleware/auth";
import { categoriesController } from "./categories.controller";

const router = Router();

router.post("/", auth("ADMIN"), categoriesController.createCategories);
router.get("/", categoriesController.getAllCategories);
router.put("/:id", auth("ADMIN"), categoriesController.updateCategories);
router.delete("/:id", auth("ADMIN"), categoriesController.deleteCategories);

export const categoriesRoutes = router;
