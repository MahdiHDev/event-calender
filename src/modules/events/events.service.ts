import { EventWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

interface GetAllEventsParams {
    search?: string;
    userId?: string;
    categoryId?: string;
    categoryName?: string;
}

const createEvents = async (payload: Record<string, unknown>) => {
    const { categoryId, userId, date, title, description } = payload;

    // Logic to create an event in the database
    const newEvent = prisma.event.create({
        data: {
            categoryId: categoryId as string,
            userId: userId as string,
            date: new Date(date as string),
            title: title as string,
            description: description as string,
        },
    });

    return newEvent;
};

const getAllEvents = async ({
    search,
    userId,
    categoryId,
    categoryName,
}: GetAllEventsParams) => {
    console.log("Search", search);
    const andConditions: EventWhereInput[] = [];

    if (search) {
        andConditions.push({
            OR: [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ],
        });
    }

    if (userId) {
        andConditions.push({ userId: userId });
    }

    if (categoryId) {
        andConditions.push({ categoryId: categoryId });
    }

    if (categoryName) {
        andConditions.push({
            category: {
                name: { equals: categoryName, mode: "insensitive" },
            },
        });
    }

    const events = prisma.event.findMany({
        where: {
            AND: andConditions,
        },
    });
    return events;
};

const updateEvents = async (id: string, payload: Record<string, unknown>) => {
    const { date, title, description } = payload;

    const updatedEvent = await prisma.event.update({
        where: { id },
        data: {
            date: new Date(date as string),
            title: title as string,
            description: description as string,
        },
    });
    return updatedEvent;
};

const deleteEvents = async (id: string) => {
    const deletedEvent = await prisma.event.delete({
        where: { id },
    });
};

export const eventsService = {
    createEvents,
    getAllEvents,
    updateEvents,
    deleteEvents,
};
