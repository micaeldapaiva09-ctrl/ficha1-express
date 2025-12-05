
module.exports = function (req, res, next) {
    const now = new Date();

    console.log(`${req.method} ${req.originalUrl} - ${now.toLocaleString()}`);
    
    next();
};
