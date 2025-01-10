const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('public'));

// API endpoint to fetch images
app.get('/api/images/:category', (req, res) => {
    const category = req.params.category;
    const directoryPath = path.join(__dirname, `public/images/quotes/${category}`);
    
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        
        // Filter only image files
        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.json(images);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
