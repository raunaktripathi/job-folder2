const express = require('express');
const router = express.Router();
const { allUsers, singleUser, editUser, deleteUser, createUserHistory } = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');


//user routes

// /api/allusers
router.get('/allusers', isAuthenticated, isAdmin, allUsers);
// /api/user/id
router.get('/user/:id', isAuthenticated, singleUser);
// /api/user/edit/id
router.put('/user/edit/:id', isAuthenticated, editUser);
// /api/user/jobhistor
router.delete('/admin/user/delete/:id', isAuthenticated, deleteUser);

// /api/admin/user/delete/id
router.post('/user/jobhistory', isAuthenticated, isAdmin, createUserHistory);




module.exports = router;