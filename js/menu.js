function toggleGallery(galleryId) {
    document.querySelectorAll('.gallery').forEach(gallery => {
        gallery.style.display = gallery.id === galleryId ? 'flex' : 'none';
    });
}

function fetchAndLoadImages(galleryId, category) {
    const gallery = document.getElementById(galleryId);
    gallery.innerHTML = ''; // Clear previous content

    // Fetch image list from the server
    fetch(`/api/images/${category}`)
        .then(response => response.json())
        .then(images => {
            images.forEach(image => {
                const img = document.createElement('img');
                img.src = `images/quotes/${category}/${image}`;
                img.alt = `${category} image`;
                img.onerror = () => console.warn(`Image not found: ${img.src}`);
                img.onclick = () => openLightbox(img.src);
                gallery.appendChild(img);
            });
        })
        .catch(error => console.error('Error loading images:', error));
}

function openLightbox(src) {
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = src;
    document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}
