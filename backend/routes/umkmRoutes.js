const express = require('express');
const router = express.Router();
const umkmController = require('../controllers/umkmController');

router.get('/', umkmController.getAll);
router.get('/:id', umkmController.getById);

module.exports = router;
