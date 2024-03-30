

export const info = (...params) => {
  console.log(...params);
};

export const error = (...params) => {
  console.error(...params);
};


export const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: `uknonwn endpoint` });
};

export const errorHandler = (error, req, res, next) => {
  logger.error(error.message);
  next(error);
};
