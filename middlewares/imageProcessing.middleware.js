const sharp = require("sharp");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");

// Using sharp lib we need to do some preprocessing and
// resizing of the images then save it into the database
const processingImage = (classify) =>
  asyncHandler(async (req, res, next) => {
    
    // if the image is single uploads
    if (req.file) {
      const filename = `${classify}-${uuidv4()}-${Date.now()}.jpeg`;
      await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat("jpeg")
        .jpeg({ quality: 95 })
        .toFile(`uploads/${classify}/${filename}`);

      // Save image into our db
      if (process.env.NODE_ENV === "production") {
        req.body.image =
          process.env.PRODUCTION_URL + "/uploads/" + classify + "/" + filename;
      } else {
        req.body.image =
          req.protocol +
          "://" +
          req.hostname +
          ":" +
          process.env.SERVER_PORT +
          "/uploads/" +
          classify +
          "/" +
          filename;
      }
    }


    // if there is multiple uploads
    if (req.files && req.files.images) {    
      req.body.images = [];
      await Promise.all(
        req.files.images.map(async (img, index) => {
          const filename = `${classify}-${uuidv4()}-${Date.now()}-${
            index + 1
          }.jpeg`;

          await sharp(img.buffer)
            .resize(2000, 1333)
            .toFormat("jpeg")
            .jpeg({ quality: 95 })
            .toFile(`uploads/${classify}/${filename}`);

          // Save image into our db
          if (process.env.NODE_ENV === "production") {
            req.body.images.push(
              process.env.PRODUCTION_URL +
                "/uploads/" +
                classify +
                "/" +
                filename
            );
          } else {
            req.body.images.push(
              req.protocol +
                "://" +
                req.hostname +
                ":" +
                process.env.SERVER_PORT +
                "/uploads/" +
                classify +
                "/" +
                filename
            );
          }
        })
      );
    }    
    // pass to next middleware
    next();
  });

module.exports = processingImage;
