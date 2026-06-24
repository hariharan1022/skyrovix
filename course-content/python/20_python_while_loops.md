# 20. Python While Loops

## 📘 Introduction
The `while` loop in Python repeatedly executes a block of code as long as a given condition remains truthy. It is the most fundamental looping construct, useful when the number of iterations is not known in advance — unlike `for` loops which iterate over a known sequence. The basic syntax is straightforward: `while condition:` followed by an indented block. The loop checks the condition before each iteration; if it's falsy, the loop terminates and execution continues with the next statement after the loop. Common patterns include sentinel-controlled loops (looping until a special value is entered), infinite loops (which must be broken explicitly with `break`), and loops that process data until a resource is exhausted. The `break` statement exits the loop immediately, `continue` skips the rest of the current iteration and jumps to the next condition check, and the optional `else` clause executes only if the loop completed normally (without `break`). While loops are powerful but require care to avoid infinite loops.

## 🧠 Key Concepts

- **`while` Syntax**: `while condition:` — the block executes repeatedly as long as `condition` is truthy
- **Condition Checked First**: If the condition is initially `False`, the body never executes (zero iterations)
- **Infinite Loops**: `while True:` — runs forever unless exited via `break`. Useful for event loops, servers, or user input
- **`break`**: Exits the loop immediately. Execution resumes after the loop body
- **`continue`**: Skips the rest of the current iteration and re-evaluates the condition
- **`else` Clause**: `while ... else:` — the `else` block runs **only if** the loop terminated normally (condition became `False`), **not** if exited via `break`
- **Sentinel Values**: A special value that signals loop termination (e.g., `"quit"`, `None`, empty string)
- **Flag Variables**: A Boolean variable controlling the loop: `running = True; while running:`
- **Loop and a Half Idiom**: Using `while True:` with a `break` mid-loop to handle cases where condition is checked in the middle
- **Common Pitfalls**: Forgetting to update the loop variable (infinite loop), off-by-one errors, using `==` instead of `=` in condition updates

## 💻 Syntax

```python
# Basic while loop
count = 0
while count < 5:
    print(count)
    count += 1
# Prints: 0 1 2 3 4

# break — exit loop early
n = 0
while True:
    if n >= 3:
        break
    print(n)
    n += 1
# Prints: 0 1 2

# continue — skip current iteration
n = 0
while n < 5:
    n += 1
    if n == 3:
        continue
    print(n)
# Prints: 1 2 4 5

# else clause
n = 0
while n < 3:
    print(n)
    n += 1
else:
    print("Loop completed without break")
# Prints: 0 1 2 "Loop completed without break"

# else does NOT run if break occurred
n = 0
while n < 3:
    if n == 1:
        break
    print(n)
    n += 1
else:
    print("Won't print")
# Prints: 0

# Sentinel-controlled loop
while True:
    user_input = input("Enter name (or 'quit'): ")
    if user_input == "quit":
        break
    print(f"Hello, {user_input}")

# Flag variable
running = True
total = 0
while running:
    num = int(input("Enter number (0 to stop): "))
    if num == 0:
        running = False
    else:
        total += num
print(f"Total: {total}")
```

## ✅ Example 1 - Basic

**Problem**: Write a number guessing game where the user guesses a random number between 1 and 10, with hints.

**Code**:
```python
import random

target = random.randint(1, 10)
guess = None

while guess != target:
    guess = int(input("Guess (1-10): "))
    if guess < target:
        print("Too low!")
    elif guess > target:
        print("Too high!")

print(f"Correct! The number was {target}")
```

**Output**:
```
Guess (1-10): 5
Too low!
Guess (1-10): 8
Too low!
Guess (1-10): 9
Correct! The number was 9
```

**Explanation**: The while loop continues as long as `guess != target`. Initially `guess` is `None`, which is not equal to the target (a valid integer), so the condition is `True`. Each iteration updates `guess` with user input. When `guess == target`, the condition becomes `False` and the loop ends.

## 🚀 Example 2 - Intermediate

**Problem**: Implement a simple interactive calculator that repeatedly accepts expressions until the user types "exit". Handle division by zero gracefully.

**Code**:
```python
print("Simple Calculator (type 'exit' to quit)")

while True:
    expr = input("Enter expression (e.g., 5 + 3): ").strip()
    
    if expr.lower() == "exit":
        print("Goodbye!")
        break
    
    # Parse: "a op b"
    parts = expr.split()
    if len(parts) != 3:
        print("Invalid format. Use: number operator number")
        continue
    
    a_str, op, b_str = parts
    
    try:
        a = float(a_str)
        b = float(b_str)
    except ValueError:
        print("Invalid numbers. Try again.")
        continue
    
    if op == "+":
        result = a + b
    elif op == "-":
        result = a - b
    elif op == "*":
        result = a * b
    elif op == "/":
        if b == 0:
            print("Error: Division by zero!")
            continue
        result = a / b
    else:
        print("Unknown operator. Use +, -, *, /")
        continue
    
    print(f"Result: {result}")
```

**Output**:
```
Simple Calculator (type 'exit' to quit)
Enter expression (e.g., 5 + 3): 10 / 2
Result: 5.0
Enter expression (e.g., 5 + 3): 5 / 0
Error: Division by zero!
Enter expression (e.g., 5 + 3): exit
Goodbye!
```

**Explanation**: `while True:` creates an infinite loop. The sentinel value `"exit"` triggers `break` to exit. `continue` skips invalid input, returning to the prompt. Input validation uses `try-except`. Division by zero is checked before computing. The `else` clause could also be added to `while` to log completion stats. This pattern is used in CLI tools, REPLs, and interactive menus.

## 🏢 Real World Use Case

**Company**: Twilio (Communications API)

**Scenario**: Twilio's event processing system uses `while` loops with sentinel control to process streaming telephony events. A while loop reads from a message queue: `while not queue.empty(): event = queue.get()`. The loop processes call records (SMS delivery status, call duration, DTMF input) until the queue is drained. Infinite loops with `break` handle WebSocket connections — reading frames until a close frame is received. The `else` clause logs when a batch of events completes normally. `continue` skips malformed events without crashing the processor. Sentinel values like `None` or empty strings signal end-of-stream. Flag variables control graceful shutdown when a `SIGTERM` signal is received: `while running: process_event()` — the signal handler sets `running = False`, allowing the loop to finish the current event before stopping.

## 🎯 Interview Questions

**1. What is the difference between `while` and `for` loops?**
`for` loops iterate over a known sequence (list, string, range, etc.). `while` loops iterate as long as a condition is truthy — the number of iterations may be unknown. Use `for` when iterating over collections; use `while` when waiting for a condition to change or when the iteration count is unpredictable.

**2. How does `else` work with `while`?**
The `else` block executes **only if** the loop terminated normally (the condition became `False`). It does **not** execute if the loop was exited via `break`. Use it for "no-break" cleanup or success confirmation. Example: searching in a list — `else:` runs if the item was never found.

**3. What is a sentinel value and how is it used in while loops?**
A sentinel is a special value that signals the end of input or loop termination. The loop reads input until the sentinel appears. Common sentinels: `None`, empty string `""`, `-1`, `"quit"`, `"exit"`. Example: `while (data := input()) != "":` reads lines until an empty line.

**4. How can you prevent an infinite loop?**
Ensure the loop variable is updated inside the loop body toward making the condition `False`. Use `break` for conditional early exit. Add a maximum iteration guard: `while condition and iterations < max_iter:`. Always verify that the condition will eventually become falsy or that a `break` path exists.

**5. What is the "loop and a half" problem and how do you solve it?**
The "loop and a half" problem occurs when you need to perform an operation, then check a condition, then possibly repeat. A naive `while` checks the condition before executing, but you need to execute first and check later. Solution: use `while True:` with a `break` in the middle: `while True: data = get(); if not data: break; process(data)`.

## ⚠ Common Errors / Mistakes

**Error**: Infinite loop — forgetting to update the loop variable
```python
n = 0
while n < 5:
    print(n)
    # missing n += 1 → infinite loop!
```
**Fix**: Always ensure the loop variable progresses toward the termination condition.

**Error**: Infinite loop — condition never becomes False
```python
x = 1
while x != 10:
    x += 2   # x: 1, 3, 5, 7, 9, 11... skips 10!
```
**Fix**: Use appropriate condition: `while x < 10:` or `while x <= 10:`

**Error**: Using `=` instead of `==` in condition update
```python
while running:
    # ...
    running == False   # No effect — comparison, not assignment!
```
**Fix**: Use `running = False` (single `=`) to update. This is not a syntax error, just a logic bug.

**Error**: `break` inside nested loops only breaks the inner loop
```python
while outer:
    while inner:
        if condition:
            break   # only breaks inner loop
```
**Fix**: Use a flag or refactor into a function with `return`.

**Error**: `continue` accidentally skipping the increment
```python
n = 0
while n < 5:
    if n == 2:
        continue
    print(n)
    n += 1   # When n=2, continue skips this → infinite loop!
```
**Fix**: Increment before `continue`, or use a `for` loop instead.

## 📝 Practice Exercises

**Beginner:**

1. Write a program using a `while` loop that prints numbers from 1 to 10.
2. Use a `while` loop to sum all numbers entered by the user until they enter 0.
3. Write a program that keeps asking the user for a password until they enter "python123".

**Intermediate:**

4. Write a function `collatz(n)` that implements the Collatz sequence: if n is even, divide by 2; if odd, multiply by 3 and add 1. Print each step until n reaches 1.
5. Implement a simple ATM simulation: start with a balance of $1000. Repeatedly ask for withdraw amount, validate sufficient funds, update balance. Exit when user types "exit" or balance is 0.
6. Write a function `digit_sum_until_single(n)` that repeatedly sums the digits of a number until a single digit remains (e.g., 942 → 9+4+2=15 → 1+5=6). Use a `while` loop.

**Advanced:**

7. Implement a text-based guessing game: the computer picks a random number between 1-100. The user has unlimited guesses but gets "warmer/colder" hints based on whether the current guess is closer or further than the previous guess. Track guess count and congratulate the user when they win.
8. Write a function `simulate_election(candidates, votes)` that simulates ranked-choice voting using a while loop. Each round eliminates the candidate with the fewest votes and redistributes their votes to the next preference, continuing until one candidate has a majority.
