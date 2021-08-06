const express = require("express");
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/messageControllers');

router.post('/create', controller.createMessage);

router.get('/read', controller.getMessage);

router.get('/readall', controller.getAllMessages);
router.put('/edit', controller.editMessage);


router.use(passport.authenticate('myJwt', {session: false}));

router.put('/delete', controller.deleteMessage);
module.exports = router;
