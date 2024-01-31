import express from 'express';
import { ImagesController } from '../controllers/images';

const router = express.Router();

//get all images
router.get('/', ImagesController.getImages);

//get image by id
router.get('/:id', ImagesController.getImageById);

//create image
router.post('/', ImagesController.createImage);

//update image
router.put('/:id', ImagesController.updateImage);

//delete image
router.delete('/:id', ImagesController.deleteImage);
