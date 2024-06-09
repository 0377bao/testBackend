const dotenv = require('dotenv');
const RankModel = require('../models/RankModel');

dotenv.config();

class RankService {
    // [POST] /api/product/create-product
    createRank(newRank) {
        return new Promise(async (resolve, reject) => {
            const pathweb = process.env.PATHWEB;
            const { image, ...restRank } = newRank;
            try {
                const createRank = await RankModel.create({
                    ...restRank,
                    image: pathweb + image,
                });
                if (createRank) {
                    resolve({
                        status: 'OK',
                        message: 'Create Rank Success',
                        data: createRank,
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }
    getRank(page) {
        return new Promise(async (resolve, reject) => {
            try {
                const getRank = await RankModel.find()
                    .sort({ updatedAt: -1 })
                    .limit(5)
                    .skip((page - 1) * 5);
                if (getRank) {
                    resolve({
                        status: 'OK',
                        message: 'Get Rank Success',
                        data: getRank,
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }
    deleteRank(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const deleteRank = await RankModel.deleteOne({ _id: id });
                if (deleteRank) {
                    resolve({
                        status: 'OK',
                        message: 'Delete Rank Success',
                        data: deleteRank,
                    });
                } else {
                    resolve({
                        status: 'ERR',
                        message: 'Not found rank item delete',
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }
    getDetailsRank(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const findRank = await RankModel.findOne({ _id: id });
                if (findRank) {
                    resolve({
                        status: 'OK',
                        message: 'Get details Rank Success',
                        data: findRank,
                    });
                } else {
                    resolve({
                        status: 'ERR',
                        message: 'Not found Rank item',
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }
    updateRank(updateRank) {
        return new Promise(async (resolve, reject) => {
            try {
                const { id, ...restRank } = updateRank;
                const updateRankNew = await RankModel.updateOne({ _id: id }, { ...restRank });
                if (updateRankNew) {
                    resolve({
                        status: 'OK',
                        message: 'Update Rank Success',
                        data: updateRankNew,
                    });
                } else {
                    resolve({
                        status: 'ERR',
                        message: 'Not found rank item update',
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }
    totalRank() {
        return new Promise(async (resolve, reject) => {
            try {
                const count = await RankModel.find().count();
                resolve({
                    status: 'OK',
                    message: 'Count Rank Success',
                    data: Math.ceil(count / 5),
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}

module.exports = new RankService();
