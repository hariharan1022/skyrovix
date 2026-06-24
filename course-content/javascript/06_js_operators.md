## 6. JS Operators

## 📘 Introduction

Operators are symbols that perform operations on operands (values). JavaScript provides a rich set of operators for arithmetic, assignment, comparison, logical operations, and more. Understanding operators is critical for writing correct and expressive code.

## 🧠 Key Concepts

- **Arithmetic**: `+`, `-`, `*`, `/`, `%` (modulus), `**` (exponentiation), `++` (increment), `--` (decrement)
- **Assignment**: `=`, `+=`, `-=`, `*=`, `/=`, `%=`, `**=`
- **Comparison**: `===` (strict equality), `!==` (strict inequality), `>`, `<`, `>=`, `<=`
- **Logical**: `&&` (AND), `||` (OR), `!` (NOT)
- **Ternary (conditional)**: `condition ? valueIfTrue : valueIfFalse`
- **Nullish coalescing**: `??` — returns right side if left is `null` or `undefined`
- **Optional chaining**: `?.` — safely access nested properties without errors
- **Type coercion**: JS automatically converts types in certain operations (e.g., `"5" - 2` → `3`)

## 💻 Syntax

```javascript
// Arithmetic
let sum = 10 + 5;      // 15
let power = 2 ** 3;    // 8
let mod = 10 % 3;      // 1
let count = 0;
count++;               // 1

// Assignment
let x = 5;
x += 3;                // 8 (same as x = x + 3)

// Comparison (always prefer === over ==)
5 === "5"              // false (strict)
5 == "5"               // true (loose, coerces types)
5 !== "5"              // true

// Logical
let isLoggedIn = true;
let isAdmin = false;
isLoggedIn && isAdmin; // false
isLoggedIn || isAdmin; // true

// Ternary
let access = isAdmin ? "granted" : "denied";

// Nullish coalescing
let user = null;
let name = user ?? "Guest";  // "Guest"

// Optional chaining
let person = { address: null };
let city = person?.address?.city;  // undefined, no error
```

## ✅ Example 1 - Basic

**Problem:** Calculate the total price with discount using arithmetic and assignment operators.

**Code:**
```javascript
let price = 100;
const discount = 0.2;
let discountedPrice = price - (price * discount);
console.log("Discounted price:", discountedPrice);

// Using combined assignment
let cartTotal = 0;
cartTotal += 50;   // 50
cartTotal += 30;   // 80
cartTotal -= 10;   // 70
console.log("Cart total:", cartTotal);
```

**Output:** `Discounted price: 80` and `Cart total: 70`

**Explanation:** Arithmetic operators calculate the discount. Compound assignment operators (`+=`, `-=`) modify variables in place. The `*` and `-` operators follow standard precedence.

## 🚀 Example 2 - Intermediate

**Problem:** Validate user access using comparison, logical, ternary, and nullish operators.

**Code:**
```javascript
const user = {
  role: "editor",
  permissions: null
};

// Strict comparison
const isAdmin = user.role === "admin";

// Logical AND and ternary
const accessLevel = isAdmin
  ? "full"
  : user.role === "editor"
    ? "write"
    : "read";

// Optional chaining and nullish coalescing
const firstPermission = user.permissions?.[0] ?? "no permissions";

console.log("Access:", accessLevel);         // "write"
console.log("Permission:", firstPermission); // "no permissions"

// Short-circuit evaluation
const isLoggedIn = true;
isLoggedIn && console.log("User is logged in"); // logs
```

**Output:** `Access: write` and `Permission: no permissions`

**Explanation:** Strict equality `===` compares without type coercion. The ternary chain implements if/else logic. `?.` safely accesses nested array; if `permissions` is `null`, it short-circuits to `undefined`. `??` provides a fallback for null/undefined only (unlike `||` which catches all falsy values).

## 🏢 Real World Use Case

**API response handling:** When dealing with nested API responses, optional chaining prevents "Cannot read property of undefined" errors. Nullish coalescing provides fallback defaults for missing data. Logical operators control conditional rendering in React components. Ternary operators are used extensively in JSX for inline conditionals.

```javascript
const avatarUrl = user?.profile?.avatar ?? "/default-avatar.png";
const canEdit = user?.role === "admin" || user?.role === "editor";
```

## 🎯 Interview Questions

1. **What is the difference between `==` and `===`?** `==` compares values with type coercion (e.g., `5 == "5"` is true). `===` compares values AND types without coercion (`5 === "5"` is false). Always prefer `===`.

2. **What is the difference between `??` and `||`?** `??` returns the right side only if the left is `null` or `undefined`. `||` returns the right side if the left is any falsy value (`false`, `0`, `""`, `null`, `undefined`, `NaN`).

3. **What does optional chaining (`?.`) do?** It allows reading a property at any depth without checking each level. If any intermediate property is `null` or `undefined`, the expression short-circuits and returns `undefined`.

4. **How does the ternary operator work?** `condition ? exprIfTrue : exprIfFalse`. It's an expression (not a statement), so it can be used inside JSX, string templates, and assignments.

5. **What is short-circuit evaluation in logical operators?** `&&` returns the first falsy operand or the last operand. `||` returns the first truthy operand or the last operand. This is used for conditional execution and default values.

## ⚠ Common Errors / Mistakes

- Using `=` instead of `===` in conditions (assignment instead of comparison)
- Using `==` instead of `===` and getting unexpected type coercion results
- Confusing `??` and `||` when dealing with `0` or `""` (valid falsy values)
- Using `++` or `--` in complex expressions (order of evaluation confusion with prefix vs postfix)
- Not understanding operator precedence (use parentheses for clarity)

## 📝 Practice Exercises

**Beginner:**
1. Calculate the area of a rectangle given width and height using `*`.
2. Use `===` to compare two variables of different types and log the result.
3. Write a ternary that returns "Even" or "Odd" based on a number.

**Intermediate:**
4. Build a temperature converter: use `? :` and arithmetic to convert Celsius to Fahrenheit and display the result.
5. Check if a user object has a nested `address.zipCode` property using optional chaining, and provide a fallback with `??`.
6. Write a short-circuit expression that logs "Admin access!" only if `user.role === "admin"`.

**Advanced:**
7. Implement a basic calculator that takes two numbers and an operator (`+`, `-`, `*`, `/`, `%`, `**`) and returns the result using a switch on the operator.
8. Create a deep object accessor utility function using `?.` and `??` that safely retrieves a value from an arbitrarily nested object given a dot-separated path string.
