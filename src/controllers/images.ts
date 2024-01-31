import { Request, Response } from "express";
import Image from "../models/Image.model";


export class ImagesController {

    //get all images
    static getImages = async (req: Request, res: Response) => {
        try {
            const images = await Image.findAll();
            res.json(images);
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

    //get image by id
    static getImageById = async (req: Request, res: Response) => {
        try {
            const image = await Image.findByPk(req.params.id);
            if (!image) {
                return res.status(404).json({ msg: 'Image not found' });
            }
            res.json(image);
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

    //create image
    static createImage = async (req: Request, res: Response) => {
        try {
            const image = await Image.create(req.body);
            res.json(image);
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

    //update image
    static updateImage = async (req: Request, res: Response) => {
        try {
            const image = await Image.findByPk(req.params.id);
            if (!image) {
                return res.status(404).json({ msg: 'Image not found' });
            }
            await image.update(req.body);
            res.json(image);
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

    //delete image
    static deleteImage = async (req: Request, res: Response) => {
        try {
            const image = await Image.findByPk(req.params.id);
            if (!image) {
                return res.status(404).json({ msg: 'Image not found' });
            }
            await image.destroy();
            res.json({ msg: 'Image removed' });
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

}