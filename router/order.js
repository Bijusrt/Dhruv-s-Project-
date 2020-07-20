const express = require('express');

const router = express.Router();

router.post('/orders',require('../controller/order'));

module.exports = router;