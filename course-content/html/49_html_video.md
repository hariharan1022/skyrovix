## 49. HTML Video
## 📘 Introduction
The HTML `<video>` element embeds video content directly in web pages without requiring third-party plugins like Flash. With native browser support for common formats and attributes for playback control, `<video>` enables seamless media integration, customization, and accessibility.

## 🧠 Key Concepts
- `<video>` element embeds video with `src` attribute or nested `<source>` elements
- **Controls:** `controls` attribute adds browser-native play/pause, volume, fullscreen, and seek controls
- **Autoplay:** `autoplay` starts playback automatically (often blocked by browsers without `muted`)
- **Loop:** `loop` restarts the video when it ends
- **Muted:** `muted` starts video with no audio output
- **Poster:** `poster` displays an image while video loads
- **Formats:** MP4 (H.264) is most compatible; WebM (VP8/VP9) for open-source; OGG (Theora) for legacy
- **Fallback:** Text between `<video>` tags shows when the element is not supported

## 💻 Syntax (HTML code)
```html
<video width="640" height="360" controls>
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <source src="video.ogv" type="video/ogg">
    Your browser does not support the video element.
</video>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Embed a promotional video with controls, poster image, and format fallbacks.

**Code:**
```html
<!DOCTYPE html>
<html>
<body>
    <h2>Product Demo</h2>

    <video width="640" height="360"
           controls
           poster="thumbnail.jpg"
           preload="metadata">

        <source src="demo.mp4" type="video/mp4">
        <source src="demo.webm" type="video/webm">
        <source src="demo.ogv" type="video/ogg">

        <p>Your browser does not support HTML5 video.
        <a href="demo.mp4">Download the video</a></p>
    </video>

    <p>Click play to watch our product demonstration.</p>
</body>
</html>
```

**Output:** A video player with native controls (play/pause, seek bar, volume, fullscreen). Before playing, the poster image thumbnail.jpg is displayed. If the browser can't play any source format, the fallback message with download link is shown.

**Explanation:** Multiple `<source>` elements provide format fallbacks — the browser uses the first format it supports. `preload="metadata"` loads only file info (not the full video) for faster page load. The poster gives visual context before playback.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Create a video banner with autoplay, loop, and muted attributes and no controls.

**Code:**
```html
<!DOCTYPE html>
<html>
<body>
    <h2>Hero Video Banner</h2>

    <div style="position: relative; width: 100%; max-width: 1000px; height: 400px; overflow: hidden;">
        <video autoplay loop muted playsinline
               style="width: 100%; height: 100%; object-fit: cover;">

            <source src="banner.mp4" type="video/mp4">
            <source src="banner.webm" type="video/webm">
            Your browser does not support background videos.
        </video>

        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                    color: white; text-align: center; text-shadow: 2px 2px 4px rgba(0,0,0,0.7);">
            <h1 style="font-size: 48px; margin: 0;">Welcome to Our Site</h1>
            <p style="font-size: 24px;">Discover amazing products</p>
        </div>
    </div>

    <p>This video loops silently as a background banner with overlaid text.</p>
</body>
</html>
```

**Output:** A full-width hero banner with a looping, muted, autoplaying video background. Text overlay is centered on top of the video. The video has no visible controls — it plays seamlessly as a decorative background.

**Explanation:** `autoplay` requires `muted` in most modern browsers to prevent unwanted audio. `playsinline` is necessary for iOS Safari to autoplay. `object-fit: cover` ensures the video fills the container without distortion. `loop` restarts playback infinitely.

## 🏢 Real World Use Case
Hero banners on landing pages use autoplay muted video for visual impact; e-commerce product pages show product demos; educational platforms embed lesson videos; social media feeds play video inline; video backgrounds on conference and event websites; tutorial sites with step-by-step video guides.

## 🎯 Interview Questions (5 with answers)
1. **Q:** Why does `autoplay` often not work without `muted`?
   **A:** Modern browsers restrict autoplay to prevent unwanted audio. Adding `muted` allows autoplay. Some browsers also require a user gesture before unmuted autoplay.

2. **Q:** What is the purpose of the `poster` attribute?
   **A:** The `poster` attribute specifies an image to display while the video is downloading or before the user clicks play. If omitted, the first frame of the video is shown (often a black frame).

3. **Q:** What video formats are most widely supported across browsers?
   **A:** MP4 (H.264 codec) has the broadest support across all browsers. WebM is supported by Chrome, Firefox, and Opera. OGG (Theora) is legacy and rarely needed.

4. **Q:** How do you provide multiple video formats for browser compatibility?
   **A:** Use multiple `<source>` elements inside `<video>`. The browser selects the first supported format. Order them MP4 first (broadest support), then WebM, then OGG as fallback.

5. **Q:** What does the `playsinline` attribute do?
   **A:** `playsinline` tells iOS Safari to play the video inline within the page rather than entering fullscreen mode automatically. It's required for autoplay on iOS.

## ⚠ Common Errors / Mistakes
- Forgetting `muted` when using `autoplay` (video won't start on most browsers)
- Not providing multiple format sources (MP4 only may not work on all browsers)
- Missing `type` attributes on `<source>` elements (browser may not recognize the format)
- Using `autoplay` without `playsinline` for iOS compatibility
- Not providing fallback content for unsupported browsers
- Setting both `controls` and `autoplay muted loop` on background videos (controls shouldn't be visible)

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Embed a video with controls, width 560, and height 315 using MP4 source.
2. Create a video element with autoplay, muted, and loop attributes.
3. Add a poster image to a video and provide fallback text for unsupported browsers.

**Intermediate:**
4. Build a video player with three source formats (MP4, WebM, OGG) and proper type attributes.
5. Create a full-width background video banner with overlay text and a semi-transparent gradient overlay on the video.
6. Design a video gallery page with three videos, each with custom poster images and preload="metadata".

**Advanced:**
7. Build a custom video player using HTML5 video API with JavaScript controls: custom play/pause button, seek bar, volume slider, speed selector, and current time display.
8. Create a responsive video page with multiple video qualities (360p, 720p, 1080p) using separate source files, a quality selector dropdown, and keyboard shortcuts (space for play/pause, arrows for seek).
