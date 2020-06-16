const { Identity } = require('../controllers');

const express = require('express');
const router = express.Router();
module.exports = router;

router.post('/confirm/:hash', Identity.confirm);
router.post('/forgot', Identity.forgot);
router.post('/login', Identity.login);
router.post('/reset/:hash', Identity.reset);
