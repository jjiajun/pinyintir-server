const express = require('express');

const userRouter = express.Router();

module.exports = (controller, verifyToken) => {
  userRouter.post(
    '/uploadphrase',
    // verifyToken(),
    controller.uploadPhrase.bind(controller),
  );

  userRouter.post('/getphrases', controller.getPhrasesByIdAndCategory.bind(controller));

  userRouter.post('/getcategories', controller.getCategories.bind(controller));

  userRouter.post('/addnewcategory', controller.addNewCategory.bind(controller));

  userRouter.post('/deletecategory', controller.deleteCategory.bind(controller));

  return userRouter;
};
