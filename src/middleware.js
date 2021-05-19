const errorTypes = {
  ValidationError: 422,
  UniqueViolationError: 409,
  ForeignKeyViolationError: 422,
};

const errorMessages = {
  UniqueViolationError: "Input already exist.",
};

function notFound(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

function errorHandler(error, req, res, next) {
  // if (errorTypes[error.name]) {
  //   res.status(errorTypes[error.name]);
  // }
  const statusCode =
    res.statusCode === 200 ? errorTypes[error.name] || 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: errorMessages[error.name] || error.message,
    stack: process.env.NODE_ENV === "production" ? "🍰" : error.stack,
    errors: error.errors || undefined,
  });
}

module.exports = {
  notFound,
  errorHandler,
};
