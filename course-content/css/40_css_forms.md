## 40. CSS Website Layout

## 📘 Introduction
CSS website layout combines all the techniques you've learned — positioning, display, flexbox, grid, alignment, and responsiveness — to build complete page structures. Modern CSS Grid and Flexbox make complex layouts simpler and more maintainable than legacy float-based approaches.

## 🧠 Key Concepts
- **Styling inputs**: `[type="text"]`, `[type="email"]`, `[type="password"]`, `textarea`, `select`, `button`
- **Styling textareas**: Resize control (`resize`), scroll behavior, font consistency
- **Styling selects**: Appearance reset (`appearance: none`), custom dropdown arrow
- **Styling buttons**: Hover, active, disabled states, icon integration
- **Form layout**: Label-input alignment using grid or flexbox
- **Validation states**: `:valid`, `:invalid`, `:required`, `:optional`, `:user-invalid` pseudo-classes
- **Floating labels**: Labels that animate above the input when focused or filled
- **Custom checkboxes/radios**: Hiding default inputs and styling labels with `::before`/`::after`

## 💻 Syntax

```css
/* Reset input styling */
input, textarea, select, button {
  font-family: inherit;
  font-size: inherit;
}

/* Custom select */
select {
  appearance: none;
  background: url('arrow.svg') no-repeat right 10px center;
  padding-right: 30px;
}

/* Floating label */
.form-group {
  position: relative;
}
.form-group input:focus + label,
.form-group input:not(:placeholder-shown) + label {
  top: -10px;
  font-size: 0.8em;
  color: #3498db;
}

/* Validation states */
input:valid { border-color: #2ecc71; }
input:invalid { border-color: #e74c3c; }
input:user-invalid { border-color: #e74c3c; }

/* Custom checkbox */
input[type="checkbox"] {
  position: absolute;
  opacity: 0;
}
input[type="checkbox"] + label::before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
}
input[type="checkbox"]:checked + label::before {
  background: #3498db;
  border-color: #3498db;
}
input[type="checkbox"]:checked + label::after {
  content: "✓";
  position: absolute;
  color: white;
}
```

## ✅ Example 1 - Basic (Styled Registration Form)

**Problem:** Build a well-styled registration form with custom inputs, select dropdown, textarea, and validation states.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html>
<head>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background: linear-gradient(135deg, #667eea, #764ba2);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  form {
    background: white;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 15px 50px rgba(0,0,0,0.2);
    width: 100%;
    max-width: 520px;
  }

  form h2 {
    color: #2c3e50;
    margin-bottom: 8px;
    font-size: 1.8em;
  }

  form > p {
    color: #888;
    margin-bottom: 25px;
    font-size: 0.9em;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    margin-bottom: 6px;
    font-size: 0.9em;
    font-weight: 600;
    color: #444;
  }

  /* Base input styles */
  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 12px 14px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1em;
    font-family: inherit;
    transition: border-color 0.3s, box-shadow 0.3s;
    outline: none;
    background: #fafafa;
  }

  /* Focus state */
  .form-group input:focus,
  .form-group textarea:focus,
  .form-group select:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102,126,234,0.15);
    background: white;
  }

  /* Valid state */
  .form-group input:valid:not(:placeholder-shown),
  .form-group textarea:valid:not(:placeholder-shown) {
    border-color: #2ecc71;
  }

  /* Invalid state */
  .form-group input:invalid:not(:placeholder-shown),
  .form-group textarea:invalid:not(:placeholder-shown) {
    border-color: #e74c3c;
  }

  /* Custom select */
  .form-group select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23666' stroke-width='2' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 40px;
    cursor: pointer;
  }

  /* Textarea */
  .form-group textarea {
    resize: vertical;
    min-height: 100px;
  }

  /* Button */
  button[type="submit"] {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
  }

  button[type="submit"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102,126,234,0.4);
  }

  button[type="submit"]:active {
    transform: translateY(0);
  }

  button[type="submit"]:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  /* Checkbox styling */
  .checkbox-group {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
  }

  .checkbox-group input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .checkbox-group label {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-weight: normal;
    margin-bottom: 0;
  }

  .checkbox-group label::before {
    content: "";
    width: 22px;
    height: 22px;
    border: 2px solid #ccc;
    border-radius: 5px;
    flex-shrink: 0;
    transition: all 0.3s;
  }

  .checkbox-group input[type="checkbox"]:checked + label::before {
    background: #667eea;
    border-color: #667eea;
  }

  .checkbox-group input[type="checkbox"]:checked + label::after {
    content: "✓";
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 14px;
    font-weight: bold;
  }

  .checkbox-group input[type="checkbox"]:focus-visible + label::before {
    box-shadow: 0 0 0 3px rgba(102,126,234,0.3);
  }

  /* Required asterisk */
  .form-group label:has(+ input[required])::after,
  .form-group label:has(+ textarea[required])::after {
    content: " *";
    color: #e74c3c;
  }
</style>
</head>
<body>
  <form>
    <h2>Create Account</h2>
    <p>Join our community — fill in the details below.</p>

    <div class="form-group">
      <label for="name">Full Name</label>
      <input type="text" id="name" placeholder="John Doe" required>
    </div>

    <div class="form-group">
      <label for="email">Email Address</label>
      <input type="email" id="email" placeholder="john@example.com" required>
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="Min. 8 characters" required minlength="8">
    </div>

    <div class="form-group">
      <label for="country">Country</label>
      <select id="country">
        <option>United States</option>
        <option>Canada</option>
        <option>United Kingdom</option>
        <option>Australia</option>
        <option>Other</option>
      </select>
    </div>

    <div class="form-group">
      <label for="bio">Bio</label>
      <textarea id="bio" placeholder="Tell us about yourself..." rows="4"></textarea>
    </div>

    <div class="form-group checkbox-group">
      <input type="checkbox" id="terms" required>
      <label for="terms">I agree to the Terms of Service and Privacy Policy</label>
    </div>

    <button type="submit">Create Account</button>
  </form>
</body>
</html>
```

**Output:** A modern, fully styled registration form with custom select arrow, validation feedback (green/red borders), custom checkbox, focused input glow, and a gradient submit button with hover effect.

**Explanation:** Inputs use `:valid`/`:invalid` with `:not(:placeholder-shown)` to show validation only after user interaction. The select uses `appearance: none` + SVG arrow. The checkbox hides the default input and uses `::before`/`::after` for custom styling. The button uses a gradient background with hover transform.

## 🚀 Example 2 - Intermediate (Contact Form with Floating Labels)

**Problem:** Build a contact form with floating labels that animate above the input field when focused or filled, plus custom validation messages and a styled textarea.

**HTML+CSS Code:**
```html
<!DOCTYPE html>
<html>
<head>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background: #f0f0f0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  form {
    background: white;
    padding: 50px 40px 40px;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 500px;
  }

  form h2 {
    color: #2c3e50;
    margin-bottom: 8px;
    font-size: 1.8em;
    text-align: center;
  }

  form > p {
    text-align: center;
    color: #888;
    margin-bottom: 30px;
    font-size: 0.9em;
  }

  .form-group {
    position: relative;
    margin-bottom: 25px;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 16px 14px 8px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1em;
    font-family: inherit;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
    background: transparent;
  }

  .form-group textarea {
    resize: vertical;
    min-height: 120px;
    padding-top: 20px;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52,152,219,0.12);
  }

  /* Floating label */
  .form-group label {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1em;
    color: #999;
    pointer-events: none;
    transition: all 0.3s ease;
    background: white;
    padding: 0 4px;
  }

  /* Textarea label position adjustment */
  .form-group textarea ~ label {
    top: 18px;
    transform: none;
  }

  /* Float label on focus */
  .form-group input:focus ~ label,
  .form-group textarea:focus ~ label {
    top: -10px;
    left: 10px;
    font-size: 0.8em;
    color: #3498db;
  }

  /* Float label when filled */
  .form-group input:not(:placeholder-shown) ~ label,
  .form-group textarea:not(:placeholder-shown) ~ label {
    top: -10px;
    left: 10px;
    font-size: 0.8em;
    color: #3498db;
  }

  /* Validation indicators */
  .form-group input:focus:valid,
  .form-group textarea:focus:valid {
    border-color: #2ecc71;
  }
  .form-group input:focus:valid ~ label,
  .form-group textarea:focus:valid ~ label {
    color: #2ecc71;
  }

  .form-group input:focus:invalid,
  .form-group textarea:focus:invalid {
    border-color: #e74c3c;
  }
  .form-group input:focus:invalid ~ label,
  .form-group textarea:focus:invalid ~ label {
    color: #e74c3c;
  }

  /* Submit button */
  button {
    width: 100%;
    padding: 14px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
  }

  button:hover {
    background: #2980b9;
    transform: translateY(-2px);
  }

  button:active {
    transform: translateY(0);
  }

  /* Responsive */
  @media (max-width: 480px) {
    form {
      padding: 30px 20px;
    }
  }
</style>
</head>
<body>
  <form>
    <h2>Get in Touch</h2>
    <p>We'd love to hear from you — send us a message.</p>

    <div class="form-group">
      <input type="text" id="name" placeholder=" " required>
      <label for="name">Your Name</label>
    </div>

    <div class="form-group">
      <input type="email" id="email" placeholder=" " required>
      <label for="email">Email Address</label>
    </div>

    <div class="form-group">
      <input type="text" id="subject" placeholder=" ">
      <label for="subject">Subject</label>
    </div>

    <div class="form-group">
      <textarea id="message" placeholder=" " rows="5"></textarea>
      <label for="message">Your Message</label>
    </div>

    <button type="submit">Send Message</button>
  </form>
</body>
</html>
```

**Output:** A clean contact form where labels float above the input when focused or typed into. Validation colors (green/red) appear on the border and label during focus.

**Explanation:** The label is absolutely positioned inside the relative `.form-group`. On focus, `input:focus ~ label` moves the label up (`top: -10px`) and reduces font size. `:not(:placeholder-shown)` keeps the label floated when the input has content (note: placeholder must be a space `" "` for this to work). Focus-within validation colors the label and border.

## 🏢 Real World Use Case
User registration forms, contact forms, payment checkout forms, login/signup pages, survey forms, newsletter signups, job application forms, and any data-collection interface. Modern UX patterns like floating labels are widely used by SaaS products and design systems.

## 🎯 Interview Questions

1. **How do you reset the default appearance of a `<select>` element?**
   *Use `appearance: none` to remove the default OS styling. Then add a custom background arrow using `background-image: url(...)` or an SVG data URI. Adjust `padding-right` to prevent text from overlapping the arrow.*

2. **How can you style the placeholder text in an input?**
   *Use the `::placeholder` pseudo-element. For example: `input::placeholder { color: #aaa; font-style: italic; }`. Note that only a subset of CSS properties applies to placeholders.*

3. **What is the difference between `:valid`, `:invalid`, and `:user-invalid`?**
   *`:valid` and `:invalid` apply based on the element's validation state immediately (even on page load). `:user-invalid` (CSS Selectors Level 4) applies only after the user has interacted with the element, preventing premature error styling.*

4. **How do you create a floating label effect with pure CSS?**
   *Use `position: relative` on the form group and `position: absolute` on the label. On input focus (`input:focus ~ label`) or when the input has content (`input:not(:placeholder-shown) ~ label`), move the label up and reduce its font size. Requires a placeholder (even a space) in the input.*

5. **How do you style a custom checkbox or radio button?**
   *Hide the default input (`opacity: 0; position: absolute`) and use the adjacent `<label>` with `::before` (for the box/circle) and `::after` (for the checkmark/dot). Use `input:checked + label::before` and `input:checked + label::after` for the checked state.*

## ⚠ Common Errors / Mistakes

- **Forgetting `font-family: inherit` on inputs**: Form inputs don't inherit font properties by default, causing mismatch with page typography
- **Using `:valid`/`:invalid` too early**: These apply on page load; combine with `:not(:placeholder-shown)` or use `:user-invalid` to avoid premature feedback
- **Custom select not showing the arrow in some browsers**: Always include `appearance: none` with vendor prefixes (`-webkit-appearance`, `-moz-appearance`)
- **Floating label breaking with autofill**: Browsers may not trigger `:not(:placeholder-shown)` correctly for autofilled fields; use `:-webkit-autofill` selector as a fallback
- **Not handling `resize` on textareas**: Textareas can be resized in ways that break layouts; use `resize: vertical` to restrict to vertical only, or `resize: none` to disable

## 📝 Practice Exercises

### Beginner
1. Style a text input with a 2px solid border, rounded corners (6px), and padding of 12px. Add a focus state that changes the border color to blue.
2. Style a submit button with a green background, white text, and hover effect that darkens the green.
3. Use `::placeholder` to style placeholder text in an input to be italic and light gray.

### Intermediate
4. Build a login form with email and password inputs, custom checkbox for "Remember me", and a styled submit button. Add `:focus` styles and validation states.
5. Create a custom select dropdown styled with `appearance: none` and a custom SVG arrow icon (using a data URI). Add focus and hover states.
6. Build a form with floating labels for all inputs (name, email, phone, message). Ensure labels move up on focus and when content is present.

### Advanced
7. Build a complete checkout form with sections for billing address, shipping address, payment details, and order summary. Use grid/flexbox for layout, custom radio buttons for payment method selection, floating labels, real-time validation styling, and responsive design. Ensure all form elements are accessible with proper `<label>` associations and `aria-*` attributes.
8. Create a multi-step form wizard (Step 1: Personal Info, Step 2: Account Details, Step 3: Confirmation) using only CSS (checkbox hack for step navigation). Each step should have styled form elements, validation indicators, and animated transitions between steps. Include a progress indicator showing the current step.
