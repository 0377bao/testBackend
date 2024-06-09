const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('./JwtServices');

class UserService {
    // [POST] api/user/sign-up
    createUser(newUser) {
        return new Promise(async (resolve, reject) => {
            const { name, password, isAdmin } = newUser;
            try {
                const checkUserName = await UserModel.findOne({ name });
                if (checkUserName) {
                    resolve({
                        status: 'ERR',
                        message: 'Username already in use',
                    });
                }
                const convertPassword = bcrypt.hashSync(password, 10);
                const createUser = await UserModel.create({
                    name,
                    isAdmin,
                    password: convertPassword,
                });

                if (createUser) {
                    resolve({
                        status: 'OK',
                        message: 'Create User Success',
                        data: createUser,
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }
    // [POST] api/user/sign-in
    loginUser(signInUser) {
        return new Promise(async (resolve, reject) => {
            const { name, password } = signInUser;
            try {
                let checkUserContain = await UserModel.findOne({ name });
                if (checkUserContain === null) {
                    resolve({
                        status: 'ERR',
                        message: 'The user is not defined',
                    });
                }
                const comparePassword = bcrypt.compareSync(password, checkUserContain.password);

                if (!comparePassword) {
                    resolve({
                        status: 'ERR',
                        message: 'The password is incorrect',
                    });
                }
                const access_token = await generateAccessToken({
                    name: checkUserContain.name,
                    isAdmin: checkUserContain.isAdmin,
                });
                const refresh_token = await generateRefreshToken({
                    name: checkUserContain.name,
                    isAdmin: checkUserContain.isAdmin,
                });
                resolve({
                    status: 'OK',
                    message: 'Login successful',
                    data: checkUserContain,
                    access_token,
                    refresh_token,
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}

module.exports = new UserService();
