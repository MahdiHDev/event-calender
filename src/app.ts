import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { categoriesRoutes } from "./modules/categories/categories.routes";
import { eventsRoutes } from "./modules/events/events.routes";

const app = express();
// parser
app.use(express.json());

// initializing DB
initDB();

// '/' -> localhost: 5000/
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome to event holyday calender api");
});

// api routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/events", eventsRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path,
    });
});

export default app;
