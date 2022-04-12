const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const usersController = require('../../controllers/Customers');

router.get('/', usersController.list);
router.get('/:id', usersController.findByPk);
router.get('/search/:lookFor', usersController.search);
router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);

module.exports = router;