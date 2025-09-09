const BibleAnalysis = require('../models/biblemodel');
const aiService = require('../services/ai');
const logger = require('../config/logger');

const analyzeBibleText = async (req, res) => {
  try {
    const { text, type = 'text' } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text input is required' });
    }

    // The AI service now returns only a simple 'analysis' field
    const analysis = await aiService.analyzeBibleText(text);

    // Save to database with the simplified schema
    const bibleAnalysis = new BibleAnalysis({
      inputText: text,
      inputType: type,
      analysis: analysis.analysis, // Get the simple string from the AI service
    });

    const savedAnalysis = await bibleAnalysis.save();
    logger.info(`Bible analysis saved to DB: ${savedAnalysis._id}`);

    // Respond with a simplified JSON object
    res.json({
      id: savedAnalysis._id,
      analysis: savedAnalysis.analysis,
    });

  } catch (error) {
    logger.error(`Bible analysis failed: ${error.message}`);
    res.status(500).json({ error: 'Bible analysis failed!', details: error.message });
  }
};

const getAnalysisHistory = async (req, res) => {
  try {
    const analyses = await BibleAnalysis.find().sort({ createdAt: -1 }).limit(20);
    res.json(analyses);
  } catch (error) {
    logger.error(`Database query failed: ${error}`);
    res.status(500).json({ error: 'Failed to get analysis history!' });
  }
};

const getAnalysisById = async (req, res) => {
  try {
    const analysis = await BibleAnalysis.findById(req.params.id);
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }
    res.json(analysis);
  } catch (error) {
    logger.error(`Database query failed: ${error}`);
    res.status(500).json({ error: 'Failed to get analysis!' });
  }
};

module.exports = { analyzeBibleText, getAnalysisHistory, getAnalysisById };