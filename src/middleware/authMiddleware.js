const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.token?.split(' ')[1];
    if (!token) {
        return res.status(200).json({
            status: 'ERR',
            message: 'Xác thực người dùng không hợp lệ',
        });
    }
    jwt.verify(JSON.parse(token), process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Xác thực người dùng không hợp lệ',
            });
        }
        if (user.isAdmin) next();
        else {
            return res.status(200).json({
                status: 'ERR',
                message: 'Xác thực người dùng không hợp lệ',
            });
        }
    });
};

const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token?.split(' ')[1];
    const name = req.params.name;
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The authentication',
            });
        }
        if (user?.isAdmin || user?.name === name) next();
        else {
            return res.status(404).json({
                status: 'ERR',
                message: 'The authentication',
            });
        }
    });
};

module.exports = {
    authMiddleware,
    authUserMiddleware,
};
