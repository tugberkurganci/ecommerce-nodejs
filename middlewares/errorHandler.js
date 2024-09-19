// Error handler middleware
function errorHandler(err, req, res, next) {
    console.error(err.stack); 
  
 if (err.name === 'SequelizeValidationError') {
      res.status(400).json({
        error: 'Validation Error',
        message: err.errors.map(error => error.message).join(', '),
      });
    } else if (err.name === 'SequelizeDatabaseError') {
      res.status(500).json({
        error: 'Database Error',
        message: err.message,
      });
    }  else if (err.message === 'User not found') {
        res.status(404).json({
            error: 'User Not Found',
            message: err.message,
        });
    } 
    else if (err.message === 'Insufficient balance') {
        res.status(400).json({
            error: 'Bad Request',
            message: err.message,
        });
    }
    else {
      res.status(err.statusCode || 500).json({
        error: 'Internal Server Error',
        message: err.message || 'An unexpected error occurred',
      });
    }
  }
  
  module.exports = errorHandler;
  