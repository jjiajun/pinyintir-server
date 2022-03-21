const express = require('express');

const userRouter = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'images/' });

module.exports = (controller, verifyToken) => {
  userRouter.post(
    '/getuserdatabyid',
    verifyToken(),
    controller.getUserDataById.bind(controller),
  );
  userRouter.post(
    '/api/images',
    upload.single('image'),
    // verifyToken(),
    controller.uploadImage.bind(controller),
  );
  userRouter.post(
    '/api/phrases',
    // verifyToken(),
    controller.uploadPhrase.bind(controller),
  );
  userRouter.get('/images/:key', controller.downloadImage.bind(controller));
  userRouter.post('/login', controller.logIn.bind(controller));
  userRouter.post('/signup', controller.signUp.bind(controller));
  userRouter.post('/getcategories', controller.getCategories.bind(controller));
  userRouter.post('/getphrases', controller.getPhrasesByIdAndCategory.bind(controller));
  userRouter.post('/addnewcategory', controller.addNewCategory.bind(controller));
  userRouter.post('/deletecategory', controller.deleteCategory.bind(controller));

  return userRouter;
};
