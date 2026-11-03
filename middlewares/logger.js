const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const { method, url } = req;

  res.on('finish', () => {
    console.log(`[${timestamp}] ${method} ${url} - Status: ${res.statusCode}`);
  });

  next();
};

module.exports = logger;
