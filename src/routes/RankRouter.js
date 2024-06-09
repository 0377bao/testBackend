const express = require('express');

const multer = require('multer');
const { authMiddleware } = require('../middleware/authMiddleware');
const RankController = require('../controllers/RankController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// router.get('/get-all-product', ProductController.getAllProduct);
router.post('/create-rank', authMiddleware, upload.single('image'), RankController.createRank);
router.post('/update-rank', authMiddleware, RankController.updateRank);
router.get('/getRank/:page', RankController.getRank);
router.get('/getDetailsRank/:id', RankController.getDetailsRank);
router.get('/totalRank', RankController.totalRank);
router.delete('/deleteRank/:id', authMiddleware, RankController.deleteRank);
// router.get('/get-product', ProductController.getProduct);
// router.get('/get-detail-product/:id', ProductController.getProductDetail);
// router.get('/search-product', ProductController.searchProduct);
// router.post('/create-product', ProductController.createProduct);

module.exports = router;
