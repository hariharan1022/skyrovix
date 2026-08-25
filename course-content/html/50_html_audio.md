## 50. HTML Audio
## 📘 Introduction
The HTML `<audio>` element embeds sound content in web pages without requiring plugins. Supporting common audio formats with native playback controls, `<audio>` enables background music, sound effects, podcasts, and voice narration with attributes for autoplay, looping, and volume control.

## 🧠 Key Concepts
- `<audio>` element embeds audio with `src` attribute or nested `<source>` elements
- **Controls:** `controls` attribute adds play/pause, seek, volume, and time display
- **Autoplay:** `autoplay` starts playback automatically (restricted by browsers — requires `muted`)
- **Loop:** `loop` restarts the audio when it finishes
- **Muted:** `muted` starts audio silenced
- **Preload:** `preload` hints when to load (`none`, `metadata`, `auto`)
- **Formats:** MP3 is most compatible; WAV for uncompressed; OGG for open-source
- **Fallback:** Text between `<audio>` tags shows when the element is not supported

## 💻 Syntax (HTML code)
```html
<audio controls>
    <source src="song.mp3" type="audio/mpeg">
    <source src="song.ogg" type="audio/ogg">
    <source src="song.wav" type="audio/wav">
    Your browser does not support the audio element.
</audio>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Embed a music player with controls and format fallbacks.

**Code:**
```html
<!DOCTYPE html>
<html>
<body>
    <h2>Music Player</h2>

    <audio controls preload="metadata">
        <source src="background.mp3" type="audio/mpeg">
        <source src="background.ogg" type="audio/ogg">
        <source src="background.wav" type="audio/wav">

        <p>Your browser does not support HTML5 audio.
        <a href="background.mp3">Download the audio file</a></p>
    </audio>

    <p>Press play to listen to background music.</p>
</body>
</html>
```

**Output:** An audio player with native controls showing play/pause button, a seek bar, current time, duration, and volume slider. The browser selects the first supported format. Fallback text with a download link appears if no format is supported.

**Explanation:** `preload="metadata"` loads only the audio duration and tags (not the full file) to save bandwidth. Multiple `<source>` elements ensure compatibility across browsers. The controls attribute provides a consistent, accessible interface.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Create a podcast player with autoplay, loop, and multiple episodes.

**Code:**
```html
<!DOCTYPE html>
<html>
<body>
    <h2>Podcast Player</h2>

    <div style="border: 2px solid #333; border-radius: 10px; padding: 20px; max-width: 500px; background: #f5f5f5;">
        <h3 id="episodeTitle">Episode 1: Getting Started</h3>

        <audio id="podcastPlayer" controls loop preload="metadata">
            <source src="episode1.mp3" type="audio/mpeg">
            <source src="episode1.ogg" type="audio/ogg">
            Your browser does not support audio.
        </audio>

        <div style="margin-top: 15px;">
            <p><strong>Episode List:</strong></p>
            <button onclick="playEpisode(1)">Episode 1: Intro</button>
            <button onclick="playEpisode(2)">Episode 2: Deep Dive</button>
            <button onclick="playEpisode(3)">Episode 3: Advanced</button>
        </div>
    </div>

    <script>
        const player = document.getElementById('podcastPlayer');
        const title = document.getElementById('episodeTitle');

        function playEpisode(num) {
            const episodes = {
                1: { title: 'Episode 1: Getting Started', src: 'episode1.mp3' },
                2: { title: 'Episode 2: Deep Dive', src: 'episode2.mp3' },
                3: { title: 'Episode 3: Advanced Topics', src: 'episode3.mp3' }
            };

            const ep = episodes[num];
            if (ep) {
                title.textContent = ep.title;
                player.querySelector('source').src = ep.src;
                player.load();
                player.play();
            }
        }
    </script>

    <p>Click an episode to load and play. The player loops the current episode.</p>
</body>
</html>
```

**Output:** A styled podcast player showing the current episode title, audio controls with loop enabled, and three episode buttons. Clicking an episode changes the source, reloads the player, and starts playback automatically.

**Explanation:** `loop` repeats the audio when it ends (useful for music or podcast previews). JavaScript controls allow dynamic source switching: `player.load()` refreshes the player with the new source, and `player.play()` starts playback (browser may require user gesture).

## 🏢 Real World Use Case
Podcast websites embed episode players; music streaming platforms use `<audio>` for previews; e-learning sites include narration audio for lessons; notification sounds on web apps; meditation/soundscape websites for ambient audio; language learning apps with pronunciation audio.

## 🎯 Interview Questions (5 with answers)
1. **Q:** What audio formats are most widely supported in HTML5?
   **A:** MP3 (audio/mpeg) has near-universal support. OGG Vorbis (audio/ogg) is supported by Chrome, Firefox, Opera. WAV (audio/wav) is supported broadly but has large file sizes.

2. **Q:** How do you make audio autoplay on a web page?
   **A:** Use the `autoplay` attribute. However, most browsers block autoplay with audio unless the user has interacted with the site. Adding `muted` may allow autoplay, but the audio will be silent.

3. **Q:** What is the difference between `preload="auto"` and `preload="none"`?
   **A:** `preload="auto"` hints the browser to download the entire audio file on page load. `preload="none"` hints to not load any audio data until play is clicked, saving bandwidth.

4. **Q:** How do you change the audio source dynamically with JavaScript?
   **A:** Update `audioElement.querySelector('source').src = 'newfile.mp3'`, then call `audioElement.load()` to reload and `audioElement.play()` to start.

5. **Q:** Can you use CSS to style the native audio controls?
   **A:** Limited. The native `<audio>` controls are implemented by the browser and cannot be fully styled with CSS. For custom styling, hide `controls` and build custom controls using JavaScript and the HTMLMediaElement API.

## ⚠ Common Errors / Mistakes
- Forgetting `type` attributes on `<source>` elements (browser may not identify the format)
- Expecting `autoplay` to work with sound (most browsers block unmuted autoplay)
- Not providing format fallbacks (MP3-only may fail on some older browsers)
- Missing fallback content for browsers that don't support `<audio>`
- Using `loop` on long podcasts unaware it will restart from beginning
- Setting `preload="auto"` on many audio files (increases page load time significantly)

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Embed an audio file with controls using MP3 source.
2. Create an audio element that loops and has preload set to "metadata".
3. Add fallback text to an audio element for unsupported browsers.

**Intermediate:**
4. Build an audio player with three source formats (MP3, OGG, WAV) and proper type attributes.
5. Create a playlist page with three audio tracks and buttons to switch between them using JavaScript.
6. Design a notification sound panel with a button that plays a short alert sound.

**Advanced:**
7. Build a custom audio player with HTML, CSS, and JavaScript: custom play/pause button, seek slider, volume slider, current time/duration display, and a progress bar — all styled without native controls.
8. Create a soundboard application with at least 6 different sound effects, each triggered by a button, with the ability to stop all sounds, adjust master volume, and show which sound is currently playing.
