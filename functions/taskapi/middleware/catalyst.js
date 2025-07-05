const catalyst = require('zcatalyst-sdk-node');

const catalystInit = (req, res, next) => {
  try {
    req.catalyst = catalyst.initialize(req);
    next();
  } catch (error) {
    console.error('Catalyst initialization failed:', error);
    res.status(500).json({ error: 'Catalyst SDK initialization failed' });
  }
};

module.exports = catalystInit;
