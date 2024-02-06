const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authControler = require('./../controllers/authControler');
const bookingController = require('./../controllers/bookingController');
//
const router = express.Router();

////////////////////////////
/////

//////
router.get(
  '/',
  bookingController.createBookingCheckout,
  authControler.isLoggedIn,
  viewsController.getOverview,
);

// router.get('/tour', viewsController.getTour);
router.get('/tour/:slug', authControler.isLoggedIn, viewsController.getTour);
router.get('/login', authControler.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authControler.protect, viewsController.getAccount);
router.get('/my-tours', authControler.protect, viewsController.getMyTours);
router.post(
  '/submit-user-data',
  authControler.protect,
  viewsController.updateUserData,
);
//////////////////////////////
module.exports = router;
