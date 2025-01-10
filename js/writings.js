document.addEventListener("DOMContentLoaded", function() {
    // Your data array in JS file
    const writingsData = [
      {
        title: "Love Quotes",
        description: "Following are the love quotes",
        imgUrl: "images/slider-img.jpg",
        link: "quotes.html"
      },
      {
        title: "Life Quotes",
        description: "Following are the life quotes",
        imgUrl: "images/slider-img.jpg",
        link: "quotes.html"
      },
      {
        title: "Spl Quotes",
        description: "Following are the Spl quotes",
        imgUrl: "images/slider-img.jpg",
        link: "quotes.html"
      },
      {
        title: "Social Quotes",
        description: "Following are the Social quotes",
        imgUrl: "images/slider-img.jpg",
        link: "quotes.html"
      },
      {
        title: "Emotional Quotes",  // New Category
        description: "Following are the Emotional quotes",
        imgUrl: "images/slider-img.jpg",
        link: "quotes.html"
      }
    ];
  
    // Get the container where the writings will be added
    const writingsContainer = document.getElementById('writings-container');
  
    // Loop through each writing item and dynamically generate the HTML
    writingsData.forEach(writing => {
      const writingBox = document.createElement('div');
      writingBox.classList.add('col-md-6', 'col-lg-3');
  
      writingBox.innerHTML = `
        <div class="box">
          <div class="img-box">
            <img src="${writing.imgUrl}" alt="">
          </div>
          <div class="detail-box">
            <h5>${writing.title}</h5>
            <p>${writing.description}</p>
            <a href="${writing.link}">
              <span>Read More</span>
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      `;
  
      // Append the writing box to the container
      writingsContainer.appendChild(writingBox);
    });
  });
  