const jwt = require('jsonwebtoken');

const generateAccessToken = async (payload) => {
    const access_token = jwt.sign(
        {
            ...payload,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: '1h' },
    );
    return access_token;
};

const generateRefreshToken = async (payload) => {
    const refresh_token = jwt.sign(
        {
            ...payload,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: '365d' },
    );
    return refresh_token;
};

const refreshTokenService = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async function (err, user) {
                if (err) {
                    resolve({
                        status: 'ERROR',
                        message: 'the authentication token',
                    });
                }
                const { iat, exp, ...newUser } = user;
                const access_token = await generateAccessToken(newUser);
                resolve({
                    status: 'OK',
                    message: 'Success',
                    access_token,
                });
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { generateAccessToken, generateRefreshToken, refreshTokenService };
