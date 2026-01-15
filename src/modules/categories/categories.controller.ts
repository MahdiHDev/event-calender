import { Request, Response } from "express";
import { categoriesService } from "./categories.services";

const createCategories = async (req: Request, res: Response) => {
    try {
        const { categoryName, color } = req.body;
        const newCategory = await categoriesService.createCategories(
            categoryName,
            color
        );
        res.status(201).json({
            message: "Category created successfully",
            data: newCategory,
        });
    } catch (err: any) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};

const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoriesService.getAllCategories();
        res.status(200).json({
            message: "Categories fetched successfully",
            data: categories,
        });
    } catch (err: any) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};

const updateCategories = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { categoryName, color } = req.body;
        const updatedCategory = await categoriesService.updateCategoriesbyId(
            id as string,
            categoryName,
            color
        );
        res.status(200).json({
            message: "Category updated successfully",
            data: updatedCategory,
        });
    } catch (err: any) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};

const deleteCategories = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedCategory = await categoriesService.deleteCategoriesById(
            id as string
        );
        res.status(200).json({
            message: "Category deleted successfully",
            data: deletedCategory,
        });
    } catch (err: any) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
};

export const categoriesController = {
    createCategories,
    getAllCategories,
    updateCategories,
    deleteCategories,
};
