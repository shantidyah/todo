var express = require('express');
var router = express.Router();

const {add,login,show} = require('../controllers/user')

router.post('/login',login)
router.get('/users',show)
router.post('/register',add)

module.exports = router;
