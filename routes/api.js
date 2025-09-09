const express = require('express');
const bibleController = require('../controllers/biblecontroller');

const router = express.Router();

// Bible analysis routes
router.post('/analyze', bibleController.analyzeBibleText);
router.get('/history', bibleController.getAnalysisHistory);
router.get('/analysis/:id', bibleController.getAnalysisById);

module.exports = router;