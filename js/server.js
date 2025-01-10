const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));

// List stories from the /stories folder
app.get('/stories', (req, res) => {
  const storiesDir = path.join(__dirname, 'stories');
  fs.readdir(storiesDir, (err, files) => {
    if (err) {
      res.status(500).send('Error reading stories directory');
      return;
    }
    const stories = files.filter(file => file.endsWith('.txt')); // Assuming stories are text files
    res.json(stories);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
