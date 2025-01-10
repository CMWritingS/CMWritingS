function toggleGallery(galleryId) {
    document.querySelectorAll('.gallery').forEach(gallery => {
        gallery.style.display = gallery.id === galleryId ? 'flex' : 'none';
    });
}

function fetchAndLoadImages(galleryId, category) {
    const gallery = document.getElementById(galleryId);
    gallery.innerHTML = ''; // Clear previous content

    // Dynamically load all available images
    fetch(`images/quotes/${category}/`).then(response => {
        if (response.ok) {
            return response.text();
        } else {
            console.error(`Failed to load images for category: ${category}`);
            return '';
        }
    }).then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const links = doc.querySelectorAll("a");

        links.forEach(link => {
            const href = link.getAttribute("href");
            if (href && href.match(/\.jpg$/i)) {
                const img = document.createElement('img');
                img.src = `images/quotes/${category}/${href}`;
                img.alt = `${category} image`;
                img.onerror = () => console.warn(`Image not found: ${img.src}`);
                img.onclick = () => openLightbox(img.src);
                gallery.appendChild(img);
            }
        });
    }).catch(error => console.error(`Error loading images: ${error}`));
}

function openLightbox(src) {
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = src;
    document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}
