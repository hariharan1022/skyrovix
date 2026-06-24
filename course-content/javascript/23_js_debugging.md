## 23. JS Debugging
## 📘 Introduction
Debugging is the process of identifying and fixing bugs. JavaScript offers powerful tools: `console` methods for logging, the `debugger` statement for breakpoints, and browser DevTools (Sources tab, Watch panel, Call Stack) for step-through inspection.

## 🧠 Key Concepts
- **Console methods**:
  - `console.log(...)` — general logging
  - `console.warn(...)` — warnings (yellow)
  - `console.error(...)` — errors (red, includes stack trace)
  - `console.table(data)` — tabular display for arrays/objects
  - `console.group(label)` / `console.groupEnd()` — nested collapsible groups
  - `console.time(label)` / `console.timeEnd(label)` — timing
  - `console.count(label)` — how many times a line runs
  - `console.trace()` — print stack trace at the call point
- `debugger` — statement that triggers a breakpoint in DevTools
- **DevTools Sources tab**: set line breakpoints, step over/into/out, watch variables
- **Watch expressions**: evaluate JS expressions on each break
- **Call stack**: shows the chain of function calls leading to the current line

## 💻 Syntax
```javascript
console.log('value:', x);
console.warn('Deprecated');
console.error('Something broke', err);
console.table([{id:1, name:'Alice'}, {id:2, name:'Bob'}]);
console.group('Outer');
  console.log('inside');
console.groupEnd();

debugger;  // pauses execution when DevTools is open
```

## ✅ Example 1 - Basic (Console Methods)
**Problem:** Debug a function that calculates average — trace values and timing.

**Code:**
```javascript
function average(nums) {
  console.group('average');
  console.log('input:', nums);
  console.time('avg');
  const sum = nums.reduce((a, b) => a + b, 0);
  const avg = sum / nums.length;
  console.log('sum:', sum, 'avg:', avg);
  console.timeEnd('avg');
  console.count('average called');
  console.groupEnd();
  return avg;
}

average([10, 20, 30]);
average([5, 15, 25]);
console.count('average called');
```

**Output:**
```
  average
    input: [10, 20, 30]
    sum: 60 avg: 20
    avg: 0.123ms
    average called: 1
  average
    input: [5, 15, 25]
    sum: 45 avg: 15
    avg: 0.089ms
    average called: 2
average called: 2
```

**Explanation:** `console.group` nests output. `console.time`/`timeEnd` measure performance. `console.count` tracks how many times the function is invoked.

## 🚀 Example 2 - Intermediate (Debugger + Step Through)
**Problem:** Find the bug in a nested function using `debugger` and DevTools.

**Code:**
```javascript
function factorial(n) {
  debugger;  // pause here
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

function compute(arr) {
  return arr.map(x => factorial(x));
}

console.table(compute([3, 4, 5]));
```

**Explanation (no output for debugger):** When this runs with DevTools open, execution pauses at `debugger`. You can inspect the Call Stack (compute → factorial → factorial), watch `n` decrease, and see `x` in the outer scope. Use Step Into to trace each recursive call.

## 🏢 Real World Use Case
Performance debugging a slow React list render: `console.time` around the render function to measure duration, `console.table` on sorted profiler data, `debugger` inside a callback to inspect stale closure values, and `console.trace` to determine who called a function.

## 🎯 Interview Questions
1. **What does `debugger` do?** — It creates a breakpoint in the code. If DevTools is open, execution pauses at that line, allowing inspection of scope, call stack, and variables.
2. **What is the difference between `console.log` and `console.table`?** — `console.log` prints raw text. `console.table` formats arrays/objects as an interactive table in the console.
3. **How do you measure execution time?** — `console.time('label')` at start and `console.timeEnd('label')` at end. Or use `performance.now()` for more precision.
4. **What is a watch expression?** — A JS expression evaluated every time the debugger pauses. Useful for checking derived values without hovering or typing repeatedly.
5. **When would you use `console.trace()`?** — To log the current call stack, helping answer "how did this function get called?" in complex event-driven code.

## ⚠ Common Errors / Mistakes
- Leaving `debugger;` statements in production code (they break the page for users)
- Over-relying on `console.log` instead of using `debugger` + breakpoints for complex state
- Assuming `console.log` of an object shows its state at the log moment (it shows a live reference — use `JSON.parse(JSON.stringify(obj))` to snapshot)
- Not using `console.error` vs `console.log` — errors have stack traces
- Calling `console.timeEnd` with a different label than `console.time`

## 📝 Practice Exercises
**Beginner**
1. Use `console.table` to display an array of 3 book objects with `title`, `author`, `year` properties.
2. Add `console.time` / `console.timeEnd` around a loop of 10,000 iterations and log the duration.
3. Use `console.group` to organize log output for a function that validates a user object.

**Intermediate**
4. Insert `debugger` inside a recursive `fibonacci(n)` function and step through 5 calls watching `n` and the call stack.
5. Use `console.trace` inside an event handler to identify all code paths that trigger a button click.
6. Given a buggy `mergeSort` implementation, use breakpoints and watch expressions to find the out-of-bounds array access.

**Advanced**
7. Write a `traceCalls(fn)` higher-order function that wraps any function with `console.group`, `console.time`, `console.count`, and `console.trace` for every invocation.
8. Using DevTools memory profiler and `performance.mark()` / `performance.measure()`, profile a large data transformation pipeline and optimize the bottleneck with the console data.
