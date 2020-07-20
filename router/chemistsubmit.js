const express = require('express');

const router = express.Router();

router.post('/chemist/submit',require('../controller/chemistsubmit'));

module.exports = router;