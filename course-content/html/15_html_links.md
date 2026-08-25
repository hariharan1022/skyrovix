# 15. HTML Links

## 📘 Introduction

Links (or hyperlinks) are what make the World Wide Web "web-like" by connecting documents and resources together. The `<a>` (anchor) tag is used to create hyperlinks in HTML. Links can connect to other web pages, files, email addresses, specific sections within the same page, or even trigger phone calls. The `href` attribute specifies the destination URL. The `target` attribute controls where the linked document opens (same tab, new tab, or frame). Understanding absolute vs relative URLs is essential for navigating between pages on the same site vs external sites. Bookmark links (using `id` attributes) allow jumping to specific sections within a page. `mailto:` links open the user's email client. This module covers all types of links and best practices for creating accessible, functional navigation.

## 🧠 Key Concepts

- **The `<a>` Tag:** The anchor tag creates hyperlinks. It requires the `href` attribute to specify the destination.
- **`href` Attribute:** Specifies the URL. Can be absolute (`https://example.com`), relative (`/about.html`), or special (`mailto:`, `tel:`, `#id`).
- **`target` Attribute:** Controls where to open the link. `_self` (same tab, default), `_blank` (new tab/window), `_parent` (parent frame), `_top` (full body).
- **Absolute URLs:** Full web address including protocol and domain. Used for external sites.
- **Relative URLs:** Path relative to the current page. Used for internal site navigation.
- **Bookmark Links:** `href="#section-id"` scrolls to an element with `id="section-id"` on the same page.
- **mailto Links:** `href="mailto:email@example.com"` opens the default email client.
- **tel Links:** `href="tel:+1234567890"` initiates a phone call on mobile devices.
- **Button as Link:** Use CSS to style an `<a>` tag as a button, or wrap a `<button>` in a form, or use JavaScript.

| Link Type | href Value | Opens |
|-----------|------------|-------|
| Absolute | `https://example.com/page` | External website |
| Relative | `about.html` or `./about.html` | Same site page |
| Root-relative | `/about.html` | From site root |
| Bookmark | `#section-name` | Same page section |
| Email | `mailto:user@example.com` | Email client |
| Phone | `tel:+1234567890` | Phone dialer |

## 💻 Syntax

```html
<!-- Basic link -->
<a href="https://www.example.com">Visit Example</a>

<!-- Open in new tab -->
<a href="https://www.example.com" target="_blank">Open in New Tab</a>

<!-- Relative link -->
<a href="/about.html">About Us</a>

<!-- Bookmark link (scolles to element with id="contact") -->
<a href="#contact">Jump to Contact Section</a>

<!-- Email link -->
<a href="mailto:info@example.com">Send Email</a>

<!-- Phone link -->
<a href="tel:+1234567890">Call Us</a>

<!-- Link with title tooltip -->
<a href="https://example.com" title="Go to Example website">Example</a>
```

- `href` is the most important attribute—it defines the link destination.
- `target="_blank"` opens the link in a new tab/window.
- `title` adds a tooltip that appears on hover.
- Bookmark links require a matching `id` attribute on the target element.
- `mailto:` and `tel:` use special URL schemes.

## ✅ Example 1 - Basic

**Problem:** Create a page with different types of links.

**Code:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>HTML Links Demo</title>
</head>
<body>
  <h1>Link Examples</h1>

  <h2>External Link</h2>
  <p>Visit <a href="https://www.w3schools.com" target="_blank">W3Schools</a> (opens in new tab).</p>

  <h2>Relative Link</h2>
  <p>Go to our <a href="about.html">About Page</a>.</p>

  <h2>Email Link</h2>
  <p>Contact us at <a href="mailto:info@skyrovix.com">info@skyrovix.com</a>.</p>

  <h2>Phone Link</h2>
  <p>Call <a href="tel:+1234567890">+1 (234) 567-890</a>.</p>

  <h2>Link with Tooltip</h2>
  <p><a href="https://www.google.com" title="Go to Google Search">Google</a></p>
</body>
</html>
```

**Output:** A page with five different link examples, each demonstrating a different link type.

**Explanation:** Each `<a>` tag uses a different `href` value. `target="_blank"` opens W3Schools in a new tab. The `mailto:` link launches the email client. The `tel:` link initiates a call on mobile. The `title` attribute shows a tooltip on hover.

## 🚀 Example 2 - Intermediate

**Problem:** Create a page with a navigation menu, bookmark links, and a styled button link.

**Code:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Navigation with Links</title>
</head>
<body>
  <header>
    <h1>Skyrovix Academy</h1>
    <nav>
      <a href="index.html">Home</a> |
      <a href="courses.html">Courses</a> |
      <a href="#features">Features</a> |
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main>
    <section id="intro">
      <h2>Welcome</h2>
      <p>Learn web development with our expert-led courses.</p>
      <a href="signup.html" style="background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
        Get Started Free
      </a>
    </section>

    <section id="features" style="margin-top: 400px;">
      <h2>Features</h2>
      <ul>
        <li>Interactive lessons</li>
        <li>Expert mentors</li>
        <li>Certificate on completion</li>
      </ul>
      <a href="#intro">Back to Top</a>
    </section>

    <section id="contact" style="margin-top: 400px;">
      <h2>Contact Us</h2>
      <p>Email: <a href="mailto:hello@skyrovix.com">hello@skyrovix.com</a></p>
      <p>Phone: <a href="tel:+11234567890">+1 (123) 456-7890</a></p>
      <p>Follow us on <a href="https://twitter.com/skyrovix" target="_blank">Twitter</a></p>
      <a href="#intro">Back to Top</a>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Skyrovix Academy. <a href="privacy.html">Privacy Policy</a></p>
  </footer>
</body>
</html>
```

**Output:** A full page with navigation links, a styled "Get Started" button link, bookmark links that scroll to sections, email/phone links, external link, and footer links.

**Explanation:** The navigation includes both relative page links (`index.html`, `courses.html`) and bookmark links (`#features`, `#contact`). The "Get Started" `<a>` tag is styled with CSS to look like a button. The "Back to Top" links use `#intro` to scroll back up. Sections have `margin-top: 400px` to demonstrate the scrolling behavior.

## 🏢 Real World Use Case

- **E-commerce Navigation (Amazon, eBay):** Use relative URLs for category links (`/electronics/phones`), absolute URLs for partner sites, bookmark links for product sections (`#reviews`, `#specs`), and `mailto:` links for seller contact.
- **Single Page Applications (React, Angular):** Use bookmark links (`#section-id`) for smooth scrolling within single-page sites. Navigation links use hash-based routing (e.g., `#home`, `#about`, `#contact`).
- **Marketing Landing Pages (Unbounce, Leadpages):** Use styled `<a>` tags as CTA (Call to Action) buttons. Links include `mailto:` for newsletter signups, `tel:` for phone calls, and `target="_blank"` for partner referral links.

## 🎯 Interview Questions

**1. What is the difference between an absolute URL and a relative URL?**
Absolute URL includes the full path with protocol and domain (e.g., `https://example.com/page.html`). Relative URL is relative to the current page (e.g., `about.html` or `./about.html`). Use absolute for external sites, relative for internal navigation.

**2. What does `target="_blank"` do and why should you be careful with it?**
It opens the linked document in a new tab/window. Be careful because it can create a security vulnerability (tabnabbing). Always add `rel="noopener noreferrer"` for security: `<a href="..." target="_blank" rel="noopener noreferrer">`.

**3. How do you create a bookmark link that jumps to a specific section on the same page?**
Give the target element an `id` attribute (e.g., `<section id="features">`). Create a link with `href="#features"`. Clicking the link scrolls to that element.

**4. What is the purpose of the `mailto:` URL scheme?**
`mailto:` opens the user's default email client with a new message addressed to the specified email. You can also add parameters: `href="mailto:user@example.com?subject=Hello&body=Message"`.

**5. How can you style an `<a>` tag to look like a button?**
Use CSS: `display: inline-block; padding: 10px 20px; background-color: #3498db; color: white; text-decoration: none; border-radius: 5px; cursor: pointer;`. You can also add hover effects with the `:hover` pseudo-class.

## ⚠ Common Errors / Mistakes

**Error 1: Forgetting `https://` in External Links**
```html
<a href="www.google.com">Google</a>
```
- **Reason:** Without a protocol, the browser treats it as a relative link.
- **Fix:** `<a href="https://www.google.com">Google</a>`

**Error 2: Not Using `rel="noopener"` with `target="_blank"`**
```html
<a href="https://example.com" target="_blank">Visit</a>
```
- **Reason:** Security vulnerability (tabnabbing) where the new page can access `window.opener` to redirect the original page.
- **Fix:** `<a href="https://example.com" target="_blank" rel="noopener noreferrer">Visit</a>`

**Error 3: Using Empty `href` Instead of Bookmark Links**
```html
<a href="">Refresh Page</a>
```
- **Reason:** An empty `href` refreshes the current page, which is unexpected for users.
- **Fix:** Use `href="#"` (goes to top) or `href="javascript:void(0)"` (does nothing).

## 📝 Practice Exercises

**Beginner:**
1. Create a page with three links: one to `https://www.google.com`, one to `https://www.wikipedia.org` with `target="_blank"`, and one with a `title` tooltip.
2. Create a `mailto:` link that opens an email to `test@example.com` with subject "Hello".
3. Create a phone link using `tel:` that displays a phone number and initiates a call on mobile.

**Intermediate:**
4. Build a navigation bar with four relative links (Home, About, Services, Contact). Style the links with inline CSS to remove underline and add padding.
5. Create a single-page website with three sections (About, Services, Contact). Use bookmark links in the navigation to jump to each section.
6. Design a "Back to Top" link that appears at the bottom of a long page and scrolls to the top when clicked.

**Advanced:**
7. Create a complete multi-page mini-website with: a homepage that links to About and Contact pages (relative links), external links to social media (with `target="_blank"` and `rel="noopener"`), bookmark links on the About page for team members, `mailto:` links for contact, and `tel:` links in the footer. The navigation should be consistent across all pages.
8. Build a single-page landing page for a product that includes: a sticky navigation with bookmark links to sections (Features, Pricing, Testimonials, Contact), styled CTA buttons (using `<a>` tags), social media links with icons, a `mailto:` link for sales inquiries, and `tel:` link for support. All links should have proper accessibility attributes (`aria-label`).
