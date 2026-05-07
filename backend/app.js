const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/personalize', (req, res) => {

  console.log("BODY:", req.body);

  const { name, company, title } = req.body;

  if (!name || !company || !title) {
    return res.status(400).json({
      error: 'Missing required fields'
    });
  }

  res.json({

    talkingPoints: [
      `Discuss ${company}'s scaling challenges`,
      `Mention workflow automation for ${title}s`,
      `Highlight productivity improvements for ${company}`
    ],

    messageOpeners: [
      `Hi ${name}, I noticed ${company} is growing rapidly.`,
      `As a ${title}, automation may help your team scale faster.`
    ],

    objections: [
      `"We already use tools" → This integrates seamlessly with ${company}'s existing workflows.`
    ]

  });

});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});