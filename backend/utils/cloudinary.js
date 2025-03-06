import { v2 as cloudinary } from 'cloudinary';

require('dotenv').config();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload single file
const uploadToCloudinary = async (fileString) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(fileString, {
            upload_preset: 'chat_app'
        });
        return uploadResponse;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};

// Upload multiple files
const uploadMultipleToCloudinary = async (fileStringArray) => {
    try {
        const uploadPromises = fileStringArray.map(fileString => 
            cloudinary.uploader.upload(fileString, {
                upload_preset: 'chat_app'
            })
        );
        
        const uploadResponses = await Promise.all(uploadPromises);
        return uploadResponses;
    } catch (error) {
        console.error('Error uploading multiple files to Cloudinary:', error);
        throw error;
    }
};

export default { uploadToCloudinary, uploadMultipleToCloudinary };