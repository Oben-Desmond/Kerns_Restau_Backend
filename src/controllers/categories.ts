

//categories controller
import { Request, Response } from 'express';
import Category from '../models/Category.model';

class CategoryController {

    //get all categories
    static getCategories = async (req: Request, res: Response) => {
        try {
            const categories = await Category.findAll();
            res.json(categories);
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

    //get category by id
    static getCategoryById = async (req: Request, res: Response) => {
        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) {
                return res.status(404).json({ msg: 'Category not found' });
            }
            res.json(category);
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

    //create category
    static createCategory = async (req: Request, res: Response) => {
        try {
            const category = await Category.create(req.body);
            res.json(category);
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

    //update category
    static updateCategory = async (req: Request, res: Response) => {
        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) {
                return res.status(404).json({ msg: 'Category not found' });
            }
            await category.update(req.body);
            res.json(category);
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

    //delete category

    static deleteCategory = async (req: Request, res: Response) => {
        try {
            const category = await Category.findByPk(req.params.id);
            if (!category) {
                return res.status(404).json({ msg: 'Category not found' });
            }
            await category.destroy();
            res.json({ msg: 'Category removed' });
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
}

export default CategoryController 