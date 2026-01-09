import { Router } from "express";
import { eventsController } from "./events.controller";

const router = Router();

router.post("/", eventsController.createEvents);
router.get("/", eventsController.getAllEvents);
router.put("/:id", eventsController.updateEvents);
router.delete("/:id", eventsController.deleteEvents);

export const eventsRoutes = router;
