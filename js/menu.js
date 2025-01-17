function toggleGallery(galleryId) {
    document.querySelectorAll('.gallery').forEach(gallery => {
        gallery.style.display = gallery.id === galleryId ? 'flex' : 'none';
    });
}

function fetchAndLoadImages(galleryId, category) {
    const gallery = document.getElementById(galleryId);
    gallery.innerHTML = ''; // Clear previous content

    // Dynamically load images based on the naming convention
    const totalImages = 1000; // Adjust based on the actual number of images available
    for (let i = 1; i <= totalImages; i++) {
        const img = document.createElement('img');
        img.src = `images/quotes/${category}/${category}-image${i}.jpg`;
        img.alt = `${category} image ${i}`;
        img.onerror = () => console.warn(`Image not found: ${img.src}`);
        img.onclick = () => openLightbox(img.src);
        gallery.appendChild(img);
    }
}

function openLightbox(src) {
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = src;
    document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}
