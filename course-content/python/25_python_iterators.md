## 25. Python Iterators

## 📘 Introduction
An iterator in Python is an object that allows you to traverse through a sequence of elements one at a time. Any object that implements the iterator protocol — which consists of the `__iter__()` and `__next__()` methods — is an iterator. The `__iter__()` method returns the iterator object itself, and `__next__()` returns the next value in the sequence, raising `StopIteration` when the sequence is exhausted. Iterators are the mechanism that makes `for` loops work internally. When you write `for x in my_list:`, Python calls `iter(my_list)` to get an iterator, then repeatedly calls `next()` on it until `StopIteration` is raised. Understanding iterators is critical for writing clean Python code, creating custom iterable objects, and leveraging Python's `itertools` module for efficient data processing pipelines. Iterators are lazy — they produce values on demand, which makes them memory-efficient for large or infinite sequences.

## 🧠 Key Concepts

- **`__iter__()`** — Returns the iterator object itself; called by `iter(obj)`
- **`__next__()`** — Returns the next element; called by `next(obj)`; raises `StopIteration` when done
- **`StopIteration`** — Exception raised to signal the end of iteration
- **`for` loop internals** — Python calls `iter()` on the iterable, then `next()` in a loop until `StopIteration`
- **Iterable vs Iterator** — An iterable has `__iter__()` returning an iterator; an iterator has both `__iter__()` and `__next__()`
- **Lazy evaluation** — Values generated on demand, not stored in memory
- **Custom iterators** — Classes that implement the iterator protocol
- **`itertools` module** — Built-in library of efficient iterator tools
- **`itertools.count(start, step)`** — Infinite arithmetic progression
- **`itertools.cycle(iterable)`** — Infinite repetition of an iterable
- **`itertools.repeat(object, times)`** — Repeat an object a specified number of times
- **Generator functions** — Functions using `yield` that return iterator objects
- **Memory efficiency** — Iterators don't store all values; they yield one at a time

## 💻 Syntax

```python
# Basic iteration with next()
my_list = [10, 20, 30]
it = iter(my_list)       # calls my_list.__iter__()
print(next(it))          # 10 — calls it.__next__()
print(next(it))          # 20
print(next(it))          # 30
# print(next(it))        # StopIteration raised

# Custom iterator class
class Counter:
    def __init__(self, low, high):
        self.current = low
        self.high = high

    def __iter__(self):
        return self       # iterator returns itself

    def __next__(self):
        if self.current > self.high:
            raise StopIteration
        self.current += 1
        return self.current - 1

# Using the custom iterator
for num in Counter(1, 5):
    print(num)            # 1, 2, 3, 4, 5

# Generator (simpler way to create iterators)
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for x in countdown(3):
    print(x)              # 3, 2, 1
```

**Line-by-line explanation:**
- `iter(my_list)` calls `my_list.__iter__()` to get the iterator object
- `next(it)` calls `it.__next__()` to get each value
- `StopIteration` is a built-in exception signaling the end of iteration
- In the custom `Counter` class, `__iter__` returns `self` (the iterator)
- `__next__` increments `self.current` and returns the previous value
- When `self.current > self.high`, `StopIteration` is raised to end the loop
- A generator function with `yield` automatically creates an iterator
- Each `yield` pauses execution and returns a value; the next call resumes

## ✅ Example 1 - Basic

**Problem:** Create a custom iterator `FibonacciIterator` that generates Fibonacci numbers up to a specified limit, and use it in a `for` loop.

**Code:**
```python
class FibonacciIterator:
    """Custom iterator that generates Fibonacci numbers up to a limit."""

    def __init__(self, limit):
        self.limit = limit
        self.a, self.b = 0, 1

    def __iter__(self):
        return self

    def __next__(self):
        if self.a > self.limit:
            raise StopIteration

        current = self.a
        self.a, self.b = self.b, self.a + self.b
        return current

# Use the custom iterator
print("Fibonacci numbers up to 100:")
for fib in FibonacciIterator(100):
    print(fib, end=" ")
print()

# Also demonstrate manual next() usage
fib_iter = FibonacciIterator(20)
print("\nManual iteration:")
print(next(fib_iter))  # 0
print(next(fib_iter))  # 1
print(next(fib_iter))  # 1
print(next(fib_iter))  # 2
print(next(fib_iter))  # 3
print(next(fib_iter))  # 5
print(next(fib_iter))  # 8
print(next(fib_iter))  # 13
```

**Output:**
```
Fibonacci numbers up to 100:
0 1 1 2 3 5 8 13 21 34 55 89

Manual iteration:
0
1
1
2
3
5
8
13
```

**Explanation:**
- `__init__` sets the limit and initial Fibonacci values (a=0, b=1)
- `__iter__` returns `self` — this is an iterator, not just an iterable
- `__next__` checks if `self.a` exceeds the limit; if so, raises `StopIteration`
- The Fibonacci calculation uses tuple unpacking: `self.a, self.b = self.b, self.a + self.b`
- `current` stores the value before updating for the next iteration
- The `for` loop automatically handles `StopIteration` and stops
- Manual `next()` calls show the step-by-step iteration process
- Once the iterator is exhausted, further `next()` calls raise `StopIteration`

## 🚀 Example 2 - Intermediate

**Problem:** Use `itertools.count()`, `itertools.cycle()`, and `itertools.repeat()` to build a pagination system that cycles through page statuses and generates repeating header content.

**Code:**
```python
from itertools import count, cycle, repeat

# Simulate a paginated API response
page_statuses = ["active", "active", "inactive", "active", "archived"]

print("=== Page Number Generator (count) ===")
# Infinite counter starting at 1
page_numbers = count(1)
for _ in range(5):
    print(f"Page {next(page_numbers)}")

print("\n=== Status Cycling (cycle) ===")
# Infinitely cycle through statuses
status_cycler = cycle(page_statuses)
for i in range(8):
    print(f"Request {i+1}: status = {next(status_cycler)}")

print("\n=== Header Repeat (repeat) ===")
# Repeat a header 3 times
for header in repeat("--- Page Header ---", 3):
    print(header)

# Practical: generate unique IDs with count
print("\n=== Practical: Unique Transaction IDs ===")
transaction_ids = count(1000, 5)  # start=1000, step=5
for _ in range(4):
    tid = next(transaction_ids)
    print(f"Transaction #{tid} processed")
```

**Output:**
```
=== Page Number Generator (count) ===
Page 1
Page 2
Page 3
Page 4
Page 5

=== Status Cycling (cycle) ===
Request 1: status = active
Request 2: status = active
Request 3: status = inactive
Request 4: status = active
Request 5: status = archived
Request 6: status = active
Request 7: status = active
Request 8: status = inactive

=== Header Repeat (repeat) ===
--- Page Header ---
--- Page Header ---
--- Page Header ---

=== Practical: Unique Transaction IDs ===
Transaction #1000 processed
Transaction #1005 processed
Transaction #1010 processed
Transaction #1015 processed
```

**Explanation:**
- `itertools.count(1)` generates an infinite sequence: 1, 2, 3, 4, 5, ...
- `itertools.cycle(page_statuses)` infinitely repeats the status list
- `itertools.repeat("--- Page Header ---", 3)` repeats the string exactly 3 times
- `itertools.count(1000, 5)` starts at 1000 and increments by 5 each step
- All three functions return iterators — they produce values lazily
- `cycle` and `count` are infinite; `repeat` without `times` is also infinite
- These are memory-efficient because they don't store all generated values

## 🏢 Real World Use Case

**Company: Uber** — Uber's real-time ride matching system uses iterators and `itertools` extensively. Ride requests arrive as a continuous stream, and the matching algorithm uses `itertools.count()` to assign unique request IDs. The dispatch system uses `itertools.cycle()` to round-robin through available drivers in a region. Custom iterators are implemented for geospatial data — for example, a `DriverProximityIterator` that yields nearby drivers one at a time in order of increasing distance, using lazy evaluation so that the system doesn't need to sort all drivers upfront. The `itertools.islice()` function is used to take batches of requests for batch processing. Uber also uses generator-based iterators for processing streaming GPS data, where each `yield` produces a location update without storing the entire route in memory.

**Other uses:** Database cursor implementations (fetching rows one at a time), streaming data processing (Kafka consumers), infinite scrolling in web applications, and large file processing (reading line by line).

## 🎯 Interview Questions

**1. What is the difference between an iterable and an iterator?**

An iterable is any object that implements `__iter__()` which returns an iterator. Examples: lists, tuples, strings, dicts. An iterator is an object that implements both `__iter__()` (returning `self`) and `__next__()` (returning the next value or raising `StopIteration`). All iterators are iterables, but not all iterables are iterators. A list is iterable but not an iterator — you can get multiple independent iterators from it.

**2. How does a `for` loop work internally in Python?**

When you write `for x in obj:`, Python: (1) calls `iter(obj)` which invokes `obj.__iter__()` to get an iterator; (2) repeatedly calls `next(iterator)` which invokes `iterator.__next__()`; (3) assigns the returned value to `x` and executes the loop body; (4) catches `StopIteration` and exits the loop gracefully. This is roughly equivalent to: `it = iter(obj); while True: try: x = next(it); print(x); except StopIteration: break`.

**3. What are the advantages of lazy evaluation with iterators?**

Lazy evaluation means values are computed on demand, not stored in memory. Benefits include: (1) handling infinite sequences (e.g., `itertools.count()`); (2) memory efficiency for large datasets (processing one item at a time); (3) performance — computation is deferred until needed; (4) ability to represent sequences that would be impractical to store (e.g., all prime numbers). The trade-off is that you can only traverse forward once (one-pass).

**4. Explain `__iter__` and `__next__` protocol with an example.**

The iterator protocol requires implementing `__iter__()` (returns `self`) and `__next__()` (returns next or raises `StopIteration`). Example: A `SquareIterator` class that yields squares of numbers up to `n`:
```python
class SquareIterator:
    def __init__(self, n):
        self.n = n
        self.i = 0
    def __iter__(self):
        return self
    def __next__(self):
        if self.i >= self.n:
            raise StopIteration
        result = self.i ** 2
        self.i += 1
        return result
```

**5. What is the relationship between generators and iterators?**

Generators are a simpler way to create iterators. Any function containing `yield` is a generator function — it returns a generator object, which is an iterator. Generators automatically implement `__iter__()` and `__next__()`, and raise `StopIteration` when the function returns. Generators also maintain their state between calls (local variables are preserved). So every generator is an iterator, but custom iterators can have more complex state management.

## ⚠ Common Errors / Mistakes

**Error 1: Exhausting an iterator and trying to reuse it**
```python
# BAD — iterator is exhausted after one pass
numbers = [1, 2, 3]
it = iter(numbers)
print(list(it))  # [1, 2, 3]
print(list(it))  # [] — iterator is exhausted!

# FIX — create a new iterator for each pass
it1 = iter(numbers)
it2 = iter(numbers)
print(list(it1))  # [1, 2, 3]
print(list(it2))  # [1, 2, 3]
```

**Error 2: Forgetting to raise StopIteration**
```python
# BAD — missing StopIteration causes infinite loop
class BadIterator:
    def __init__(self, n):
        self.n = n
        self.i = 0
    def __iter__(self):
        return self
    def __next__(self):
        if self.i < self.n:
            result = self.i
            self.i += 1
            return result
        # Missing: raise StopIteration — loop runs forever!

# FIX
    def __next__(self):
        if self.i >= self.n:
            raise StopIteration
        result = self.i
        self.i += 1
        return result
```

**Error 3: Confusing iterable with iterator**
```python
# BAD — list doesn't have __next__
my_list = [1, 2, 3]
next(my_list)  # TypeError: 'list' object is not an iterator

# FIX — get an iterator first
it = iter(my_list)
next(it)  # 1
```

**Error 4: Modifying a collection while iterating**
```python
# BAD — RuntimeError: dictionary changed size during iteration
d = {"a": 1, "b": 2, "c": 3}
for k in d:
    if k == "b":
        del d[k]  # RuntimeError during iteration

# FIX — iterate over a copy
for k in list(d):
    if k == "b":
        del d[k]
```

**Error 5: Not calling next() in a generator**
```python
# BAD — creating generator doesn't execute it
def my_gen():
    yield 1
    yield 2
    yield 3

g = my_gen()  # creates generator object, nothing executes
print(g)      # <generator object my_gen at 0x...>

# FIX — iterate or call next()
print(list(g))  # [1, 2, 3]
# or
g = my_gen()
print(next(g))  # 1
```

## 📝 Practice Exercises

**Beginner:**
1. Create a custom iterator `EvenNumbers` that yields even numbers from 0 up to a given limit `n`. Use it in a `for` loop.
2. Use `iter()` and `next()` to manually iterate over a string "PYTHON" and print each character.
3. Write a generator function `squares(n)` that yields the square of numbers from 1 to `n`.

**Intermediate:**
4. Create a custom iterator `PowerIterator(base, max_exp)` that yields `base^exp` for `exp` from 0 to `max_exp`. Implement both `__iter__` and `__next__`.
5. Use `itertools.cycle()` to simulate a traffic light system that cycles through "Red", "Yellow", "Green" indefinitely. Print 10 state changes.
6. Write a generator function `read_in_chunks(file_path, chunk_size=1024)` that yields chunks of a file without loading the entire file into memory.

**Advanced:**
7. Implement a custom `CircularBufferIterator` class that wraps a fixed-size list as a circular buffer. It should support adding elements and iterating over all elements (oldest to newest) using the iterator protocol.
8. Create an iterator class `MergedSortedIterator` that takes two sorted iterators and yields elements in merged sorted order (similar to merging in merge sort). Handle iterators of different lengths.
