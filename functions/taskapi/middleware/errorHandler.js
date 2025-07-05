const errorHandler = (err, req, res, next) => {
    console.error(err);

    const { statusCode = 500, message = 'Internal Server Error', name, errors } = err;

    if (name === 'ValidationError') {
        return res.status(400).json({ error: errors[0] });
    }
    res.status(statusCode).json({ error: message });
};

module.exports = errorHandler; 