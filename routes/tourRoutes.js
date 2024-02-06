const express = require('express');
const authControler = require('./../controllers/authControler');
const tourController = require('./../controllers/tourController');
const reviewRouter = require('./reviewRoutes');
// const userController = require('./../controllers/tourController');
///

/////

////////////////////////////////////////

///////////////////////////

///////////////////////

const router = express.Router();
/////
// router
//   .route('/:tourId/reviews')
//   .post(
//     authControler.protect,
//     authControler.restrictTo('user'),
//     reviewControler.createReview,
//   );
// router.param('id', tourController.checkID);

router.use('/:tourId/reviews', reviewRouter);
////
////
////
////
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authControler.protect,
    authControler.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan,
  );

//
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getTourWithin);
//
router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);
///
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authControler.protect,
    authControler.restrictTo('admin', 'lead-guide'),
    tourController.createTour,
  );
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authControler.protect,
    authControler.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour,
  )
  .delete(
    authControler.protect,
    authControler.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );
//
//

//
module.exports = router;
