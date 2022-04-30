const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
};

const multerErrorHandler = (err, req, res, next) => {
  res.status(400).send(err.message);
};

module.exports = { use, errorHandler, multerErrorHandler };
