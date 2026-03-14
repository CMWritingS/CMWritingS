// Audio Management System
class AudioManager {
    constructor() {
        this.audio = null;
        this.isPlaying = false;
        // this.audioPath = 'audio/audio.mp4';
        this.init();
    }

    init() {
        // Create audio element
        this.audio = new Audio(this.audioPath);
        this.audio.volume = 0; // Set volume to 0%
        
        // Play audio on page load
        this.playAudio();
        
        // Listen for page navigation
        this.setupNavigationListener();
    }

    playAudio() {
        if (this.audio) {
            this.audio.currentTime = 0; // Reset to start
            this.audio.play().catch(error => {
                console.log('Audio playback failed:', error);
            });
            this.isPlaying = true;
        }
    }

    stopAudio() {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.isPlaying = false;
        }
    }

    setupNavigationListener() {
        // Listen for link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && !link.target) {
                const href = link.getAttribute('href');
                
                // Check if it's an internal navigation link
                if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('javascript')) {
                    // Play audio on navigation
                    this.playAudio();
                }
            }
        });
    }

    setVolume(volume) {
        if (this.audio) {
            this.audio.volume = Math.max(0, Math.min(1, volume));
        }
    }

    toggleMute() {
        if (this.audio) {
            this.audio.muted = !this.audio.muted;
        }
    }
}

// Initialize audio manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.audioManager = new AudioManager();
});
