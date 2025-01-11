// Dynamically inject CSS styles
const style = document.createElement('style');
style.textContent = `
  .story-item {
    display: flex;
    align-items: center; /* Aligns text vertically in the middle */
    gap: 10px; /* Space between the title and the link */
    margin-bottom: 10px; /* Space between each story */
  }
  
  .story-item p {
    margin: 0; /* Removes default margin from <p> */
  }
  
  .story-item a {
    text-decoration: none; /* Optional: Removes underline from the link */
    color: #007bff; /* Optional: Makes the link blue */
  }
  
  .story-item a:hover {
    text-decoration: underline; /* Optional: Adds underline on hover */
  }
`;

// Append the style to the document's head
document.head.appendChild(style);
