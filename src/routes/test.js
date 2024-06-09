const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send('hello word');
});
// router.post('/log-out', UserController.logoutUser);
// router.put('/update-user/:id', UserController.updateUser);
// router.delete('/delete-user/:id', authMiddleware, UserController.deleteUser);
// router.get('/getAll', authMiddleware, UserController.getAllUser);
// router.get('/getDetails/:id', authUserMiddleware, UserController.getDetailsUser);
// router.get('/refresh-token', UserController.refreshToken);

module.exports = router;
