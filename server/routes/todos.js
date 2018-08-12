var express = require('express');
var router = express.Router();
var {add,show,deleteTodo,update,progress,filterToday,filterStatus} = require('../controllers/todo')
var {auth} = require('../middleware/auth')
/* GET users listing.*/
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/add',auth,add)
router.get('/',auth,show)
router.delete('/delete/:id',auth,deleteTodo)
router.put('/update/:id',auth,update)
router.put('/progress/:id',auth,progress)
router.get('/today',auth,filterToday)
router.get('/status',auth,filterStatus)


module.exports = router;
