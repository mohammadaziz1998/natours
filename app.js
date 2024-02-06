const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSantize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorControler');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
/////
const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
///////////GLOBAL MIDDLEWARE//////
app.use(express.static(path.join(__dirname, 'public')));

///Security HTTP Headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': [
          "'self'",
          'https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js',
        ],
        'style-src': null,
      },
    },
  }),
);

//Devolpment Login
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

///Limiting Request from same API
const limiter = rateLimit({
  max: 100,
  window: 60 * 60 * 1000,
  message: 'Too many request frome this IP, Please try again in an hour',
});
app.use('/api', limiter);

//Body Parser, Reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(
  express.urlencoded({
    extended: true,
    limit: '10kb',
  }),
);
app.use(cookieParser());
///
//Data santization against no SQL query injection

app.use(mongoSantize());
//DATA santization against XSS
app.use(xss());
//////
//prevent parameter polotoin
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);
//

//Serving static fiels

///

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});
////

////
////Routehandler////

//

////
//////

/////////

// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id', getTour);

// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
/////

//////

//////
/////ROUTES????///////////
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);
//
app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err);
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
//////////
app.use(globalErrorHandler);
///////////
////START THE  SERVER////
module.exports = app;
