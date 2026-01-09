import { prisma } from "../../lib/prisma";

const createCategories = async (name: string) => {
    const newCategory = await prisma.category.create({
        data: {
            name,
        },
    });

    return newCategory;
};

const getAllCategories = async () => {
    const categories = await prisma.category.findMany();
    return categories;
};

const updateCategoriesbyId = async (id: string, name: string) => {
    const updatedCategory = await prisma.category.update({
        where: { id },
        data: { name },
    });

    return updatedCategory;
};

const deleteCategoriesById = async (id: string) => {
    const deletedCategory = await prisma.category.delete({
        where: { id },
    });

    return deletedCategory;
};

export const categoriesService = {
    createCategories,
    getAllCategories,
    updateCategoriesbyId,
    deleteCategoriesById,
};
