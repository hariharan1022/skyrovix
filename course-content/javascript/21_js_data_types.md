## 21. JS Data Types
## 📘 Introduction
JavaScript has **7 primitive data types** (`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) and **`object`** (reference type). Understanding these types, the `typeof` operator, type coercion, and equality comparisons is fundamental to writing reliable JS code.

## 🧠 Key Concepts
- **Primitive types**: immutable, stored by value
  - `string` — textual data
  - `number` — 64-bit floating point (including `NaN`, `Infinity`)
  - `boolean` — `true` / `false`
  - `null` — intentional absence of value
  - `undefined` — uninitialized or missing value
  - `symbol` — unique, immutable identifier (`Symbol()`)
  - `bigint` — arbitrary-precision integers (`42n`)
- `typeof` operator — returns a string (`"string"`, `"number"`, `"boolean"`, `"object"` for `null` — a known bug)
- **Type coercion** — implicit conversion (e.g. `'5' - 3` → `2`)
- **Truthy/falsy** — falsy: `false`, `0`, `""`, `null`, `undefined`, `NaN`; everything else is truthy
- **Strict (`===`)** vs **loose (`==`)** equality — `===` checks type + value; `==` coerces types

## 💻 Syntax
```javascript
typeof 'hello';    // "string"
typeof 42;         // "number"
typeof true;       // "boolean"
typeof null;       // "object"  (historical bug)
typeof undefined;  // "undefined"
typeof Symbol();   // "symbol"
typeof 42n;        // "bigint"
typeof {};         // "object"

5 == '5';   // true  (coercion)
5 === '5';  // false (no coercion)
null == undefined;  // true
null === undefined; // false
```

## ✅ Example 1 - Basic (Type Detection & Truthy/Falsy)
**Problem:** Write a utility that safely logs a value with its type, and check truthiness.

**Code:**
```javascript
function describe(val) {
  console.log(`${val} → type: ${typeof val}, truthy: ${!!val}`);
}

describe('hello');   // hello → type: string, truthy: true
describe(0);         // 0 → type: number, truthy: false
describe('');        //  → type: string, truthy: false
describe(null);      // null → type: object, truthy: false
describe([]);        //  → type: object, truthy: true
describe({});        // [object Object] → type: object, truthy: true
```

**Output:**
```
hello → type: string, truthy: true
0 → type: number, truthy: false
 → type: string, truthy: false
null → type: object, truthy: false
 → type: object, truthy: true
[object Object] → type: object, truthy: true
```

**Explanation:** `typeof` reveals the type. `!!val` converts any value to a boolean — `!` coerces to boolean and flips it, the second `!` flips it back, giving the truthy/falsy determination.

## 🚀 Example 2 - Intermediate (Type Coercion Traps)
**Problem:** Predict the output of several coercion scenarios and fix the comparison using strict equality.

**Code:**
```javascript
console.log('5' - 3);       // 2   (string coerces to number)
console.log('5' + 3);       // '53' (number coerces to string — + favors string concat)
console.log([] + []);       // ''  (empty arrays coerce to empty strings)
console.log([] + {});       // '[object Object]'
console.log({} + []);       // '[object Object]'
console.log(null + 1);      // 1   (null → 0)
console.log(undefined + 1); // NaN  (undefined → NaN)

// Fix comparison
const a = '0', b = false;
console.log(a == b);   // true  — both coerce to 0 → 0 == 0 → true (trap!)
console.log(a === b);  // false — different types, no coercion
```

**Output:**
```
2
53

[object Object]
[object Object]
1
NaN
true
false
```

**Explanation:** JavaScript's implicit coercion follows rules that often surprise. The `+` operator favors string concatenation if either operand is a string. Loose equality `==` coerces before comparing. **Always prefer `===`** to avoid these traps.

## 🏢 Real World Use Case
API request parameter sanitization — ensuring `?count=5` is parsed as a number, not a string. Using `Number(val)` or unary `+` to explicitly coerce, then `Number.isNaN()` to validate, plus `typeof` checks to distinguish between `null` (intentionally empty) and `undefined` (missing).

## 🎯 Interview Questions
1. **What is `typeof null` and why?** — `"object"`. This is a well-known bug from JS's first implementation where `null` was encoded as the null pointer (0x00), which was already used for objects.
2. **What is the difference between `undefined` and `null`?** — `undefined` means a variable is declared but not assigned; `null` is an intentional assignment representing "no value".
3. **What are the 7 falsy values in JavaScript?** — `false`, `0`, `-0`, `""`, `null`, `undefined`, `NaN`. Also `0n` (BigInt zero) in newer specs.
4. **Explain `==` vs `===`.** — `===` (strict) checks type and value without coercion. `==` (loose) coerces operands to the same type before comparing. Prefer `===`.
5. **What is the `Symbol` type used for?** — Creating unique property keys to avoid name collisions, defining well-known symbols like `Symbol.iterator`, and creating private-like object properties.

## ⚠ Common Errors / Mistakes
- Using `==` and falling into coercion traps (e.g. `0 == '0'` is `true`)
- Forgetting that `typeof null === 'object'` — always check `val === null` separately
- Checking for a number with `typeof val === 'number'` but forgetting `NaN` is also `"number"`
- Assuming `[]` is falsy (it's truthy) — empty arrays are object references
- Mixing `BigInt` with regular numbers (e.g. `42n + 1` throws `TypeError`)

## 📝 Practice Exercises
**Beginner**
1. Write a function `getType(val)` that returns a more accurate type string (handling `null` and arrays separately).
2. List all falsy values and test each with `if (val)` to confirm they don't execute.
3. Use `===` to compare `0`, `'0'`, `false`, and `''` in all combinations — write down the results.

**Intermediate**
4. Write a function `looseEqual(a, b)` that reimplements `==` behavior for a subset of types (string, number, boolean, null, undefined).
5. Given a user input that could be a string number (`"42"`), `null`, or `undefined`, write a safe parser that returns the number or a default value.
6. Detect and explain the coercion result of: `true + true`, `'10' - '5'`, `null + 'hello'`, `undefined + 5`, `[1] + [2]`.

**Advanced**
7. Implement a deep equality function `deepEqual(a, b)` that correctly handles primitives, objects, arrays, null, and Dates.
8. Write a function `toPrimitive(obj)` that manually follows the ToPrimitive abstract operation (hint: valueOf, toString) to convert an object to a primitive.
