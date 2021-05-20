const express = require('express');
const router = express.Router();
// 1. Include config and modules





const sellerDetail_controller = require('../controllers/sellerDetail.controller');

router.get('/getData', sellerDetail_controller.getData );
router.post('/createuserdata', sellerDetail_controller.createUserdata);
router.post('/userlogin', sellerDetail_controller.userlogin);
router.get('/index', sellerDetail_controller.index);
router.get('/show/:id', sellerDetail_controller.show);
router.put('/update/:id', sellerDetail_controller.update);
router.delete('/destroy/:id', sellerDetail_controller.destroy);

module.exports = router;
