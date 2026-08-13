# 19. Python Match (Structural Pattern Matching)

## 📘 Introduction
Introduced in **Python 3.10**, `match-case` provides **structural pattern matching** — a powerful control flow construct inspired by pattern matching in functional languages like Haskell, Scala, and Rust. Unlike a traditional `if-elif-else` chain, `match` allows matching against the **structure** of data, not just its value. The `match` statement takes a subject expression and compares it against one or more patterns in `case` blocks. Patterns can match literals, variable names, sequences (lists, tuples), mappings (dicts), objects, and more. The wildcard pattern `_` matches anything. Guard conditions (`if`) add extra constraints. OR patterns (`|`) match multiple alternatives. This feature shines when processing complex nested data like JSON, AST nodes, or command-line arguments, reducing verbose `isinstance()` and indexing checks into clean, readable patterns. Python's pattern matching is both a statement and an expression in terms of readability.

## 🧠 Key Concepts

- **`match` Statement**: `match subject:` — evaluates `subject` and compares against patterns
- **`case` Blocks**: `case pattern:` — if pattern matches, executes the block. Only the first matching case runs
- **Literal Patterns**: Match exact values: `case 1:`, `case "hello":`, `case True:`
- **Variable Patterns**: `case x:` — binds the subject to variable `x` (captures any value). A bare `_` is the wildcard
- **OR Patterns**: `case 1 | 2 | 3:` — matches if subject equals any of the alternatives
- **Guard Conditions**: `case x if x > 0:` — adds extra condition beyond the pattern match
- **Sequence Patterns**: `case [a, b, c]:` — matches sequences of specific length. Use `*rest` to capture remaining elements
- **Mapping Patterns**: `case {"key": value}:` — matches dicts with specific keys
- **Object Patterns**: `case Point(x=0, y=y):` — matches objects with specific attribute values (requires keyword args)
- **Wildcard `_`**: Matches anything, binds nothing. Used as default/catch-all
- **Constant Patterns**: Use dotted names (like `enum.Enum`) to match against constants. Bare names are treated as variables
- **Nested Patterns**: Patterns can be arbitrarily nested: `case {"data": [{"id": id}, *rest]}:`

## 💻 Syntax

```python
# Basic match-case
def describe(value):
    match value:
        case 0:
            return "Zero"
        case 1:
            return "One"
        case 2 | 3 | 5 | 7:
            return "Prime digit"
        case _:
            return "Something else"

print(describe(3))      # Prime digit
print(describe(10))     # Something else

# Patterns with sequences
def process_list(lst):
    match lst:
        case []:
            return "Empty list"
        case [x]:
            return f"Single element: {x}"
        case [x, y]:
            return f"Two elements: {x} and {y}"
        case [first, *middle, last]:
            return f"First: {first}, Last: {last}, Middle count: {len(middle)}"

print(process_list([1, 2, 3, 4, 5]))   # First: 1, Last: 5, Middle count: 3

# Guards
def classify_number(n):
    match n:
        case x if x < 0:
            return "Negative"
        case 0:
            return "Zero"
        case x if x % 2 == 0:
            return "Positive even"
        case _:
            return "Positive odd"

# Matching dictionaries
def handle_command(cmd):
    match cmd:
        case {"type": "quit"}:
            return "Quitting..."
        case {"type": "move", "x": x, "y": y}:
            return f"Moving to ({x}, {y})"
        case {"type": "say", "message": msg}:
            return f"Saying: {msg}"
        case _:
            return "Unknown command"

print(handle_command({"type": "move", "x": 10, "y": 20}))  # Moving to (10, 20)

# Object patterns
from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

def locate(point):
    match point:
        case Point(x=0, y=0):
            return "Origin"
        case Point(x=0, y=y):
            return f"On Y-axis at y={y}"
        case Point(x=x, y=0):
            return f"On X-axis at x={x}"
        case Point(x=x, y=y):
            return f"Point at ({x}, {y})"
```

## ✅ Example 1 - Basic

**Problem**: Write a function that processes HTTP status codes and returns human-readable messages.

**Code**:
```python
def http_status(code: int) -> str:
    match code:
        case 200:
            return "OK"
        case 201:
            return "Created"
        case 301 | 302:
            return "Redirect"
        case 400:
            return "Bad Request"
        case 401 | 403:
            return "Authorization Error"
        case 404:
            return "Not Found"
        case 500 | 502 | 503:
            return "Server Error"
        case _ if 100 <= code <= 199:
            return "Informational"
        case _ if 300 <= code <= 399:
            return "Redirection"
        case _:
            return f"Unknown status: {code}"

print(http_status(404))   # Not Found
print(http_status(302))   # Redirect
print(http_status(250))   # Informational
```

**Output**:
```
Not Found
Redirect
Informational
```

**Explanation**: Literal patterns match exact status codes. OR patterns (`|`) group related codes (3xx redirects, 5xx server errors). Guards (`if`) handle ranges. The wildcard `_` catches any unmatched code. This is cleaner than an equivalent `if-elif` chain with multiple `or` operators.

## 🚀 Example 2 - Intermediate

**Problem**: Parse and evaluate simple arithmetic expressions represented as nested tuples: `("add", 5, 3)` or `("mul", ("add", 2, 3), 4)`.

**Code**:
```python
def evaluate(expr):
    match expr:
        # Literal number
        case int(n):
            return n
        case float(n):
            return n
        # Binary operations
        case ("add", left, right):
            return evaluate(left) + evaluate(right)
        case ("sub", left, right):
            return evaluate(left) - evaluate(right)
        case ("mul", left, right):
            return evaluate(left) * evaluate(right)
        case ("div", left, right):
            return evaluate(left) / evaluate(right)
        case ("pow", base, exp):
            return evaluate(base) ** evaluate(exp)
        case _:
            raise ValueError(f"Unknown expression: {expr}")

# Test expressions
expr1 = ("add", 5, 3)                              # 5 + 3 = 8
expr2 = ("mul", ("add", 2, 3), 4)                  # (2 + 3) * 4 = 20
expr3 = ("pow", ("sub", 10, 8), ("add", 1, 1))     # (10 - 8) ** (1 + 1) = 4

print(f"expr1: {evaluate(expr1)}")
print(f"expr2: {evaluate(expr2)}")
print(f"expr3: {evaluate(expr3)}")
```

**Output**:
```
expr1: 8
expr2: 20
expr3: 4
```

**Explanation**: The match statement destructures nested tuple patterns. `case ("add", left, right):` matches a 2-tuple with `"add"` as first element and binds the remaining elements to `left` and `right`. Recursive calls to `evaluate()` handle sub-expressions. The `case int(n)` and `case float(n)` variable patterns capture literal numbers. This pattern-matching approach is far cleaner than manual `isinstance()` and index-based extraction.

## 🏢 Real World Use Case

**Company**: Red Hat (Ansible)

**Scenario**: Ansible, a configuration management tool, uses structural pattern matching to process YAML/JSON playbooks. A playbook is a complex nested structure — `match-case` elegantly handles the different task types. A task like installing a package matches `case {"name": "package", "state": "present", "package": pkg}:`. File operations match `case {"name": "file", "path": p, "content": c}:`. Service management matches `case {"name": "service", "state": "started", "service": svc}:`. Guards validate constraints (`case x if x["become"] == True:`). OR patterns handle aliases (`"state": "absent" | "removed"`). The wildcard `_` catches unknown task types and produces helpful error messages. This replaced verbose `if-elif` chains with `isinstance()` and `dict.get()` calls.

## 🎯 Interview Questions

**1. What Python version introduced structural pattern matching and what is it called?**
Python 3.10 introduced `match-case` — structural pattern matching. It is a `match` statement containing `case` blocks, supporting literal, variable, sequence, mapping, and object patterns.

**2. How does the wildcard `_` work in pattern matching?**
`_` matches any value but does **not** bind it to a variable. It acts as a catch-all/default case and indicates the matched value is intentionally ignored. If you want to capture the value, use a named variable pattern like `case x:`.

**3. What is the difference between `case 0:` and `case x:`?**
`case 0:` is a literal pattern — it matches only the integer `0`. `case x:` is a variable pattern — it matches **any** value and binds it to `x`. A variable pattern always succeeds, so it should come last (after more specific patterns).

**4. How do guards work in match-case?**
A guard is an `if` clause after the pattern: `case pattern if condition:`. The guard is evaluated only if the pattern matches. If the guard is falsy, the pattern is considered non-matching and Python proceeds to the next case. Guards can reference variables bound in the pattern.

**5. Can you match against class instances? How?**
Yes, using object patterns: `case ClassName(attr=pattern, ...):`. The class must support positional or keyword pattern matching. Dataclasses work out of the box. You can also define `__match_args__` in your class to support positional matching. Example: `case Point(0, y):` matches a Point with x=0, binding the y coordinate.

## ⚠ Common Errors / Mistakes

**Error**: Using bare variable names as literal patterns
```python
ZERO = 0
match x:
    case ZERO:  # This is a variable pattern, not matching against 0!
```
**Fix**: Use dotted constants: `class Constants: ZERO = 0` then `case Constants.ZERO:`. Or use `enum.Enum`.

**Error**: Forgetting the colon after `case`
```python
match x:
    case 0    # SyntaxError
```
**Fix**: Always add `:` after the pattern (including guards): `case 0:`

**Error**: OR pattern with capture variables inconsistently
```python
case (1 | x):   # SyntaxError: cannot use OR pattern with named capture
```
**Fix**: OR patterns cannot capture variables in different alternatives. Use separate cases instead.

**Error**: Placing a variable pattern before a literal pattern
```python
match x:
    case y:     # Matches everything, next cases never reached!
    case 0:
        ...
```
**Fix**: Put more specific (literal) patterns first, variable patterns last.

**Error**: Using `match` as a variable name after Python 3.10 (no longer works as variable since it's now a soft keyword)
```python
match = 5   # Works, match is a soft keyword
match 5:    # SyntaxError? No — Python can tell from context
```
**Note**: `match` is a **soft keyword** — it's only recognized as a keyword in the context of a `match` statement. You can still use `match` as a variable name, but it's confusing and not recommended.

## 📝 Practice Exercises

**Beginner:**

1. Write a function `describe_color(color)` that uses `match-case` to return descriptions for "red", "green", "blue", and "unknown" for anything else.
2. Write a function `day_type(day)` that takes "mon" through "sun" and returns "Weekday" or "Weekend" using OR patterns.
3. Use `match-case` on a number to print whether it is 1, 2, 3, or "other".

**Intermediate:**

4. Write a function `parse_shape(shape)` that uses pattern matching on tuples. `("circle", r)` returns area of circle, `("rect", w, h)` returns area of rectangle, `("triangle", b, h)` returns area of triangle.
5. Write a function `classify_http_request(request)` where `request` is a dict with keys `method`, `path`, `body`. Handle GET, POST with different bodies, and unknown methods. Use mapping patterns.
6. Write a function `evaluate_boolean(expr)` that evaluates Boolean expressions using pattern matching: `True`, `False`, `("not", e)`, `("and", left, right)`, `("or", left, right)`.

**Advanced:**

7. Implement a simple JSON validator using pattern matching that checks if a parsed JSON structure matches a given schema defined as nested patterns.
8. Write a function `simplify(expr)` that simplifies algebraic expressions using pattern matching. Handle rules like `("add", 0, x)` → `x`, `("mul", 0, x)` → `0`, `("mul", 1, x)` → `x`, `("pow", x, 0)` → `1`, `("pow", x, 1)` → `x`.
