Audio Files Directory
====================

This folder contains audio files that play when the website loads and when navigating between pages.

Current Setup:
- The audio system looks for: audio/netflix.mp3

To Add Your Audio:
1. Place your audio file in this folder
2. Name it "netflix.mp3" (or update the audioPath in js/audio.js)
3. Supported formats: MP3, WAV, OGG, M4A

Audio Settings (in js/audio.js):
- Volume: 30% (adjustable)
- Plays on: Page load and navigation between pages
- Auto-resets: Yes (plays from the beginning each time)

To Customize:
- Edit js/audio.js to change the audio file path
- Adjust volume: Change this.audio.volume = 0.3 (0 = mute, 1 = full volume)
- Add mute button: Use window.audioManager.toggleMute()
- Change volume: Use window.audioManager.setVolume(0.5)
