## 26. HTML Iframes
## 📘 Introduction
An iframe (inline frame) embeds another HTML document within the current page. It is commonly used to display external content like YouTube videos, Google Maps, or other web pages. The `<iframe>` tag creates this embed.

## 🧠 Key Concepts
- `<iframe>` embeds a separate browsing context inside the current page
- `src` - URL of the page to embed
- `width` and `height` set dimensions
- `frameborder` (deprecated in HTML5, use CSS border instead)
- `sandbox` restricts what the embedded content can do (security)
- `allowfullscreen` enables fullscreen mode (e.g., for videos)
- `loading="lazy"` defers loading the iframe until near viewport
- `title` attribute improves accessibility
- `srcdoc` can embed inline HTML content

## 💻 Syntax
```html
<iframe src="https://example.com" width="600" height="400" title="Example"></iframe>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Embed a YouTube video on a webpage.

**Code:**
```html
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="YouTube video"
  allowfullscreen>
</iframe>
```

**Output:** A video player embedded in the page with play/pause controls.

**Explanation:** The YouTube embed URL format is `https://www.youtube.com/embed/VIDEO_ID`. The `allowfullscreen` attribute permits full-screen playback.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Embed a Google Map location with a sandbox for security.

**Code:**
```html
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1d3!2d-73.9857!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjQiTiA3M8KwNTknMTIuMCJX!5e0!3m2!1sen!2sus!4v1234567890"
  width="600"
  height="450"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
  sandbox="allow-scripts allow-same-origin"
  title="Google Map">
</iframe>
```

**Output:** An interactive Google Map centered on a location, with zoom and drag controls.

**Explanation:** The `sandbox` attribute restricts scripts (but allows same-origin interaction and scripts for map functionality). `loading="lazy"` defers loading.

## 🏢 Real World Use Case
Embedding YouTube/Vimeo videos on blogs and news articles. Google Maps on contact pages. Social media posts (tweets, Instagram). Payment iframes for secure credit card forms. Third-party widgets like calendars or forms.

## 🎯 Interview Questions (5 with answers)
**1. What is an iframe?**
An iframe (inline frame) embeds another HTML document within the current page, creating a nested browsing context.

**2. What is the `sandbox` attribute used for?**
The `sandbox` attribute restricts capabilities of the embedded content (e.g., disables forms, scripts, popups, navigation) for security. Values can selectively enable specific permissions.

**3. How do you embed a YouTube video using an iframe?**
Use `https://www.youtube.com/embed/VIDEO_ID` as the `src`. Include `allowfullscreen` for full-screen support.

**4. What is the `srcdoc` attribute?**
`srcdoc` allows embedding inline HTML content directly in the iframe, instead of loading from a `src` URL. It overrides `src` if both are present.

**5. What is a common security risk with iframes?**
Clickjacking - where an attacker embeds a legitimate site in an invisible iframe to trick users into clicking on it. Mitigation includes using `X-Frame-Options` header and the `sandbox` attribute.

## ⚠ Common Errors / Mistakes
- Not setting a `title` attribute (bad for accessibility)
- Embedding content without permission (violates terms of service)
- Overly restrictive or permissive `sandbox` values
- Forgetting to use HTTPS URLs (mixed content warnings)
- Not using `loading="lazy"` for off-screen iframes (performance)

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Embed a YouTube video of your choice using an iframe.
2. Embed a Google Map showing your city on a contact page.
3. Set the iframe width to 100% and height to 400px.

**Intermediate:**
4. Embed a Wikipedia article in an iframe with sandbox attributes that prevent scripts and forms.
5. Create a responsive iframe that maintains a 16:9 aspect ratio using CSS `aspect-ratio` or padding trick.
6. Use the `srcdoc` attribute to embed a simple inline HTML page inside an iframe without an external URL.

**Advanced:**
7. Build a tabbed interface where each tab loads a different URL into the same iframe.
8. Implement a secure payment form page that embeds a third-party payment iframe and uses `postMessage()` to communicate between the parent page and iframe.
