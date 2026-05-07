const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { name, company, title } = req.body;

    if (!name || !company || !title) {
      return res.status(400).json({
        error: 'Missing required fields'
      });
    }

    // TEMPORARY MOCK RESPONSE
    // (to verify frontend/backend fully works)

    const responseData = {
      talkingPoints: `
• Discuss Stripe's payment infrastructure
• Mention automation benefits
• Highlight scaling opportunities
      `,

      messageOpeners: `
• Hi Sarah, I noticed Stripe is scaling rapidly.
• As a Product Manager, you may value automation tools.
      `,

      objections: `
• "We already use tools"
→ This solution integrates with existing workflows.
      `
    };

    res.json(responseData);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

module.exports = router;