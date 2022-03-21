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
  userRouter.post('/login', controller.logIn.bind(controller));
  userRouter.post('/signup', controller.signUp.bind(controller));

  return userRouter;
};
