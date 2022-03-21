const express = require('express');

const imageRouter = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'images/' });
const { getFileStream } = require('../s3.js');

const downloadImage = async (req, res) => {
  const { key } = req.params;
  const readStream = getFileStream(key);
  // pipe the image stream straight back to the client
  readStream.pipe(res);
};

module.exports = (controller, verifyToken) => {
  imageRouter.post(
    '/uploadimage',
    upload.single('image'),
    // verifyToken(),
    controller.uploadImage.bind(controller),
  );

  imageRouter.get('/:key', downloadImage);

  return imageRouter;
};
