const UserServices = require('../services/UserService');
const { checkBoolean } = require('../tools');

class UserController {
    // [POST] api/user//sign-up
    async createUser(req, res, next) {
        try {
            const { name, password, isAdmin } = req.body;
            if (!name) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'the name is required',
                });
            }
            if (!password) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'the password is required',
                });
            }
            if (!checkBoolean(isAdmin)) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'the isAdmin is required',
                });
            }
            const response = await UserServices.createUser(req.body);
            return res.status(200).json(response);
        } catch (e) {
            return res.status(404).json({
                err: e.message,
            });
        }
    }
    // [POST] api/user/sign-in
    async loginUser(req, res, next) {
        try {
            const { name, password } = req.body;
            if (!name) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'the name is required',
                });
            }
            if (!password) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'the password is required',
                });
            }
            const response = await UserServices.loginUser(req.body);
            const { refresh_token, ...newRespone } = response;
            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: false,
                samesite: 'strict',
            });
            return res.status(200).json(newRespone);
        } catch (e) {
            return res.status(404).json({
                err: e.message,
            });
        }
    }
}

module.exports = new UserController();
