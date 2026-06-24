# 51. HTML YouTube

## 📘 Introduction
Embedding YouTube videos in web pages allows you to integrate rich video content directly into your site. YouTube provides an iframe-based embed API with configurable parameters to control playback behavior, appearance, and privacy settings.

## 🧠 Key Concepts
- **iframe**: HTML element used to embed external content (YouTube videos)
- **Video ID**: Unique identifier for each YouTube video (found in the URL)
- **YouTube Player Parameters**: Query string parameters passed in the iframe `src` URL to control player behavior
- **Autoplay**: Starts video automatically when page loads (`autoplay=1`)
- **Mute**: Mutes video by default (`mute=1`), required for autoplay to work in modern browsers
- **Loop**: Repeats video indefinitely (`loop=1`), requires `playlist` parameter with the video ID
- **Playlist**: Comma-separated list of video IDs to play sequentially
- **rel**: Controls whether related videos from the same channel (0) or any channel (1) are shown
- **controls**: Hides or shows player controls (0 = hide, 1 = show)
- **showinfo**: (Deprecated) Previously controlled video title and uploader display

## 💻 Syntax
```html
<!-- Basic YouTube Embed -->
<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  title="YouTube video player" 
  frameborder="0" 
  allowfullscreen>
</iframe>

<!-- With parameters -->
<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=VIDEO_ID&rel=0&controls=1" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>
```

## ✅ Example 1 - Basic (Standard Video Embed)

**Problem:** Embed a YouTube video on a blog post about space exploration.

```html
<article>
  <h1>Exploring the Cosmos</h1>
  <p>Watch this amazing documentary about the James Webb Space Telescope.</p>
  <iframe 
    width="100%" 
    height="400" 
    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
    title="Space Documentary" 
    frameborder="0" 
    allowfullscreen>
  </iframe>
</article>
```

**Output:** A responsive video player displaying the YouTube video with standard controls, full-screen capability, and suggested related videos at the end.

**Explanation:** The `src` contains the YouTube embed URL with the video ID. `width` and `height` control dimensions. `allowfullscreen` enables full-screen mode. The iframe is responsive when percentage-based width is used.

## 🚀 Example 2 - Intermediate (Autoplay with Loop and Custom Controls)

**Problem:** Create a background hero video section that autoplays, muted, and loops seamlessly.

```html
<section style="position: relative; height: 100vh; overflow: hidden;">
  <iframe 
    width="100%" 
    height="100%" 
    src="https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=1&mute=1&loop=1&playlist=jNQXAC9IVRw&controls=0&modestbranding=1&rel=0"
    title="Background Video"
    frameborder="0"
    allow="autoplay; fullscreen"
    style="position: absolute; top: 0; left: 0; pointer-events: none;"
    allowfullscreen>
  </iframe>
  <div style="position: relative; z-index: 1; color: white; text-align: center; padding-top: 40vh;">
    <h1>Welcome to Our Site</h1>
    <p>Experience something amazing</p>
  </div>
</section>
```

**Output:** The video plays as a fullscreen looping background with no visible controls, while text content overlays on top.

**Explanation:** 
- `autoplay=1` starts playback immediately (requires `mute=1`)
- `loop=1` with `playlist=VIDEO_ID` enables seamless looping
- `controls=0` hides the player UI
- `modestbranding=1` minimizes YouTube logo
- `rel=0` restricts related videos to the same channel
- `pointer-events: none` prevents user interaction with the iframe

## 🏢 Real World Use Case
**Online Education Platforms:** Embedding course introduction videos, lecture recordings, and tutorial content. Parameters like `rel=0` keep students focused on course content. `controls=1` allows pause/rewind. Playlists enable auto-playing through a series of lessons. Autoplay with mute is useful for video thumbnails that start playing on hover.

## 🎯 Interview Questions
1. **Q:** Why is `mute=1` required for `autoplay=1` to work in modern browsers?  
   **A:** Browsers block autoplay with sound to prevent intrusive playback. Muting satisfies autoplay policies.

2. **Q:** How do you loop a single YouTube video?  
   **A:** Use `loop=1` together with `playlist=VIDEO_ID` (same as the video ID). The `playlist` parameter is required for looping to work.

3. **Q:** What is the purpose of the `rel` parameter?  
   **A:** It controls which related videos are shown after playback ends. `rel=0` shows videos from the same channel; `rel=1` shows from any channel.

4. **Q:** Explain the difference between `showinfo` (deprecated) and `modestbranding`.  
   **A:** `showinfo` previously controlled the video title overlay (deprecated in 2018). `modestbranding` minimizes the YouTube logo in the player without hiding it entirely.

5. **Q:** What attributes in the `allow` attribute are needed for YouTube embeds?  
   **A:** `accelerometer`, `autoplay`, `clipboard-write`, `encrypted-media`, `gyroscope`, `picture-in-picture` – these enable full functionality.

## ⚠ Common Errors / Mistakes
- Forgetting `mute=1` when using `autoplay=1` (autoplay will not work)
- Omitting `playlist` parameter when trying to loop a single video
- Using `controls=0` without considering accessibility (users cannot pause or adjust volume)
- Embedding the watch URL (`youtube.com/watch?v=ID`) instead of the embed URL (`youtube.com/embed/ID`)
- Not including `allowfullscreen` attribute
- Hardcoding dimensions without making the embed responsive (use CSS `max-width: 100%` with aspect-ratio containers)
- Forgetting to add `frameborder="0"` for a clean appearance

## 📝 Practice Exercises

**Beginner:**
1. Embed a YouTube video of your choice with width 640px and height 360px. Ensure fullscreen is enabled.
2. Create a video gallery page with three YouTube videos in a grid layout using CSS flexbox.
3. Embed a video with controls hidden and branding minimized. Add a custom HTML "Play" button overlay that loads the video.

**Intermediate:**
4. Build a responsive video section that maintains a 16:9 aspect ratio at all screen sizes using CSS `aspect-ratio` or padding trick.
5. Create a playlist player that cycles through 3 videos automatically using the `playlist` parameter. Add custom navigation buttons to skip between videos.
6. Build a page with a YouTube embed that starts at a specific timestamp (using `start` parameter) and ends at another (`end` parameter).

**Advanced:**
7. Implement a custom YouTube player using the YouTube IFrame API (JavaScript) with custom play/pause, seek, and volume controls that communicate with the embedded player.
8. Build a video background hero section that: loads a static image thumbnail on mobile, detects user preference for reduced motion (`prefers-reduced-motion`), and gracefully degrades if the embed fails to load.
