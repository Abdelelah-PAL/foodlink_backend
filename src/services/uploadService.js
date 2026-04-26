// This is a placeholder for Cloudinary/S3 integration
// In a real scenario, you would use cloudinary.v2.uploader.upload

const uploadImage = async (file) => {
    console.log('Simulating image upload for:', file.originalname);
    
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return a dummy URL
    return `https://res.cloudinary.com/demo/image/upload/foodlink/${Date.now()}_${file.originalname}`;
};

module.exports = {
    uploadImage
};
