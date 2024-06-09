const NewsModel = require('../models/NewsModel');
const dotenv = require('dotenv');

dotenv.config();

class NewsService {
    // [POST] /api/product/create-product
    createNews(newNews) {
        return new Promise(async (resolve, reject) => {
            const pathweb = process.env.PATHWEB;
            const { title, description, image } = newNews;
            const pathWebConvert = image.map((item) => pathweb + item);
            try {
                const createNews = await NewsModel.create({
                    title,
                    image: pathWebConvert,
                    description,
                });
                if (createNews) {
                    resolve({
                        status: 'OK',
                        message: 'Create News Success',
                        data: createNews,
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }
    getNews(page) {
        return new Promise(async (resolve, reject) => {
            try {
                const getNews = await NewsModel.find()
                    .sort({ updatedAt: -1 })
                    .limit(5)
                    .skip((page - 1) * 5);
                if (getNews) {
                    resolve({
                        status: 'OK',
                        message: 'Get News Success',
                        data: getNews,
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }
    deleteNews(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const deleteNews = await NewsModel.deleteOne({ _id: id });
                if (deleteNews) {
                    resolve({
                        status: 'OK',
                        message: 'Delete News Success',
                        data: deleteNews,
                    });
                } else {
                    resolve({
                        status: 'ERR',
                        message: 'Not found news item delete',
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }
    getDetailsNews(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const findNews = await NewsModel.findOne({ _id: id });
                if (findNews) {
                    resolve({
                        status: 'OK',
                        message: 'Get details News Success',
                        data: findNews,
                    });
                } else {
                    resolve({
                        status: 'ERR',
                        message: 'Not found news item',
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }
    updateNews(updateNews) {
        return new Promise(async (resolve, reject) => {
            try {
                const { id, title, description } = updateNews;
                const updateNewsTemp = await NewsModel.updateOne({ _id: id }, { title, description });
                if (updateNewsTemp) {
                    resolve({
                        status: 'OK',
                        message: 'Update News Success',
                        data: updateNewsTemp,
                    });
                } else {
                    resolve({
                        status: 'ERR',
                        message: 'Not found news item update',
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }
    totalNews() {
        return new Promise(async (resolve, reject) => {
            try {
                const count = await NewsModel.find().count();
                resolve({
                    status: 'OK',
                    message: 'Count News Success',
                    data: Math.ceil(count / 5),
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}

module.exports = new NewsService();
