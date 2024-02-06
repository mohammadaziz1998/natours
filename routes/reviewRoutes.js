const express = require('express');
const reviewControler = require('./../controllers/reviewControler');
const authControler = require('./../controllers/authControler');
//////////////
///////////////////
const router = express.Router({ mergeParams: true });
///
router.use(authControler.protect);
///
router
  .route('/')
  .get(reviewControler.getAllReviews)
  .post(
    authControler.restrictTo('user'),
    reviewControler.setTourUserIds,
    reviewControler.createReview,
  );
router
  .route('/:id')
  .get(reviewControler.getReview)
  .patch(
    authControler.restrictTo('user', 'admin'),
    reviewControler.updateReview,
  )
  .delete(
    authControler.restrictTo('user', 'admin'),
    reviewControler.deleteReview,
  );
/////////////////////
module.exports = router;
