const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

router.get('/', resultController.getResults);
router.post('/', resultController.createResult);
router.put('/:id', resultController.updateResult);
router.delete('/:id', resultController.deleteResult);

module.exports = router;

