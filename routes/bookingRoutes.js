const express = require('express');
const authControler = require('./../controllers/authControler');
const bookingController = require('./../controllers/bookingController');
//////////////
///////////////////
const router = express.Router();

///
///
router.use(authControler.protect);
///
router.get('/checkout-session/:tourID', bookingController.getCheckoutSession);
///
///
router.use(authControler.restrictTo('admin', 'lead-guide'));
///
router
  .route('/')
  .get(bookingController.getAllBooking)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

/////////////////////
module.exports = router;
