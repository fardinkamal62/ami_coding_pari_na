const express = require('express');
const router = express.Router();

const api = require('../api');
const middlewares = require('../middlewares');

router.route('/login').post(api.login.signIn);
router.route('/registration').post(api.registration.createAccount);
router.route('/submit').post(middlewares.auth.authenticate, api.main.submit);
router.route('/get/:uid/:start_time?/:end_time?').get(middlewares.auth.authenticate, api.main.getEntries);
router.route('/me').get(middlewares.auth.authenticate, api.main.getMe);

module.exports = router;
