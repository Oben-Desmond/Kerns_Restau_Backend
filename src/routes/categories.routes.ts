//category routes
import express from 'express';
import CategoryController from '../controllers/categories';

const router = express.Router();

//get all categories
router.get('/', CategoryController.getCategories);

//get category by id
router.get('/:id', CategoryController.getCategoryById);

//create category
router.post('/', CategoryController.createCategory);

//update category
router.put('/:id', CategoryController.updateCategory);

//delete category
router.delete('/:id', CategoryController.deleteCategory);


export default router;

