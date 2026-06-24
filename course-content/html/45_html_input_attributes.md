## 45. HTML Input Attributes
## 📘 Introduction
HTML input attributes define behavior, validation, and appearance of form controls. Attributes like `value`, `readonly`, `disabled`, `size`, `maxlength`, `min`, `max`, `multiple`, `pattern`, `placeholder`, `required`, `step`, and `autofocus` give developers precise control over input acceptance, user guidance, and data quality.

## 🧠 Key Concepts
- **value:** Default or initial value of the input
- **readonly:** User can see but not modify the value (submitted with form)
- **disabled:** Input is unusable and unclickable (not submitted with form)
- **size:** Visible width of the input in characters
- **maxlength:** Maximum number of characters allowed
- **min / max:** Minimum and maximum values for numeric/date inputs
- **multiple:** Allows multiple values (email, file)
- **pattern:** Regular expression for client-side validation
- **placeholder:** Hint text inside the input
- **required:** Field must have a value before submission
- **step:** Incremental steps for number/range inputs
- **autofocus:** Automatically focuses the input on page load

## 💻 Syntax (HTML code)
```html
<input type="text" name="username" value="John" placeholder="Enter name" maxlength="20" required autofocus>
<input type="number" name="age" min="1" max="150" step="1" value="18">
<input type="email" name="email" multiple placeholder="email1@a.com, email2@a.com">
<input type="text" name="zipcode" pattern="[0-9]{5}" title="5-digit zip code">
<input type="text" name="readonly-field" value="Cannot edit" readonly>
<input type="text" name="disabled-field" value="Not sent" disabled>
<input type="file" name="files" multiple>
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)
**Problem:** Create a registration form with validation constraints using input attributes.

**Code:**
```html
<!DOCTYPE html>
<html>
<body>
    <h2>Registration Form</h2>
    <form action="register.php" method="POST">
        <p>
            <label>Username:
                <input type="text" name="username" placeholder="e.g., john_doe"
                       maxlength="15" required autofocus>
            </label>
            (max 15 chars, required)
        </p>
        <p>
            <label>Age:
                <input type="number" name="age" min="18" max="120" step="1" value="18">
            </label>
        </p>
        <p>
            <label>ZIP Code:
                <input type="text" name="zip" pattern="[0-9]{5}" placeholder="12345"
                       title="Enter exactly 5 digits">
            </label>
        </p>
        <p>
            <label>Password:
                <input type="password" name="pass" placeholder="Minimum 8 chars"
                       minlength="8" required>
            </label>
        </p>
        <p><input type="submit" value="Register"></p>
    </form>
</body>
</html>
```

**Output:** A form where username is pre-focused and limited to 15 characters; age starts at 18 with min/max constraints; ZIP code validates against a 5-digit pattern; password requires minimum 8 characters. Invalid submissions trigger browser error messages.

**Explanation:** `required` prevents empty submission. `pattern` provides regex validation. `minlength`/`maxlength` control text length. `min`/`max` restrict numeric ranges. `placeholder` shows hints. `autofocus` sets initial cursor position.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)
**Problem:** Build an email invitation form using readonly, disabled, multiple, step, and size attributes.

**Code:**
```html
<!DOCTYPE html>
<html>
<body>
    <h2>Send Invitations</h2>
    <form action="invite.php" method="POST">
        <p>
            <label>Event:
                <input type="text" name="event" value="Annual Conference 2025" readonly size="25">
            </label>
            (readonly — event is fixed)
        </p>
        <p>
            <label>Your Email (pre-filled):
                <input type="email" name="sender" value="admin@company.com" disabled size="30">
            </label>
            (disabled — not submitted)
        </p>
        <p>
            <label>Recipient Emails:
                <input type="email" name="recipients" multiple placeholder="a@b.com, c@d.com" size="40">
            </label>
            (separate with commas)
        </p>
        <p>
            <label>Max Attendees:
                <input type="number" name="max_attend" value="50" min="1" max="500" step="10">
            </label>
            (step by 10)
        </p>
        <p>
            <label>Access Code:
                <input type="text" name="code" value="PREMIUM2025" readonly disabled>
            </label>
            (both readonly and disabled)
        </p>
        <p><input type="submit" value="Send Invitations"></p>
    </form>
</body>
</html>
```

**Output:** A form with a readonly event name (fixed value), a disabled sender email (visible but not submitted), a multiple-recipient email field, a step-by-10 number spinner, and a field that is both readonly and disabled.

**Explanation:** `readonly` fields display but cannot be edited — still submitted. `disabled` fields are grayed out and excluded from form data. `multiple` on email accepts comma-separated addresses. `step="10"` increments by 10.

## 🏢 Real World Use Case
Registration forms use `required` and `pattern` for validation; admin panels use `readonly` to display system-generated values; disabled fields show reference data without allowing changes; checkout uses `min`/`max` for quantities; search uses `autofocus` for immediate typing; file inputs use `multiple` for batch uploads.

## 🎯 Interview Questions (5 with answers)
1. **Q:** What is the difference between `readonly` and `disabled`?
   **A:** `readonly` prevents editing but the value is still submitted with the form. `disabled` prevents interaction AND the value is NOT submitted. `readonly` applies to text-like inputs; `disabled` works on all controls.

2. **Q:** How does the `pattern` attribute work for validation?
   **A:** `pattern` accepts a JavaScript regular expression. The input value must match the pattern for the form to submit. Use `title` attribute to describe the expected format as an error message.

3. **Q:** What does the `multiple` attribute do on `<input type="file">`?
   **A:** It allows users to select multiple files in the file picker dialog. The server receives an array of files. Without `multiple`, only one file can be selected.

4. **Q:** Can `minlength` and `maxlength` be used together?
   **A:** Yes. `minlength` sets the minimum character count (with `required`), and `maxlength` sets the maximum. The browser prevents exceeding `maxlength` and warns if below `minlength`.

5. **Q:** What happens when `autofocus` is used on multiple inputs?
   **A:** Only the first input with `autofocus` in the document order receives focus. Multiple `autofocus` attributes are ignored after the first one.

## ⚠ Common Errors / Mistakes
- Using `readonly` on checkboxes or radio buttons (only works on text-like inputs)
- Expecting `disabled` fields to be submitted (they are excluded from form data)
- Forgetting the `title` attribute with `pattern` — browsers show the title as validation message
- Setting `min`/`max` as strings instead of numbers for numeric inputs
- Using `maxlength` when expecting server-side truncation (browser enforces it client-side)

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)
**Beginner:**
1. Create a text input with placeholder "Enter your name", maxlength 30, and required.
2. Build a number input with min 1, max 100, step 5, and default value 10.
3. Create a form with an email input that uses multiple and a readonly field for user ID.

**Intermediate:**
4. Build a credit card form with pattern validation (16 digits, grouped as 4-4-4-4), maxlength, placeholder, and required.
5. Create a form comparing readonly vs disabled — show that readonly values submit but disabled values do not.
6. Design a product order form with quantity (step: 2, max: 20), color (autofocus), and date (min: tomorrow).

**Advanced:**
7. Build a complete validated registration form with pattern (username: alphanumeric 4-12 chars, password: min 8 chars with at least 1 number and 1 special char), required, min/max, step, multiple email, and file upload.
8. Create an accessible admin settings form that uses readonly for system-generated values, disabled for locked settings (with explanation text), and autofocus for the first editable field.
