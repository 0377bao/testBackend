const express = require('express');
const UserController = require('../controllers/UserController');
// const { authMiddleware, authUserMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/sign-up', UserController.createUser);
router.post('/sign-in', UserController.loginUser);
// router.post('/log-out', UserController.logoutUser);
// router.put('/update-user/:id', UserController.updateUser);
// router.delete('/delete-user/:id', authMiddleware, UserController.deleteUser);
// router.get('/getAll', authMiddleware, UserController.getAllUser);
// router.get('/getDetails/:id', authUserMiddleware, UserController.getDetailsUser);
// router.get('/refresh-token', UserController.refreshToken);

module.exports = router;
