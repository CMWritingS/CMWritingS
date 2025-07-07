// Gallery names mapped to specific names, YouTube links, and descriptions
const galleryNames = {
    writingsGallery1: { 
        name: "love Quotes", 
        folder: "love", // Subfolder where images are stored
        imgUrl: "images/slider-img.jpg",
        youtubeLink: "https://www.youtube.com/watch?v=VIDEO_ID_1", 
        description: "This gallery showcases the events and activities from the start of the year 2023."
    },
    writingsGallery2: { 
        name: "emotion Quotes", 
        folder: "emotion", // Subfolder where images are stored
        youtubeLink: "https://www.youtube.com/watch?v=VIDEO_ID_2", 
        description: "Mother Teresa Birthday Celebrations:-On 25/8/13. The organisation celebrated Mother Teresa's Birthday by distributing sarees, fruits, bread blankets etc., at Aruna old age home and Mamatha Orphanage. Volunteers shared their time and happiness with old people and with orphans by providing lunch for that day."
    },
    writingsGallery3: { 
        name: "life Quotes", 
        folder: "life", // Subfolder where images are stored
        youtubeLink: "https://www.youtube.com/watch?v=VIDEO_ID_3", 
        description: "Highlights from our March event, capturing memorable moments."
    },
    writingsGallery4: { 
        name: "emotional Quotes", 
        folder: "emotional", // Subfolder where images are stored
        youtubeLink: "https://www.youtube.com/watch?v=VIDEO_ID_3", 
        description: "Highlights from our March event, capturing memorable moments."
    },
    // Add more galleries here with their respective subfolders
    // Continue for other galleries
};

document.addEventListener("DOMContentLoaded", () => {
    const MAX_IMAGES_PER_FOLDER = 1000; // Adjust as needed
    const IMAGES_TO_SHOW = 20;

    function getRandomUniqueNumbers(max, count) {
        const arr = Array.from({length: max}, (_, i) => i + 1);
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.slice(0, count);
    }

    for (let i = 1; i <= 20; i++) {
        const galleryId = `writingsGallery${i}`;
        const galleryTitle = document.getElementById(`galleryTitle${i}`);
        const youtubeLinkContainer = document.getElementById(`youtubeLink${i}`);
        const descriptionContainer = document.getElementById(`galleryDescription${i}`); // Added element for description

        if (galleryTitle && galleryNames[galleryId]) {
            const folder = galleryNames[galleryId].folder; // Get the subfolder (like "love", "life")

            // Set the name
            galleryTitle.innerText = galleryNames[galleryId].name;

            // Set the YouTube link
            if (youtubeLinkContainer) {
                youtubeLinkContainer.innerHTML = `<a href="${galleryNames[galleryId].youtubeLink}" target="_blank">Watch more photos on YouTube</a>`;
            }

            // Set the description
            if (descriptionContainer) {
                descriptionContainer.innerText = galleryNames[galleryId].description;
            }

            // Add 20 random images dynamically
            const galleryContainer = document.getElementById(`writingsGallery${i}`);
            const row = galleryContainer.querySelector('.row');
            row.innerHTML = ""; // Clear previous images

            const randomIndexes = getRandomUniqueNumbers(MAX_IMAGES_PER_FOLDER, IMAGES_TO_SHOW);
            randomIndexes.forEach(idx => {
                const fullImage = `assets/images/gallery/${folder}/writings${idx}.jpg`;
                const thumbImage = `assets/images/gallery/thumb/writings${idx}.jpg`;
                row.innerHTML += `
                    <a href="${fullImage}" class="col-md-3 col-sm-4 gallery-item lightbox">
                        <img src="${thumbImage}" alt="">
                        <span class="on-hover">
                            <span class="hover-caption">Image Caption ${idx}</span>
                        </span>
                    </a>
                `;
            });
        }
    }
});
