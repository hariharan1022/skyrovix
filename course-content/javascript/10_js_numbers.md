## 10. JS Numbers

## 📘 Introduction

JavaScript has a single `Number` type that handles both integers and floating-point numbers using the IEEE 754 double-precision 64-bit binary format. Special values include `NaN`, `Infinity`, and `-Infinity`. ES2020 introduced `BigInt` for integers beyond the safe integer range.

## 🧠 Key Concepts

- **Number type**: 64-bit floating point (IEEE 754); all numbers are technically floats
- **Integer vs Float**: No distinction in type; `5` and `5.0` are the same
- **`NaN`**: Not-a-Number; result of invalid math operations; `NaN !== NaN` (the only value not equal to itself)
- **`Infinity`**: Result of dividing by zero or exceeding the max finite value
- **Number methods**: `parseInt()`, `parseFloat()`, `toFixed()`, `isNaN()`, `isFinite()`, `Number()`
- **Math object**: `Math.round()`, `Math.floor()`, `Math.ceil()`, `Math.random()`, `Math.max()`, `Math.min()`, `Math.pow()`, `Math.sqrt()`, `Math.abs()`
- **`BigInt`**: Created with `123n` or `BigInt(123)`; for integers beyond `Number.MAX_SAFE_INTEGER` (9,007,199,254,740,991)
- **Precision issues**: `0.1 + 0.2 !== 0.3` due to floating-point representation

## 💻 Syntax

```javascript
// Number basics
let int = 42;
let float = 3.14;
let negative = -10;
let scientific = 1.5e6;  // 1,500,000

// Special values
let notANumber = NaN;
let infinite = Infinity;
let negInf = -Infinity;

// Number methods
parseInt("42px");          // 42
parseFloat("3.14em");      // 3.14
(3.14159).toFixed(2);      // "3.14"
isNaN("hello" * 5);        // true
isFinite(1 / 0);           // false

// Math object
Math.floor(4.7);           // 4
Math.ceil(4.3);            // 5
Math.round(4.5);           // 5
Math.random();             // 0 to < 1
Math.max(1, 5, 3);         // 5

// BigInt
const big = 9007199254740991n;
const big2 = BigInt("9007199254740991");
```

## ✅ Example 1 - Basic

**Problem:** Calculate the area and circumference of a circle given the radius.

**Code:**
```javascript
const radius = 5;
const area = Math.PI * Math.pow(radius, 2);
const circumference = 2 * Math.PI * radius;

console.log(`Radius: ${radius}`);
console.log(`Area: ${area.toFixed(2)}`);
console.log(`Circumference: ${circumference.toFixed(2)}`);
```

**Output:** `Radius: 5`, `Area: 78.54`, `Circumference: 31.42`

**Explanation:** `Math.PI` provides π with high precision. `Math.pow(radius, 2)` calculates radius squared. `toFixed(2)` formats the result to 2 decimal places and returns a string.

## 🚀 Example 2 - Intermediate

**Problem:** Generate a random integer between min and max (inclusive) and check if it's a safe integer.

**Code:**
```javascript
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const num = randomInt(1, 100);
console.log(`Random number: ${num}`);
console.log(`Is safe integer? ${Number.isSafeInteger(num)}`);

// Precision demonstration
console.log("0.1 + 0.2 =", 0.1 + 0.2);  // 0.30000000000000004
console.log("Is 0.1 + 0.2 === 0.3?", (0.1 + 0.2).toFixed(1) === "0.3"); // true after rounding
```

**Output:**
```
Random number: 42 (varies)
Is safe integer? true
0.1 + 0.2 = 0.30000000000000004
Is 0.1 + 0.2 === 0.3? true
```

**Explanation:** `Math.random()` returns a float in [0, 1). Multiplying by the range and using `Math.floor()` gives a uniform integer. `Number.isSafeInteger()` checks if the value is within the safe integer range. The precision example shows why you should use `toFixed()` for currency comparisons.

## 🏢 Real World Use Case

**Financial calculations:** Never perform currency calculations with raw floating-point numbers due to precision issues. Use integer representation (cents) or libraries like `decimal.js`.

```javascript
// BAD: 0.1 + 0.2 = 0.30000000000000004
let price = 10.10;     // $10.10
// GOOD: Store in cents
let priceCents = 1010; // cents
let taxCents = Math.round(priceCents * 0.08); // 81 cents
let totalCents = priceCents + taxCents;       // 1091 cents = $10.91
```

## 🎯 Interview Questions

1. **Why is `0.1 + 0.2 !== 0.3`?** Due to IEEE 754 binary floating-point representation, some decimal numbers cannot be represented exactly. `0.1` and `0.2` round to approximations, and their sum has a tiny error.

2. **What is the difference between `Number.isNaN()` and global `isNaN()`?** `Number.isNaN()` checks if the value is literally `NaN` (no coercion). Global `isNaN()` coerces the value to a number first, so `isNaN("hello")` returns `true` but `Number.isNaN("hello")` returns `false`.

3. **How do you check if a value is an integer?** `Number.isInteger(value)` — returns `true` if the value is a number with no fractional part. `typeof value === "number" && value % 1 === 0` also works.

4. **What is `BigInt` and when would you use it?** `BigInt` represents integers of arbitrary size. Use it for large numbers beyond `Number.MAX_SAFE_INTEGER` (e.g., cryptography, database IDs, timestamps in nanoseconds).

5. **What are `parseInt()` and `parseFloat()` differences?** Both parse from the start of a string until an invalid character. `parseInt()` returns an integer (with optional radix parameter). `parseFloat()` returns a floating-point number. `parseInt("10.5")` returns 10; `parseFloat("10.5")` returns 10.5.

## ⚠ Common Errors / Mistakes

- Comparing floating-point numbers directly (`0.1 + 0.2 === 0.3` → `false`)
- Forgetting `parseInt()` radix parameter — `parseInt("08")` defaults to octal in older browsers
- Using `toFixed()` which returns a string, not a number
- Dividing by zero returns `Infinity`, not an error
- Assuming `Math.random()` is cryptographically secure (use `crypto.getRandomValues()` for security)

## 📝 Practice Exercises

**Beginner:**
1. Write code to convert Celsius to Fahrenheit: `F = C * 9/5 + 32`. Display with 1 decimal.
2. Use `Math.random()` to simulate a dice roll (1-6) and log the result.
3. Check if a number is an integer using `Number.isInteger()` for values 4, 4.0, 4.5.

**Intermediate:**
4. Write a function `roundTo(num, decimals)` that rounds a number to a specified number of decimal places.
5. Generate an array of 10 random numbers between 50 and 100, then find the max, min, and average using `Math` methods and `reduce()`.
6. Write a function `safeAdd(a, b)` that adds two numbers but returns an error string if either is `NaN` or `Infinity`.

**Advanced:**
7. Implement a `Currency` class that stores amounts in cents (integer) and provides methods like `add()`, `subtract()`, `multiply()`, and `format()` (returns "$10.99").
8. Build a number base converter: convert a number from base 10 to any base (2-36) and back, handling big integers with `BigInt`.
