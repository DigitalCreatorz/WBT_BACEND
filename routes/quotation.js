const express = require('express');
const router = express.Router();
const quotationController = require('../controllers/quotationController');

router.post('/', quotationController.createQuotation);
router.post('/batch', quotationController.createBatchQuotations);
router.get('/', quotationController.getQuotations);
router.get('/:id', quotationController.getQuotation);
router.put('/:id', quotationController.updateQuotation);
router.delete('/:id', quotationController.deleteQuotation);

module.exports = router;