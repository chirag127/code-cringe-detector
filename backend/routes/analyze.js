const express = require('express');
const router = express.Router();
const geminiService = require('../services/gemini');
const parser = require('../utils/parser');

/**
 * POST /analyze
 * Analyze code for code smells
 */
router.post('/', async (req, res, next) => {
  try {
    const { code, language, sassLevel = 'medium' } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    // Parse code to get line numbers and chunks
    const codeChunks = parser.chunkCode(code);

    // Analyze code with Gemini
    const issues = await geminiService.analyzeCode(code, language, sassLevel);

    // Return results
    res.json({ issues });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /analyze/suggest
 * Get fix suggestions for a specific issue
 */
router.post('/suggest', async (req, res, next) => {
  try {
    const { code, issue } = req.body;

    if (!code || !issue) {
      return res.status(400).json({ error: 'Code and issue are required' });
    }

    // Get suggestion from Gemini
    const suggestion = await geminiService.getSuggestion(code, issue);

    // Return results
    res.json({ suggestion });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
