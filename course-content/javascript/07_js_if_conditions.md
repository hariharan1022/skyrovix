## 7. JS If Conditions

## 📘 Introduction

Conditional statements control the flow of execution based on boolean conditions. JavaScript provides `if`, `else if`, `else`, `switch`, and the ternary operator for decision-making. Understanding truthy/falsy values is essential for writing reliable conditions.

## 🧠 Key Concepts

- **`if` statement**: Executes a block if condition is truthy
- **`else if`**: Additional conditions after initial `if`
- **`else`**: Default block when all conditions are false
- **`switch` statement**: Compares a value against multiple cases (strict comparison)
- **Ternary operator**: `condition ? expr1 : expr2` — inline conditional expression
- **Truthy values**: All values that coerce to `true` (except falsy ones)
- **Falsy values**: `false`, `0`, `""` (empty string), `null`, `undefined`, `NaN`
- **Nested conditions**: Conditions inside conditions (use sparingly for readability)
- **Short-circuit evaluation**: `&&` and `||` for conditional execution

## 💻 Syntax

```javascript
// if/else if/else
let score = 85;
if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
} else {
  console.log("F");
}

// switch statement
let day = "Monday";
switch (day) {
  case "Saturday":
  case "Sunday":
    console.log("Weekend");
    break;
  default:
    console.log("Weekday");
}

// Ternary
let age = 20;
let status = age >= 18 ? "Adult" : "Minor";

// Truthy/falsy check
let name = "";
if (name) {
  console.log("Name is", name);   // Won't execute
} else {
  console.log("Name is empty");   // Executes
}
```

## ✅ Example 1 - Basic

**Problem:** Determine if a number is positive, negative, or zero.

**Code:**
```javascript
let num = -5;

if (num > 0) {
  console.log("Positive");
} else if (num < 0) {
  console.log("Negative");
} else {
  console.log("Zero");
}
```

**Output:** `Negative`

**Explanation:** The `if` checks if `num > 0`. Since `-5` is not greater than 0, it moves to `else if`. `-5 < 0` is true, so `"Negative"` is logged. The `else` block would run only if both conditions were false.

## 🚀 Example 2 - Intermediate

**Problem:** Build a grade calculator using nested conditions and a switch statement.

**Code:**
```javascript
function getGradeDescription(letter) {
  switch (letter) {
    case "A":
      return "Excellent";
    case "B":
      return "Good";
    case "C":
      return "Average";
    case "D":
      return "Below Average";
    case "F":
      return "Fail";
    default:
      return "Invalid grade";
  }
}

let score = 88;
let grade;

if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else if (score >= 60) {
  grade = "D";
} else {
  grade = "F";
}

console.log(`Score: ${score}, Grade: ${grade} (${getGradeDescription(grade)})`);
```

**Output:** `Score: 88, Grade: B (Good)`

**Explanation:** The `if` chain converts a numeric score to a letter grade using top-down comparison. The `switch` statement maps each letter to a description. Notice `switch` uses strict comparison (`===`). The `default` case handles unexpected values.

## 🏢 Real World Use Case

**Form validation:** Before submitting a registration form, validation logic uses multiple conditions:
- Check if email is empty (falsy check)
- Check if email contains `@` and `.`
- Check if password length >= 8
- Check if passwords match
- Display specific error messages per failed condition

```javascript
if (!email) errors.push("Email is required");
else if (!email.includes("@")) errors.push("Invalid email format");
if (password.length < 8) errors.push("Password too short");
```

## 🎯 Interview Questions

1. **What are falsy values in JavaScript?** `false`, `0`, `""` (empty string), `null`, `undefined`, `NaN`. Everything else is truthy, including `"0"`, `"false"`, `[]`, `{}`.

2. **How does `switch` compare values?** `switch` uses strict comparison (`===`), not loose comparison. `case 0` will not match `"0"`.

3. **Can you use `switch` with ranges?** No, `switch` compares a single value against specific case values. For ranges, use `if/else if`. However, you can use `switch(true)` as a workaround.

4. **What happens if a `case` doesn't have a `break`?** Execution "falls through" to the next case, regardless of whether it matches. This can be useful (multiple cases for same outcome) but often causes bugs.

5. **What is the difference between `if` and the ternary operator?** `if` is a statement (cannot be used as a value). Ternary is an expression (produces a value). Use ternary for simple conditionals inside assignments or JSX.

## ⚠ Common Errors / Mistakes

- Using `=` instead of `===` in conditions (`if (x = 5)` assigns 5 to x, always truthy)
- Forgetting `break` in `switch` causing fall-through bugs
- Confusing truthy/falsy with actual boolean values (e.g., `""` is falsy but not `false`)
- Deeply nested conditions that are hard to read (use early returns, guard clauses)
- Testing `if (name)` when the user could legitimately enter `"0"` or `false` as a string

## 📝 Practice Exercises

**Beginner:**
1. Write a program that checks if a number is even or odd and logs the result.
2. Use an `if` statement to check if a user is logged in (boolean) and display a welcome message or "Please log in".
3. Create a `switch` that logs the day name for numbers 1-7 (Monday=1, Sunday=7).

**Intermediate:**
4. Build a simple login validator: check if username is non-empty AND password is at least 6 characters, display appropriate error messages.
5. Write a function `getDiscount(price, isMember)` that returns 20% off if member AND price > 100, 10% off if member, and 0% otherwise.
6. Use `switch(true)` to categorize a person's BMI: underweight (<18.5), normal (18.5-24.9), overweight (25-29.9), obese (>=30).

**Advanced:**
7. Implement a rock-paper-scissors game where the user plays against the computer. Use a `switch` statement to determine the winner and display the result.
8. Build a date validation function that checks if a given string (format "DD/MM/YYYY") represents a valid real date (leap years, month lengths, etc.) using conditional logic.
