const express = require('express');
const { createUserController, deleteUserController, getUserDetails, getImageController, updateUserController } = require('../controllers/userController');

//router object
const router = express.Router();

// routers
// POST method insert
router.post('/insert', createUserController);

//  GET method details
router.get('/details/:user_id', getUserDetails);

// GET method Image
router.get('/image/:user_id', getImageController);

// PUT method update
router.put('/update/:user_id', updateUserController);

// DELETE method
router.delete('/delete/:user_id', deleteUserController);

module.exports = router;
