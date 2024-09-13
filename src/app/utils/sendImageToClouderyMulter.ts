import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';
import config from '../config';



cloudinary.config({
    cloud_name: config.CLOUDINARY_Cloud_Name,
    api_key: config.CLOUDINARY_Api_Key,
    api_secret: config.CLOUDINARY_Api_Secret,
})

export const sendImageToCloudinary = (
    imageName: string,
    path: string,
): Promise<Record<string, unknown>> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            path,
            { public_id: imageName.trim() },
            // Ensure file deletion is done regardless of success or error
            function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result as UploadApiResponse);
                // delete a file asynchronously
                fs.unlink(path, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('File is deleted.');
                    }
                });
            },
        );
    });
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});

export const upload = multer({ storage: storage });