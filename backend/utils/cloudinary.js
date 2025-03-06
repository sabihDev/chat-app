import { v2 as cloudinary } from 'cloudinary';
import dotenv from dotenv;
dotenv.config();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload single file
const uploadToCloudinary = async (fileString) => {
    try {
        if (!fileString) throw new Error('Invalid file input');

        const uploadResponse = await cloudinary.uploader.upload(fileString, {
            upload_preset: 'chat_app'
        });

        return uploadResponse;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error.message);
        throw error;
    }
};

// Upload multiple files
const uploadMultipleToCloudinary = async (fileStringArray) => {
    try {
        if (!Array.isArray(fileStringArray) || fileStringArray.length === 0) {
            throw new Error('Invalid file input array');
        }

        const uploadPromises = fileStringArray.map(fileString =>
            cloudinary.uploader.upload(fileString, {
                upload_preset: 'chat_app'
            })
        );

        const uploadResponses = await Promise.all(uploadPromises);
        return uploadResponses;
    } catch (error) {
        console.error('Error uploading multiple files to Cloudinary:', error.message);
        throw error;
    }
};

export { uploadToCloudinary, uploadMultipleToCloudinary };
