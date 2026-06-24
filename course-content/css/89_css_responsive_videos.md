## 89. CSS RWD Videos

## 📘 Introduction
Embedding videos responsively is essential in the age of online content. Whether you're hosting videos natively via `<video>` or embedding from YouTube/Vimeo, videos need to scale fluidly across devices without breaking layouts or overflowing containers. CSS provides several techniques — from simple `max-width` to the classic "padding-bottom hack" and modern `aspect-ratio` property.

## 🧠 Key Concepts
- **`video { max-width: 100%; height: auto; }`** – basic responsive video behavior
- **`aspect-ratio`** – CSS property that sets an intrinsic aspect ratio (modern solution)
- **Padding-bottom hack** – classic technique using `padding-bottom: 56.25%` (16:9) to create a proportional container
- **Responsive iframe embeds** – wrapping `<iframe>` in a container with aspect ratio control
- **`object-fit`** – controls how the video fills its box (cover, contain, fill)
- **`object-position`** – adjusts the video's alignment within its box

## 💻 Syntax

```html
<!-- Native video -->
<video controls class="responsive-video">
  <source src="video.mp4" type="video/mp4">
</video>
```

```css
/* Basic responsive video */
.responsive-video {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Modern aspect-ratio container for iframes */
.video-container {
  width: 100%;
  aspect-ratio: 16 / 9;
}
.video-container iframe {
  width: 100%;
  height: 100%;
}

/* Classic padding-bottom hack (16:9) */
.video-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 9 / 16 * 100 */
  height: 0;
  overflow: hidden;
}
.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Object-fit for native video */
video {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
```

## ✅ Example 1 - Basic: Responsive native video element

**Problem:** Display a native HTML5 video that scales down on mobile and never overflows its container.

**HTML:**
```html
<figure class="video-figure">
  <video controls poster="poster.jpg" class="rwd-video">
    <source src="tutorial.mp4" type="video/mp4">
    <source src="tutorial.webm" type="video/webm">
    Your browser does not support the video tag.
  </video>
  <figcaption>CSS Grid Tutorial</figcaption>
</figure>
```

**CSS:**
```css
.video-figure {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}
.rwd-video {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}
```

**Output:**
The video player scales down proportionally on narrow viewports and caps at 800px on wide screens. The poster image and controls remain functional at all sizes.

**Explanation:**
`max-width: 100%` prevents the video from exceeding its container. `height: auto` preserves the intrinsic aspect ratio. The `<video>` element's native controls remain interactive, and the two `<source>` elements provide format fallback.

## 🚀 Example 2 - Intermediate: Responsive YouTube iframe embed with aspect-ratio

**Problem:** Embed a YouTube video that maintains 16:9 aspect ratio at all viewport sizes.

**HTML:**
```html
<div class="embed-container">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video"
          allowfullscreen>
  </iframe>
</div>
```

**CSS:**
```css
/* Method 1: Modern aspect-ratio (Easiest) */
.embed-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  aspect-ratio: 16 / 9;
}
.embed-container iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

/* Method 2: Padding-bottom hack (Fallback for older browsers) */
@supports not (aspect-ratio: 16 / 9) {
  .embed-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
  }
  .embed-container iframe {
    position: absolute;
    top: 0;
    left: 0;
  }
}
```

**Output:**
A YouTube embed that always maintains 16:9 aspect ratio — no black bars, no overflow. On browsers supporting `aspect-ratio` (all modern browsers), it uses the clean modern syntax. On older browsers, the padding-bottom hack kicks in.

**Explanation:**
The `aspect-ratio: 16 / 9` property tells the browser to maintain this proportion automatically. The padding-bottom hack achieves the same effect by exploiting the fact that percentage padding is calculated relative to the element's width. The `@supports not` block provides a graceful fallback.

## 🏢 Real World Use Case
Any site that embeds video content — YouTube tutorials, Vimeo portfolios, course platforms like Udemy, news articles with video clips — needs responsive video embeds. The pattern is so common that most CSS frameworks include a `.embed-responsive` utility class.

## 🎯 Interview Questions

1. **Q:** Why does the padding-bottom hack work for responsive iframes?
   **A:** Percentage `padding-bottom` is calculated relative to the element's width. Setting `padding-bottom: 56.25%` (9/16) creates a box whose height is 56.25% of its width, forming a 16:9 aspect ratio container.

2. **Q:** What does `object-fit: cover` do on a `<video>` element?
   **A:** It scales the video to fill the element's entire box while preserving aspect ratio, cropping any overflow. The video fills the container but parts may be hidden.

3. **Q:** What is the modern CSS way to maintain aspect ratio?
   **A:** The `aspect-ratio` property: `aspect-ratio: 16 / 9`. It's supported in all modern browsers and requires no wrapper element.

4. **Q:** How do you make a video full-width but capped at a maximum size?
   **A:** Set `width: 100%; max-width: 1200px;` on the video or its container. The video scales to fill the viewport but stops growing at 1200px.

5. **Q:** Can the `<video>` element's `poster` attribute be responsive?
   **A:** The poster image itself should be optimized separately, but its display size follows the video element's responsive sizing. You can use a `<picture>` element as a poster by using a splash image technique with CSS background.

## ⚠ Common Errors / Mistakes

- Forgetting to remove iframe `width` and `height` attributes before applying CSS (they override CSS if present)
- Not nesting the iframe inside a container — iframes themselves don't respect `max-width: 100%` reliably
- Using fixed pixel height on video elements, causing overflow or broken aspect ratio
- Forgetting `border: 0` on iframes to remove the default 2px border
- Using the padding-bottom hack without `position: relative` on the container and `position: absolute` on the iframe

## 📝 Practice Exercises

**Beginner:**
1. Make a `<video>` element responsive using `max-width: 100%; height: auto;`.
2. Embed a YouTube iframe and set it to 100% width with a max-width of 960px.
3. Add `object-fit: cover` to a video and observe how it fills a fixed-height container.

**Intermediate:**
4. Use `aspect-ratio: 16 / 9` to create responsive video containers for three different iframe embeds.
5. Create a video hero section where the `<video>` background fills the entire viewport (100vw x 100vh) using `object-fit: cover`.
6. Build a responsive video gallery grid where each thumbnail is a 16:9 aspect ratio box with a play button overlay.

**Advanced:**
7. Implement a responsive video component with multiple `<source>` elements in different resolutions and a poster image, using the `<picture>` pattern for the poster.
8. Create a full-bleed video section that extends beyond its parent container's padding using negative margins, while maintaining 16:9 aspect ratio and being fully responsive across all viewports.
