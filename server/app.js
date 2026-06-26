const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Route files
const sareeRoutes = require('./routes/sareeRoutes');
const tryOnRoutes = require('./routes/tryOnRoutes');

const app = express();

// Body parser & CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Mount routers
app.use('/api/sarees', sareeRoutes);
app.use('/api/tryon', tryOnRoutes);

// Catch-all route for undefined endpoints
app.use((req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  next(err);
});

// Centralized Error Handling Middleware
app.use(errorHandler);

module.exports = app;
