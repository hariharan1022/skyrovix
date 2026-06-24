## 5. JS Syntax

## 📘 Introduction

JavaScript syntax is the set of rules that define a correctly structured JS program. Understanding syntax is fundamental — it governs how you write statements, define variables, use operators, structure control flow, and document code. JavaScript is a **C-style syntax language** with dynamic typing and first-class functions.

## 🧠 Key Concepts

- **Statements**: Instructions executed by the browser; typically end with a semicolon (optional but recommended)
- **Expressions**: Code that evaluates to a value (e.g., `2 + 2`, `"hello"`, `x * 5`)
- **Variables**: Containers for data declared with `var`, `let`, or `const`
- **Operators**: Symbols that perform operations on values (arithmetic, assignment, comparison, logical)
- **Comments**: Non-executable annotations — `// single line`, `/* multi line */`
- **Identifiers**: Names given to variables, functions, classes, etc. — must start with letter, `_`, or `$`
- **Case sensitivity**: `myVar` and `myvar` are two different variables
- **Reserved keywords**: Words like `if`, `for`, `class`, `return` cannot be used as identifiers

## 💻 Syntax

```javascript
// Statements
let x = 5;
const y = 10;
if (x < y) {
  console.log("x is less than y");
}

// Expressions
const sum = 5 + 3;           // 5 + 3 is an expression
const greeting = "Hi " + name; // "Hi " + name is an expression
const isGreater = x > y;     // x > y evaluates to boolean

// Identifiers (case sensitive)
let myVariable = 1;
let myvariable = 2; // different variable

// Comments
// This is a single-line comment
/* This is a
   multi-line comment */

// Reserved keywords cannot be used as identifiers
// let if = 5; // SyntaxError!
```

## ✅ Example 1 - Basic

**Problem:** Demonstrate statements, expressions, and variable declarations.

**Code:**
```javascript
// Statement: variable declaration
let price = 100;
const taxRate = 0.08;

// Expression: calculates total
let total = price + (price * taxRate);  // the whole right side is an expression

// Statement: output
console.log("Total: $" + total);
```

**Output:** `Total: $108`

**Explanation:** Lines with `let` and `console.log` are statements (they perform actions). `price * taxRate` and `price + (price * taxRate)` are expressions (they produce values). `const` creates an immutable binding.

## 🚀 Example 2 - Intermediate

**Problem:** Demonstrate identifier rules, case sensitivity, and comment usage.

**Code:**
```javascript
// Valid identifiers
let firstName = "John";
let _private = "hidden";
let $element = $("#id");
let camelCaseExample = 42;

// Case sensitivity
let myVar = "hello";
let myvar = "world";
console.log(myVar); // "hello"
console.log(myvar); // "world"

// Using reserved keywords is an error
// let function = "test"; // SyntaxError

/* Multi-line comment explaining
   that $ and _ are valid starting characters
   for identifiers */
```

**Output:** `hello` then `world` printed to console.

**Explanation:** JavaScript is case-sensitive. `myVar` and `myvar` are distinct. Identifiers can contain letters, digits, `_`, and `$` but cannot start with a digit. Comments are completely ignored during execution.

## 🏢 Real World Use Case

**Code style and linting in large teams:** In production codebases with dozens of developers, consistent syntax conventions are enforced by tools like ESLint and Prettier. Teams agree on semicolons (always), identifier casing (`camelCase` for variables/functions, `PascalCase` for classes, `UPPER_SNAKE` for constants), and comment styles for JSDoc documentation. This prevents bugs from syntax misuse and improves readability.

## 🎯 Interview Questions

1. **What is the difference between a statement and an expression in JavaScript?** A statement performs an action (e.g., `if`, `for`, variable declaration). An expression produces a value (e.g., `2 + 2`, `foo()`). Expressions can be used where values are expected.

2. **What characters can JavaScript identifiers start with?** A letter (a-z, A-Z), underscore (`_`), or dollar sign (`$`). They cannot start with a digit. Subsequent characters can include digits.

3. **Is JavaScript case-sensitive?** Yes. `Variable` and `variable` are different. Built-in objects like `Math` must be capitalized correctly — `math` would fail.

4. **What are reserved keywords? Give examples.** Words that have special meaning in JS syntax and cannot be used as identifiers. Examples: `let`, `const`, `var`, `if`, `else`, `for`, `while`, `function`, `return`, `class`, `import`, `export`.

5. **What are the three ways to declare a variable and how do they differ?** `var` (function-scoped, hoisted, can be redeclared), `let` (block-scoped, can be reassigned), `const` (block-scoped, cannot be reassigned, must be initialized).

## ⚠ Common Errors / Mistakes

- Using reserved keywords as variable names (`let if = 1;` → SyntaxError)
- Forgetting JavaScript is case-sensitive (calling `getElementById` as `getElementByID`)
- Omitting semicolons where they are required for correct parsing (`return` followed by newline)
- Using `=` instead of `==` or `===` in conditions (assignment vs comparison)
- Declaring variables without `let`, `const`, or `var` (creates global variables in non-strict mode)

## 📝 Practice Exercises

**Beginner:**
1. Declare three variables using `let`, `const`, and `var`. Print each to the console.
2. Write a statement that adds two numbers and stores the result in a variable, then log it.
3. Create valid identifiers for a user's email, phone number, and birth year using camelCase.

**Intermediate:**
4. Write a script that demonstrates case sensitivity by creating two variables that differ only in case and logging both.
5. Fix a code snippet that contains syntax errors: missing semicolons, reserved keyword usage, and invalid identifiers.
6. Create an expression that evaluates a simple equation (e.g., Celsius to Fahrenheit conversion) and logs the result.

**Advanced:**
7. Write a function that validates whether a given string is a valid JavaScript identifier (starts with letter/_/$, no reserved keywords).
8. Implement a mini tokenizer that reads a string of JS code and classifies each token as a statement, expression, identifier, keyword, operator, or comment.
