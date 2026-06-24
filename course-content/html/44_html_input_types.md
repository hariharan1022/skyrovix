## 44. HTML Input Types
## 📘 Introduction
HTML5 introduced numerous input types that enhance form functionality, validation, and user experience. Each `<input type>` serves a specific data type and triggers appropriate mobile keyboards, native date pickers, color pickers, and built-in browser validation.

## 🧠 Key Concepts
- **text:** Standard single-line text input
- **password:** Masked text for sensitive data
- **submit:** Triggers form submission
- **reset:** Resets form to default values
- **radio:** Single selection from multiple options
- **checkbox:** Multiple independent selections
- **button:** Generic clickable button (no default behavior)
- **color:** Native color picker
- **date:** Date picker (YYYY-MM-DD format)
- **email:** Email with built-in validation and mobile email keyboard
- **file:** File selection with optional accept filter
- **hidden:** Invisible field for passing data
- **number:** Numeric input with step/min/max controls and spinner
- **range:** Slider for approximate numeric values
- **search:** Search field with clear button on some browsers
- **tel:** Telephone input (mobile shows numeric keypad)
- **url:** URL input with validation and mobile keyboard

## 💻 Syntax (HTML code)
```html
<input type="text" name="username">
<input type="password" name="pass">
<input type="email" name="email">
<input type="number" name="age" min="0" max="150">
<input type="date" name="birthday">
<input type="color" name="favcolor">
<input type="range" name="volume" min="0" max="100">
<input type="file" name="resume">
<input type="hidden" name="userid" value="123">
<input type="radio" name="gender" value="male">
<input type="checkbox" name="subscribe" value="yes">
<input type="search" name="q">
<input type="tel" name="phone">
<input type="url" name="website">
<input type="submit" value="Send">
<input type="reset" value="Clear">
<input type="button" value="Click Me">
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Create a registration form using basic input types.

**Code:**
```html
<!DOCTYPE html>
<html>
<body>
    <h2>Registration</h2>
    <form action="register.php" method="POST">
        <p>
            <label>Name: <input type="text" name="name" required></label>
        </p>
        <p>
            <label>Password: <input type="password" name="pass" required></label>
        </p>
        <p>
            <label>Email: <input type="email" name="email" required></label>
        </p>
        <p>
            <label>Age: <input type="number" name="age" min="1" max="120"></label>
        </p>
        <p>
            <label>Birthday: <input type="date" name="dob"></label>
        </p>
        <p>
            <label>Phone: <input type="tel" name="phone"></label>
        </p>
        <p>
            <input type="submit" value="Register">
            <input type="reset" value="Clear">
        </p>
    </form>
</body>
</html>
```

**Output:** A registration form with text, password (masked), email (validates @), number (with spinner arrows), date (native date picker), tel (numeric keyboard on mobile), submit, and reset buttons.

**Explanation:** Each input type provides specialized behavior. Email validates format client-side, number restricts to numeric input, date opens a calendar picker, and password hides characters — all without JavaScript.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Build a product feedback form with radio, checkbox, range, color, file, search, and hidden inputs.

**Code:**
```html
<!DOCTYPE html>
<html>
<body>
    <h2>Product Feedback</h2>
    <form action="feedback.php" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="product_id" value="101">

        <p>
            <label>Search product: <input type="search" name="search" placeholder="Type to search..."></label>
        </p>

        <p>Rating:
            <input type="range" name="rating" min="1" max="5" value="3">
        </p>

        <p>Satisfaction:
            <label><input type="radio" name="satisfaction" value="happy"> Happy</label>
            <label><input type="radio" name="satisfaction" value="neutral"> Neutral</label>
            <label><input type="radio" name="satisfaction" value="unhappy"> Unhappy</label>
        </p>

        <p>Features liked:
            <label><input type="checkbox" name="features" value="design"> Design</label>
            <label><input type="checkbox" name="features" value="speed"> Speed</label>
            <label><input type="checkbox" name="features" value="price"> Price</label>
        </p>

        <p>
            <label>Favorite color: <input type="color" name="favcolor"></label>
        </p>

        <p>
            <label>Screenshot: <input type="file" name="screenshot" accept="image/png, image/jpeg"></label>
        </p>

        <p>
            <label>Website: <input type="url" name="website"></label>
        </p>

        <p>
            <input type="submit" value="Submit Feedback">
        </p>
    </form>
</body>
</html>
```

**Output:** A feedback form with a search field (shows clear button), range slider (1-5), radio buttons (single choice), checkboxes (multiple choice), color picker, file upload with image filter, URL validation, and a hidden product_id field.

**Explanation:** Hidden inputs pass data without user interaction. Range creates a slider. Color opens a native picker. File accepts restricted types. URL validates format. Radio groups enforce single selection by sharing the same `name`.

## 🏢 Real World Use Case
E-commerce checkout uses `hidden` for order IDs; registration forms use `email`, `password`, `tel`; search bars use `search`; surveys use `radio`, `checkbox`, `range`; settings pages use `color` for theme, `number` for quantities, `date` for scheduling.

## 🎯 Interview Questions (5 with answers)
1. **Q:** What input type would you use for a color picker?
   **A:** `<input type="color">` opens a native color picker dialog and returns a hex color value (e.g., `#ff0000`).

2. **Q:** How does `type="email"` validate input?
   **A:** It checks that the value contains a valid email format (text@domain.extension) using browser-side pattern matching, without requiring JavaScript.

3. **Q:** What is the difference between `type="submit"` and `type="button"`?
   **A:** `submit` triggers form submission. `button` does nothing by default — it requires JavaScript to handle click events.

4. **Q:** When would you use `type="hidden"`?
   **A:** To pass data with the form that the user doesn't need to see or modify, like session tokens, product IDs, or page identifiers.

5. **Q:** What mobile keyboard differences do `type="tel"` and `type="url"` trigger?
   **A:** `tel` shows a numeric keypad optimized for phone numbers. `url` shows a keyboard with `.com` and `/` keys for entering web addresses.

## ⚠ Common Errors / Mistakes
- Using `type="number"` for phone numbers (should be `type="tel"` or `text`)
- Forgetting `enctype="multipart/form-data"` when using `type="file"`
- Expecting `type="date"` to work the same on all browsers (some show text input with format hints)
- Using `type="reset"` unintentionally (it clears all form fields, which may frustrate users)
- Not providing labels for radio/checkbox groups (reduces usability)

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Create a form with text, password, email, and submit input types.
2. Build a form with radio buttons for gender (Male, Female, Other) and a submit button.
3. Create a form with checkboxes for three hobbies (Reading, Music, Sports).

**Intermediate:**
4. Build a product configuration form using number (quantity), range (size 1-10), color (pick color), date (delivery date), and file (upload design).
5. Create a search form with `type="search"`, a hidden field for category ID, and a submit button.
6. Design a contact form with tel, email, url, and textarea (not input) for message.

**Advanced:**
7. Build a complete event registration form using all 17 input types in a meaningful way, with proper labels and grouping.
8. Create an accessible survey form with radio groups (at least 3), checkbox groups (at least 2), range sliders, color picker, date picker, search field, file upload, and hidden fields for tracking.
