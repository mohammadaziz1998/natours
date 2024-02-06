const express = require('express');

const userController = require('./../controllers/userController');
const authControler = require('./../controllers/authControler');
// const reviewControler = require('./../controllers/reviewControler');
///////

////////
///
/////////

const router = express.Router();
// //////

router.post('/signup', authControler.singup);
router.post('/login', authControler.login);
router.get('/logout', authControler.logout);
router.post('/forgotPassword', authControler.forgotPassword);
router.patch('/resetPassword/:token', authControler.resetPassword);
//
router.use(authControler.protect);

//////
////
////
router.patch('/updateMyPassword', authControler.updatePassword);
//
router.get('/me', userController.getMe, userController.getUser);
//
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe,
);
router.delete('/deleteMe', userController.deleteMe);

//////
////
////
router.use(authControler.restrictTo('admin'));
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

//

////
module.exports = router;
