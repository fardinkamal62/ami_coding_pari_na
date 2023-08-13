const express = require('express');
const router = express.Router();

const api = require('../api');
const middlewares = require('../middlewares');

router.route('/login').post(api.login.signIn);
router.route('/registration').post(api.registration.createAccount);
router.route('/submit').post(middlewares.auth.authenticate, api.main.submit);
router.route('/get/:username').get(api.main.getEntries); // not getting how to put auth middleware here

module.exports = router;
