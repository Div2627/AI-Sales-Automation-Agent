const axios = require('axios');
require('dotenv').config();

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent';
const TIMEOUT_MS = 15000;

/**
 * Calls Google Gemini API to generate personalization data.
 * @param {{prospectName:string, prospectCompany:string, prospectTitle:string}} params
 * @returns {Promise<{talkingPoints:Array<string>, openers:{formal:string, casual:string}, objection:string, rebuttal:string}>}
 */
async function generatePersonalization({ prospectName, prospectCompany, prospectTitle }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not set in environment');
  }

  const prompt = `Create a JSON response with the following fields for a sales outreach:\n\n` +
    `{\n  "talkingPoints": [],\n  "openers": {\n    "formal": "",\n    "casual": ""\n  },\n  "objection": "",\n  "rebuttal": ""\n}\n\n` +
    `Fill the fields using these prospect details:\n` +
    `Name: ${prospectName}\nCompany: ${prospectCompany}\nTitle: ${prospectTitle}`;

  const requestBody = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: 'application/json' }
  };

  try {
    const response = await axios.post(`${GEMINI_API_URL}?key=${apiKey}`, requestBody, { timeout: TIMEOUT_MS });
    const candidates = response?.data?.candidates;
    if (!candidates || !candidates[0]) {
      throw new Error('Invalid response from Gemini API');
    }
    const jsonText = candidates[0].content?.parts?.[0]?.text;
    if (!jsonText) {
      throw new Error('Gemini did not return JSON text');
    }
    // Parse strict JSON; if parsing fails, throw.
    const result = JSON.parse(jsonText);
    return result;
  } catch (err) {
    // Graceful error handling: wrap and rethrow for caller.
    if (err.response) {
      throw new Error(`Gemini API error: ${err.response.status} ${err.response.statusText}`);
    }
    throw new Error(`Gemini request failed: ${err.message}`);
  }
}

module.exports = { generatePersonalization };
