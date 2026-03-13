// Enhanced Quote Sharing Functionality
// Add this to your quotes.html or create as separate JS file

// Add share buttons to each quote
function addShareButtons() {
    const style = document.createElement('style');
    style.textContent = `
        .quote-share-buttons {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            gap: 5px;
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .quote:hover .quote-share-buttons {
            opacity: 1;
        }
        
        .share-btn {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 14px;
            color: white;
            transition: transform 0.2s;
        }
        
        .share-btn:hover {
            transform: scale(1.1);
        }
        
        .share-whatsapp { background: #25D366; }
        .share-facebook { background: #1877F2; }
        .share-twitter { background: #1DA1F2; }
        .share-copy { background: #6c757d; }
        
        .copy-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .favorite-btn {
            position: absolute;
            top: 10px;
            left: 10px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.2s;
            opacity: 0;
        }
        
        .quote:hover .favorite-btn {
            opacity: 1;
        }
        
        .favorite-btn.active {
            color: #dc3545;
            opacity: 1;
        }
        
        .favorite-btn:hover {
            transform: scale(1.2);
        }
    `;
    document.head.appendChild(style);
}

// Share quote on WhatsApp
function shareOnWhatsApp(imageUrl, category) {
    const text = `Check out this inspiring quote from CM-Writings!\nCategory: ${category}\n${window.location.origin}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
}

// Share quote on Facebook
function shareOnFacebook(imageUrl) {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
}

// Share quote on Twitter
function shareOnTwitter(category) {
    const text = `Inspiring quote from CM-Writings - ${category} category`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
}

// Copy image URL to clipboard
function copyImageUrl(imageUrl) {
    navigator.clipboard.writeText(imageUrl).then(() => {
        showNotification('Image URL copied to clipboard!');
    }).catch(() => {
        showNotification('Failed to copy URL', 'error');
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    notification.style.background = type === 'error' ? '#dc3545' : '#28a745';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Toggle favorite
function toggleFavorite(quoteId, btn) {
    const favorites = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
    const index = favorites.indexOf(quoteId);
    
    if (index > -1) {
        favorites.splice(index, 1);
        btn.classList.remove('active');
        btn.innerHTML = '♡';
        showNotification('Removed from favorites');
    } else {
        favorites.push(quoteId);
        btn.classList.add('active');
        btn.innerHTML = '♥';
        showNotification('Added to favorites');
    }
    
    localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
}

// Check if quote is favorited
function isQuoteFavorited(quoteId) {
    const favorites = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
    return favorites.includes(quoteId);
}

// Enhanced fetchAndLoadImages with share buttons
function fetchAndLoadImagesWithShare(galleryId, folder) {
    document.querySelectorAll('.gallery').forEach(g => g.style.display = 'none');
    const gallery = document.getElementById(galleryId);
    if (!gallery) return;
    gallery.innerHTML = '';
    gallery.style.display = 'flex';

    let maxImages = 1000;
    let indexes = Array.from({length: maxImages}, (_, i) => i + 1);
    for (let j = indexes.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [indexes[j], indexes[k]] = [indexes[k], indexes[j]];
    }
    
    let shown = 0;
    let idx = 0;
    
    function tryNext() {
        if (shown >= 20 || idx >= indexes.length) return;
        const i = indexes[idx];
        idx++;
        const imgSrc = `images/quotes/${folder}/${folder}-image${i}.jpg`;
        const thumbSrc = `images/quotes/${folder}/thumb/${folder}-image${i}.jpg`;
        const quoteId = `${folder}-${i}`;
        
        const img = new Image();
        img.src = thumbSrc;
        img.alt = `Quote ${i}`;
        img.style.cursor = "pointer";
        img.onclick = function() { openLightbox(imgSrc); };
        
        img.onload = function() {
            const imgDiv = document.createElement('div');
            imgDiv.className = 'quote';
            imgDiv.style.position = 'relative';
            
            // Add favorite button
            const favoriteBtn = document.createElement('div');
            favoriteBtn.className = 'favorite-btn';
            favoriteBtn.innerHTML = isQuoteFavorited(quoteId) ? '♥' : '♡';
            if (isQuoteFavorited(quoteId)) favoriteBtn.classList.add('active');
            favoriteBtn.onclick = (e) => {
                e.stopPropagation();
                toggleFavorite(quoteId, favoriteBtn);
            };
            
            // Add share buttons
            const shareButtons = document.createElement('div');
            shareButtons.className = 'quote-share-buttons';
            shareButtons.innerHTML = `
                <div class="share-btn share-whatsapp" onclick="event.stopPropagation(); shareOnWhatsApp('${imgSrc}', '${folder}')" title="Share on WhatsApp">
                    <i class="fa fa-whatsapp"></i>
                </div>
                <div class="share-btn share-facebook" onclick="event.stopPropagation(); shareOnFacebook('${imgSrc}')" title="Share on Facebook">
                    <i class="fa fa-facebook"></i>
                </div>
                <div class="share-btn share-twitter" onclick="event.stopPropagation(); shareOnTwitter('${folder}')" title="Share on Twitter">
                    <i class="fa fa-twitter"></i>
                </div>
                <div class="share-btn share-copy" onclick="event.stopPropagation(); copyImageUrl('${window.location.origin}/${imgSrc}')" title="Copy Link">
                    <i class="fa fa-link"></i>
                </div>
            `;
            
            imgDiv.appendChild(favoriteBtn);
            imgDiv.appendChild(img);
            imgDiv.appendChild(shareButtons);
            gallery.appendChild(imgDiv);
            shown++;
            tryNext();
        };
        
        img.onerror = function() {
            if (thumbSrc !== imgSrc) {
                img.src = imgSrc;
                img.onerror = function() { tryNext(); };
                img.onload = function() {
                    const imgDiv = document.createElement('div');
                    imgDiv.className = 'quote';
                    imgDiv.style.position = 'relative';
                    
                    const favoriteBtn = document.createElement('div');
                    favoriteBtn.className = 'favorite-btn';
                    favoriteBtn.innerHTML = isQuoteFavorited(quoteId) ? '♥' : '♡';
                    if (isQuoteFavorited(quoteId)) favoriteBtn.classList.add('active');
                    favoriteBtn.onclick = (e) => {
                        e.stopPropagation();
                        toggleFavorite(quoteId, favoriteBtn);
                    };
                    
                    const shareButtons = document.createElement('div');
                    shareButtons.className = 'quote-share-buttons';
                    shareButtons.innerHTML = `
                        <div class="share-btn share-whatsapp" onclick="event.stopPropagation(); shareOnWhatsApp('${imgSrc}', '${folder}')" title="Share on WhatsApp">
                            <i class="fa fa-whatsapp"></i>
                        </div>
                        <div class="share-btn share-facebook" onclick="event.stopPropagation(); shareOnFacebook('${imgSrc}')" title="Share on Facebook">
                            <i class="fa fa-facebook"></i>
                        </div>
                        <div class="share-btn share-twitter" onclick="event.stopPropagation(); shareOnTwitter('${folder}')" title="Share on Twitter">
                            <i class="fa fa-twitter"></i>
                        </div>
                        <div class="share-btn share-copy" onclick="event.stopPropagation(); copyImageUrl('${window.location.origin}/${imgSrc}')" title="Copy Link">
                            <i class="fa fa-link"></i>
                        </div>
                    `;
                    
                    imgDiv.appendChild(favoriteBtn);
                    imgDiv.appendChild(img);
                    imgDiv.appendChild(shareButtons);
                    gallery.appendChild(imgDiv);
                    shown++;
                    tryNext();
                };
            } else {
                tryNext();
            }
        };
    }
    tryNext();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    addShareButtons();
});

// Download quote as image
function downloadQuote(imageUrl, quoteName) {
    fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = quoteName || 'cm-writings-quote.jpg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            showNotification('Quote downloaded successfully!');
        })
        .catch(() => {
            showNotification('Failed to download quote', 'error');
        });
}
