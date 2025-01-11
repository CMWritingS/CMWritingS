// Consolidated Function to Fetch and Display PDFs
fetch('/stories')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((files) => {
    const storyListDiv = document.getElementById('storyList');
    if (files.length > 0) {
      files.forEach((file) => {
        const storyItem = document.createElement('div');
        storyItem.classList.add('story-item');

        const title = document.createElement('p');
        title.textContent = file.replace('.pdf', ''); // Display file name without extension

        const link = document.createElement('a');
        link.href = `/stories/${encodeURIComponent(file)}`;
        link.textContent = 'Read More';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        storyItem.appendChild(title);
        storyItem.appendChild(link);
        storyListDiv.appendChild(storyItem);
      });
    } else {
      storyListDiv.textContent = 'No stories available.';
    }
  })
  .catch((err) => {
    console.error('Error fetching stories:', err);
    document.getElementById('storyList').textContent =
      'Failed to load stories. Please try again later.';
  });
