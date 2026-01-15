import { Router } from "express";
import auth from "../../middleware/auth";
import { eventsController } from "./events.controller";

const router = Router();

router.post("/", auth("ADMIN", "USER"), eventsController.createEvents);
router.get("/", eventsController.getAllEvents);
router.put("/:id", auth("ADMIN"), eventsController.updateEvents);
router.delete("/:id", auth("ADMIN"), eventsController.deleteEvents);

export const eventsRoutes = router;
