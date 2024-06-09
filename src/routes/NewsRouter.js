const express = require('express');

const multer = require('multer');
const NewsController = require('../controllers/NewsController');
const { authMiddleware } = require('../middleware/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// router.get('/get-all-product', ProductController.getAllProduct);
router.post('/create-news', authMiddleware, upload.array('image', 10), NewsController.createNews);
router.post('/update-news', authMiddleware, NewsController.updateNews);
router.get('/getNews/:page', NewsController.getNews);
router.get('/getDetailsNews/:id', NewsController.getDetailsNews);
router.get('/totalNews', NewsController.totalNews);
router.delete('/deleteNews/:id', authMiddleware, NewsController.deleteNews);
// router.get('/get-product', ProductController.getProduct);
// router.get('/get-detail-product/:id', ProductController.getProductDetail);
// router.get('/search-product', ProductController.searchProduct);
// router.post('/create-product', ProductController.createProduct);

module.exports = router;
