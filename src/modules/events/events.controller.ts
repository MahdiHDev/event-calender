import { Request, Response } from "express";
import { eventsService } from "./events.service";

const createEvents = async (req: Request, res: Response) => {
    try {
        const newEvent = await eventsService.createEvents(req.body);
        res.status(201).json({
            message: "Event created successfully",
            data: newEvent,
        });
    } catch (err: any) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};

const getAllEvents = async (req: Request, res: Response) => {
    try {
        const { search, userId, categoryId, categoryName } = req.query;
        const events = await eventsService.getAllEvents({
            search: search as string,
            userId: userId as string,
            categoryId: categoryId as string,
            categoryName: categoryName as string,
        });

        res.status(200).json({
            success: true,
            message: "Events retrieved successfully",
            data: events,
        });
    } catch (err: any) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};

const updateEvents = async (req: Request, res: Response) => {
    try {
        const updatedEvent = await eventsService.updateEvents(
            req.params.id as string,
            req.body
        );
        res.status(200).json({
            message: "Event updated successfully",
            data: updatedEvent,
        });
    } catch (err: any) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};

const deleteEvents = async (req: Request, res: Response) => {
    try {
        await eventsService.deleteEvents(req.params.id as string);
        res.status(200).json({
            message: "Event deleted successfully",
        });
    } catch (err: any) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};

export const eventsController = {
    createEvents,
    getAllEvents,
    updateEvents,
    deleteEvents,
};
