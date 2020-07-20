const express = require('express');

const router = express.Router();

router.get('/redirect/nextchemist',require('../controller/redirectToNextChemist'));

module.exports = router;