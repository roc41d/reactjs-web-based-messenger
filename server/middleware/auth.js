const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    const cookies = req.cookies;
    const token = cookies.token;

    if (!token) {
        return res
            .status(401)
            .json({ msg: 'Authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decoded;
        next();

    } catch (err) {
        res
            .status(401)
            .json({ msg: 'Invalid token!' });
    }
};

module.exports = auth;