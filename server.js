// server.js
require('dotenv').config(); // This should be at the very top
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const logger = require('./config/logger');
const apiRouter = require('./routes/api');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl} from ${req.ip}`);
  next();
};
app.use(requestLogger);

// Routes
app.use('/api', apiRouter);

// Connect to database and start server
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    logger.info(`Bible AI server running on port ${PORT}`);
    console.log(`Bible AI server running on port ${PORT}`);
  });
}).catch(err => {
  logger.error(`Failed to start server: ${err}`);
  console.error(`Failed to start server: ${err}`);
  process.exit(1);
});