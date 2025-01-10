const fs = require('fs');
const path = require('path');

// Endpoint to fetch the list of stories (PDF files)
app.get('/stories', (req, res) => {
  const storiesDir = path.join(__dirname, 'stories');
  fs.readdir(storiesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read stories directory' });
    }
    // Filter only PDF files
    const pdfFiles = files.filter(file => file.endsWith('.pdf'));
    res.json(pdfFiles);
  });
});
