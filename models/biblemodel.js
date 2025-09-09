const mongoose = require('mongoose');

const bibleAnalysisSchema = new mongoose.Schema({
  inputText: { type: String, required: true },
  inputType: { type: String, enum: ['text', 'verse', 'question'], required: true },
  analysis: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('BibleAnalysis', bibleAnalysisSchema);