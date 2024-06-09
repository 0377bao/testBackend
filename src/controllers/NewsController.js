const NewsService = require('../services/NewsService');
const sharp = require('sharp');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const pathstore = process.env.PATHSTORE;

class NewsController {
    // [POST] api/news/create-news
    async createNews(req, res) {
        try {
            const { title, description } = req.body;
            if (!title || !description) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The input is required',
                });
            }
            const response = {
                ...req.body,
            };
            const images = req.files;
            const urlImages = [];
            if (images) {
                await Promise.all(
                    images.map(async (imageItem) => {
                        // Xử lý ảnh bằng
                        // Lấy hình ảnh từ client gửi lên thông qua thư viện sharp
                        const processedImageBuffer = await sharp(imageItem.buffer).toBuffer();
                        // Tạo tên ảnh bằng thời gian thực sao cho không trùng lặp
                        const imageFilename = `news-${Date.now()}.jpg`;
                        // Tạo đường dẫn của ảnh trên server
                        const imagePath = path.join(pathstore, 'public', 'images', 'news', imageFilename);
                        // Ghi ảnh vào server với ảnh vừa lấy và thư mục
                        require('fs').writeFileSync(imagePath, processedImageBuffer);
                        // Tạo product với thông tin người dùng và đường dẫn image là đưỡng dẫn vừa tạo
                        urlImages.push(`images/news/${imageFilename}`);
                    }),
                );
                response.image = urlImages;
            }
            const responseService = await NewsService.createNews(response);
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
    async getNews(req, res) {
        try {
            const page = req.params.page || 0;
            const responseService = await NewsService.getNews(page);
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
    async getDetailsNews(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The id is required',
                });
            }
            const responseService = await NewsService.getDetailsNews(id);
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
    async deleteNews(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(200).json({
                    status: 'ERROR',
                    message: 'The input is required',
                });
            }
            const responseService = await NewsService.deleteNews(id);
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
    async updateNews(req, res) {
        try {
            const { id, title, description } = req.body;
            console.log(req.body);
            if (!id || !title || !description) {
                return res.status(200).json({
                    status: 'ERROR',
                    message: 'The input is required',
                });
            }
            const responseService = await NewsService.updateNews(req.body);
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
    async totalNews(req, res) {
        try {
            const responseService = await NewsService.totalNews();
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
}

module.exports = new NewsController();
