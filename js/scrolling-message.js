// Scrolling Message Component
function initScrollingMessage() {
    const scrollingMessage = document.createElement('div');
    scrollingMessage.id = 'scrolling-message';
    scrollingMessage.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #fff;
        padding: 12px 0;
        overflow: hidden;
        font-size: 0.95rem;
        font-weight: 500;
        letter-spacing: 1px;
        position: relative;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    scrollingMessage.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
    });
    
    scrollingMessage.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    });
    
    const messageContent = document.createElement('div');
    messageContent.style.cssText = `
        display: flex;
        animation: scroll 20s linear infinite;
        white-space: nowrap;
        padding-left: 100%;
    `;
    
    messageContent.textContent = 'Subscribe to my YouTube channel: https://www.youtube.com/@CmWritings';
    
    scrollingMessage.appendChild(messageContent);
    
    // Add click event to open YouTube channel
    scrollingMessage.addEventListener('click', function() {
        window.open('https://www.youtube.com/@CmWritings', '_blank');
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes scroll {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(-100%);
            }
        }
        
        #scrolling-message:hover {
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }
        
        @media (max-width: 768px) {
            #scrolling-message {
                padding: 8px 0 !important;
                font-size: 0.85rem !important;
            }
        }
        
        @media (max-width: 480px) {
            #scrolling-message {
                padding: 6px 0 !important;
                font-size: 0.75rem !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    return scrollingMessage;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar-brand');
    if (navbar && navbar.parentElement) {
        const scrollMessage = initScrollingMessage();
        navbar.parentElement.parentElement.parentElement.insertAdjacentElement('afterend', scrollMessage);
    }
});
