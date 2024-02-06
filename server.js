const mongoose = require('mongoose');

const dotenv = require('dotenv');
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception: shuting down....');
  console.log(err.name, err);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('BD connection successful!!!');
  });

//////
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//////////
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandler rejection 🥵 shuting down');
  server.close(() => {
    process.exit(1);
  });
});
