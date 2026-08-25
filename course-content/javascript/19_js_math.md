## 19. JS Math
## 📘 Introduction
The `Math` object is a built-in global that provides mathematical constants and functions. `Math` is not a constructor — all its properties and methods are static. It covers basic arithmetic, trigonometry, logarithms, rounding, and random number generation.

## 🧠 Key Concepts
- **Constants**: `Math.PI` (π ≈ 3.14159), `Math.E` (Euler's ≈ 2.718)
- **Rounding**: `Math.round(x)` — nearest integer, `Math.ceil(x)` — rounds **up**, `Math.floor(x)` — rounds **down**, `Math.trunc(x)` — removes fractional part (ES6)
- **Absolute value**: `Math.abs(x)` — always non-negative
- **Min/Max**: `Math.max(a, b, ...)`, `Math.min(a, b, ...)` — accepts varargs or combined with spread
- **Exponents & Roots**: `Math.pow(base, exp)`, `Math.sqrt(x)`, `Math.cbrt(x)` (ES6)
- **Random**: `Math.random()` — float in [0, 1); scaling: `Math.random() * max` + optional `Math.floor`

## 💻 Syntax
```javascript
Math.PI;          // 3.141592653589793
Math.abs(-5);     // 5
Math.ceil(4.2);   // 5
Math.floor(4.9);  // 4
Math.round(4.5);  // 5
Math.trunc(-4.7); // -4
Math.max(1, 3, 2); // 3
Math.min(1, 3, 2); // 1
Math.pow(2, 10);  // 1024
Math.sqrt(81);    // 9
Math.random();    // e.g. 0.374540...
```

## ✅ Example 1 - Basic (Random Integer)
**Problem:** Generate a random integer between `min` and `max` (inclusive).

**Code:**
```javascript
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(randomInt(1, 6));  // Simulate a die roll
```

**Output:**
```
3   (varies)
```

**Explanation:** `Math.random()` produces a float in [0, 1). Multiply by range width `(max - min + 1)`, `Math.floor` it, then shift by `min`. This is the standard pattern for inclusive random integers.

## 🚀 Example 2 - Intermediate (Geometry Calculations)
**Problem:** Calculate the area and circumference of a circle, and hypothenuse of a right triangle, using Math constants and methods.

**Code:**
```javascript
const radius = 5;
const area = Math.PI * Math.pow(radius, 2);
const circumference = 2 * Math.PI * radius;

const a = 3, b = 4;
const hypot = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

console.log('Area:', Math.round(area));                    // 79
console.log('Circumference:', circumference.toFixed(2));   // 31.42
console.log('Hypotenuse:', hypot);                         // 5

// Min/Max with spread
const temps = [22, 18, 27, 15, 30];
console.log('Max temp:', Math.max(...temps));  // 30
console.log('Min temp:', Math.min(...temps));  // 15
```

**Output:**
```
Area: 79
Circumference: 31.42
Hypotenuse: 5
Max temp: 30
Min temp: 15
```

**Explanation:** `Math.PI` and `Math.pow` handle the circle formulas. `Math.sqrt` with `Math.pow` computes the Pythagorean theorem. `Math.max`/`Math.min` combined with spread (`...temps`) work on arrays.

## 🏢 Real World Use Case
Game development — generating random loot drops: `Math.random()` for drop probability, `Math.floor(Math.random() * tierCount) + 1` for item tier, `Math.round` for display values, `Math.max(0, hp - damage)` to prevent negative health.

## 🎯 Interview Questions
1. **What does `Math.trunc(-4.7)` return?** — `-4`. It removes the fractional part without rounding (unlike `floor` which would give `-5`).
2. **How do you get a random integer between 1 and 10 inclusive?** — `Math.floor(Math.random() * 10) + 1`.
3. **What is the difference between `Math.round` and `Math.floor` for negative numbers?** — `Math.round(-4.5)` → `-4` (rounds toward +∞), `Math.floor(-4.5)` → `-5` (rounds toward -∞).
4. **How can you find the maximum value in an array without loops?** — `Math.max(...arr)` or `Math.max.apply(null, arr)`.
5. **Is `Math` a constructor?** — No. `Math` is a static object; calling `new Math()` throws `TypeError`.

## ⚠ Common Errors / Mistakes
- Forgetting to `Math.floor` when generating random integers (getting floats)
- Using `Math.round` for range-based randomization (skews distribution)
- Passing an array directly to `Math.max` (returns `NaN`) — must use spread
- Expecting `Math.random()` to be cryptographically secure — use `crypto.getRandomValues()` for security
- Confusing `Math.ceil(Math.random() * 6)` with dice roll — this gives 1-6 but `0` is possible if `random()` returns exactly 0

## 📝 Practice Exercises
**Beginner**
1. Write a function `circleArea(r)` that returns the area of a circle rounded to 2 decimal places.
2. Generate a random hex color (`#rrggbb`) using `Math.random` and `Math.floor`.
3. Use `Math.max` and `Math.min` to clamp a number between 0 and 100.

**Intermediate**
4. Write a function `rollDice(numberOfDice, sides)` that simulates rolling N dice and returns the sum.
5. Calculate the distance between two points `(x1, y1)` and `(x2, y2)` using `Math.hypot` (ES6).
6. Implement a simple `RandomPicker` class that picks a random item from an array with optional weighted probabilities.

**Advanced**
7. Implement a `Math.degToRad` and `Math.radToDeg` polyfill collection, then compute the trajectory of a projectile given angle (in degrees) and velocity.
8. Implement a Monte Carlo simulation that estimates π by generating random (x, y) points in a unit square and checking how many fall inside the quarter-circle.
