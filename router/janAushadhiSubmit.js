const express = require('express');

const router = express.Router();

router.post('/generic/submit',require('../controller/janAushadhiSubmit'));

module.exports = router;