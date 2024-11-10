const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Some interal error!";

  res.json({
    success: false,
    statusCode: statusCode,
    message: message,
  });
};

export default errorHandler;
