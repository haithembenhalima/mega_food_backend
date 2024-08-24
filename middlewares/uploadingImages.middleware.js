const multer  = require('multer')
const ApiError = require('../utils/ApiError');
const storage = multer.memoryStorage();

// @desc create the settings and configuration of the image uploaded 
const uploadImageSettings = () =>{
    // filter to allow only images
    const multerFilter = function (req, file, cb) {      
        if (file.mimetype.startsWith('image')) {
          cb(null, true);
        } else {
          cb(new ApiError('Only Images allowed', 400), false);
        }
      };    
      // create multer object
      const upload = multer({
        storage: multer.memoryStorage(),
        fileFilter: multerFilter,
      });
      
      return upload;
}

// @desc export the single uploading images using the previously settings
exports.uploadSingleImage = (fieldName) => uploadImageSettings().single(fieldName);
exports.uploadMultipleImages = (arrayFields) => uploadImageSettings().fields(arrayFields);