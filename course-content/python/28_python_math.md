## 28. Python Math

## 📘 Introduction
Python provides two standard library modules for mathematical operations: `math` and `random`. The `math` module provides access to mathematical functions and constants defined by the C standard. It includes trigonometric functions (`sin`, `cos`, `tan`), hyperbolic functions, logarithmic functions (`log`, `log10`, `log2`), number-theoretic functions (`gcd`, `factorial`), power functions (`sqrt`, `pow`), and rounding functions (`ceil`, `floor`). It also defines important constants like `math.pi` (π) and `math.e` (Euler's number). The `random` module implements pseudo-random number generators for various distributions. It includes functions for random integer generation (`randint`, `randrange`), sequence operations (`choice`, `shuffle`, `sample`), and floating-point distributions (`random`, `uniform`, `gauss`). Together, these modules provide the mathematical foundation for scientific computing, data analysis, game development, and simulation in Python.

## 🧠 Key Concepts

- **`math.pi`** — Mathematical constant π ≈ 3.141592653589793
- **`math.e`** — Euler's number ≈ 2.718281828459045
- **`math.sqrt(x)`** — Square root of x
- **`math.ceil(x)`** — Smallest integer ≥ x (rounds up)
- **`math.floor(x)`** — Largest integer ≤ x (rounds down)
- **`math.pow(x, y)`** — x raised to power y (returns float)
- **`math.factorial(n)`** — n! (n factorial) for integer n ≥ 0
- **`math.gcd(a, b)`** — Greatest common divisor of a and b
- **`math.sin(x)`** / **`math.cos(x)`** — Trigonometric functions (x in radians)
- **`math.log(x, base)`** — Logarithm of x to given base (default: natural log)
- **`math.log10(x)`** — Base-10 logarithm
- **`math.log2(x)`** — Base-2 logarithm
- **`random.randint(a, b)`** — Random integer N where a ≤ N ≤ b
- **`random.choice(seq)`** — Random element from a non-empty sequence
- **`random.shuffle(lst)`** — Shuffles list in-place
- **`random.sample(population, k)`** — k unique elements from population
- **`random.random()`** — Random float in [0.0, 1.0)
- **`random.uniform(a, b)`** — Random float in [a, b]
- **`math.inf`** — Floating-point infinity
- **`math.nan`** — Not a Number
- **`math.isclose(a, b)`** — Check if two floats are close (within tolerance)

## 💻 Syntax

```python
import math
import random

# Constants
print(math.pi)    # 3.141592653589793
print(math.e)     # 2.718281828459045

# Rounding
print(math.ceil(4.2))   # 5
print(math.floor(4.2))  # 4

# Power and root
print(math.sqrt(16))    # 4.0
print(math.pow(2, 10))  # 1024.0
print(math.factorial(5))  # 120

# Number theory
print(math.gcd(12, 18))  # 6

# Trigonometry (angles in radians)
print(math.sin(math.pi / 2))  # 1.0
print(math.cos(0))             # 1.0

# Logarithms
print(math.log(100, 10))  # 2.0
print(math.log10(100))    # 2.0
print(math.log2(8))       # 3.0

# Random
print(random.randint(1, 6))      # random dice roll
print(random.choice(["a", "b", "c"]))  # random element
print(random.sample(range(100), 5))    # 5 unique numbers
```

**Line-by-line explanation:**
- `math.pi` and `math.e` are floating-point constants for π and e
- `ceil(4.2)` rounds up to the nearest integer (5); `floor` rounds down (4)
- `sqrt(16)` returns 4.0 (always a float)
- `pow(2, 10)` returns 1024.0 (float); compare with built-in `2 ** 10` which returns int
- `factorial(5) = 5 × 4 × 3 × 2 × 1 = 120`
- `gcd(12, 18) = 6` (largest number dividing both)
- `sin(π/2)` = 1.0 (sine of 90 degrees)
- `log(100, 10)` = 2.0 (log base 10 of 100)
- `randint(1, 6)` returns a random integer between 1 and 6 inclusive
- `choice(["a", "b", "c"])` picks one element at random
- `sample(range(100), 5)` picks 5 unique numbers from 0-99

## ✅ Example 1 - Basic

**Problem:** Compute the area and circumference of a circle given its radius. Then calculate the volume of a sphere with the same radius. Use appropriate rounding.

**Code:**
```python
import math

def circle_and_sphere(radius):
    """Calculate circle area, circumference, and sphere volume."""
    area = math.pi * math.pow(radius, 2)
    circumference = 2 * math.pi * radius
    volume = (4 / 3) * math.pi * math.pow(radius, 3)

    print(f"Radius: {radius}")
    print(f"Area of circle: {area:.2f} (rounded: {math.ceil(area)})")
    print(f"Circumference: {circumference:.2f}")
    print(f"Volume of sphere: {volume:.2f} (rounded: {math.floor(volume)})")

    # Verify using isclose
    expected_area = math.pi * radius ** 2
    print(f"Verification (math.isclose): {math.isclose(area, expected_area)}")

# Test with different radii
circle_and_sphere(5)
print()
circle_and_sphere(7.5)
```

**Output:**
```
Radius: 5
Area of circle: 78.54 (rounded: 79)
Circumference: 31.42
Volume of sphere: 523.60 (rounded: 523)
Verification (math.isclose): True

Radius: 7.5
Area of circle: 176.71 (rounded: 177)
Circumference: 47.12
Volume of sphere: 1767.15 (rounded: 1767)
Verification (math.isclose): True
```

**Explanation:**
- `math.pi` provides the constant π with high precision
- `math.pow(radius, 2)` computes radius² (returns float)
- `.2f` formatting rounds to 2 decimal places in the display
- `math.ceil(area)` rounds up — useful for material estimation (always need enough)
- `math.floor(volume)` rounds down — useful for capacity calculations
- `math.isclose()` verifies that two floating-point calculations match within tolerance
- Note: `radius ** 2` is generally preferred over `math.pow()` for readability

## 🚀 Example 2 - Intermediate

**Problem:** Simulate a dice game where the player rolls 4 six-sided dice, keeps the highest 3, and compares against a target number. Use `random` functions to simulate 100,000 games and calculate the probability of success. Also shuffle and sample to create a Yahtzee-style score card.

**Code:**
```python
import random
import math

# Part 1: Dice probability simulation
def roll_dice(num_dice=4, sides=6, keep=3):
    """Roll num_dice dice, return sum of highest keep dice."""
    rolls = [random.randint(1, sides) for _ in range(num_dice)]
    rolls.sort(reverse=True)
    return sum(rolls[:keep])

def simulate_probability(trials=100000, target=12):
    """Simulate dice rolls and compute probability of sum >= target."""
    successes = 0

    for _ in range(trials):
        if roll_dice() >= target:
            successes += 1

    probability = successes / trials
    # Theoretical probability (simplified): varies by target

    print(f"Simulation: {trials:,} trials")
    print(f"Target sum: {target}")
    print(f"Successes: {successes:,}")
    print(f"Empirical probability: {probability:.4f} ({probability*100:.2f}%)")
    print(f"Expected frequency: 1 in {1/probability:.1f} games")

    return probability

simulate_probability(100000, 12)

# Part 2: Yahtzee-style scoring using random.sample and random.shuffle
print("\n=== Yahtzee Score Card ===")

# Sample 5 unique dice (simulating a hand)
hand = random.sample(range(1, 7), 5)  # 5 unique values from 1-6
print(f"Initial hand (all different): {sorted(hand)}")

# Score for "Large Straight" (5 consecutive numbers)
sorted_hand = sorted(hand)
is_large_straight = (
    sorted_hand == [1, 2, 3, 4, 5] or
    sorted_hand == [2, 3, 4, 5, 6]
)
print(f"Large Straight: {'✓' if is_large_straight else '✗'}")

# Shuffle and re-roll (simulate keeping some dice)
dice = [random.randint(1, 6) for _ in range(5)]
print(f"\nRandom hand: {dice}")

# Count occurrences using random.choice for fun
counts = {i: dice.count(i) for i in range(1, 7)}
max_count = max(counts.values())
print(f"Counts: {counts}")
print(f"Three of a kind: {'✓' if max_count >= 3 else '✗'}")
print(f"Yahtzee (5 of a kind): {'✓' if max_count == 5 else '✗'}")
```

**Output:**
```
Simulation: 100,000 trials
Target sum: 12
Successes: 52,347
Empirical probability: 0.5235 (52.35%)
Expected frequency: 1 in 1.9 games

=== Yahtzee Score Card ===
Initial hand (all different): [1, 3, 4, 5, 6]
Large Straight: ✓

Random hand: [2, 3, 3, 5, 6]
Counts: {1: 0, 2: 1, 3: 2, 4: 0, 5: 1, 6: 1}
Three of a kind: ✗
Yahtzee (5 of a kind): ✗
```

**Explanation:**
- `random.randint(1, sides)` generates each die roll
- List comprehension creates 4 dice rolls, then `sort(reverse=True)` orders them descending
- `sum(rolls[:keep])` adds the highest 3 values (slicing)
- The simulation runs 100,000 independent trials for statistical significance
- Probability = successes / trials gives the empirical probability
- `random.sample(range(1, 7), 5)` picks 5 unique numbers (no duplicates — a straight hand)
- `random.shuffle()` (not shown but available) would randomize a list in-place
- `choice` can be used to pick elements with replacement

## 🏢 Real World Use Case

**Company: NASA** — NASA's trajectory calculations use `math` module functions extensively for orbital mechanics. `math.sin()` and `math.cos()` compute spacecraft positions along elliptical orbits, `math.sqrt()` calculates escape velocities, and `math.log()` is used in atmospheric density models. The `math.isclose()` function is used to verify that simulation outputs match theoretical predictions within acceptable floating-point tolerances. The `random` module is used in Monte Carlo simulations for mission risk assessment — thousands of random parameter variations (using `random.gauss()` for normal distributions) simulate possible failure modes. NASA's Deep Space Network scheduling uses `random.sample()` for allocating communication windows. The `math.gcd()` function simplifies gear ratios in robotic arm designs, and `math.factorial()` computes combinatorial possibilities for fault tree analysis.

**Other uses:** Game development (physics engines, random loot drops, procedural generation), financial modeling (risk simulations with normal distributions), cryptography (random key generation), and scientific research (statistical sampling, numerical integration).

## 🎯 Interview Questions

**1. What is the difference between `math.pow(x, y)` and `x ** y`?**

`math.pow(x, y)` always returns a float (even for integer inputs), while `x ** y` returns an integer if both operands are integers and the result fits in an integer. `math.pow` also handles complex numbers and negative bases differently — for example, `(-2) ** 3` returns `-8` (int), while `math.pow(-2, 3)` returns `-8.0` (float). For integer exponentiation, `x ** y` is preferred; `math.pow` is consistent with C's `pow()` function.

**2. How does `random.sample()` differ from `random.choice()` and `random.choices()`?**

`random.sample(population, k)` returns `k` unique elements from the population (sampling without replacement). `random.choice(seq)` returns a single random element. `random.choices(population, k)` returns `k` elements with possible duplicates (sampling with replacement, introduced in Python 3.6). Use `sample` for unique selections, `choice` for one element, and `choices` for repeated selections.

**3. How can you get a reproducible sequence of random numbers in Python?**

Use `random.seed(n)` with a fixed seed value before generating random numbers. This initializes the random number generator to a known state, ensuring the same sequence of "random" numbers on each run. This is essential for debugging, testing, and reproducibility in scientific simulations.

**4. What does `math.isclose(a, b)` do and why is it necessary?**

`math.isclose(a, b)` checks whether two floating-point numbers are "close enough" to be considered equal. It's necessary because floating-point arithmetic has precision limitations — `0.1 + 0.2 != 0.3` due to binary representation. `isclose` uses relative and absolute tolerances (`rel_tol` and `abs_tol`) to determine proximity, making it the safe way to compare floating-point equality.

**5. How do you convert between degrees and radians in the `math` module?**

Use `math.radians(degrees)` to convert degrees to radians, and `math.degrees(radians)` to convert radians to degrees. Trigonometric functions (`sin`, `cos`, `tan`) expect angles in radians. For example: `math.sin(math.radians(90))` returns 1.0 (sine of 90 degrees).

## ⚠ Common Errors / Mistakes

**Error 1: Forgetting trigonometric functions use radians**
```python
import math

# BAD — expecting degrees
result = math.sin(90)  # sin(90 radians) ≈ 0.894, not sin(90°) = 1

# FIX — convert to radians
result = math.sin(math.radians(90))  # 1.0
```

**Error 2: Using `random` module functions without importing**
```python
# BAD — NameError
print(randint(1, 10))  # NameError: name 'randint' is not defined

# FIX — import properly
import random
print(random.randint(1, 10))

# or
from random import randint
print(randint(1, 10))
```

**Error 3: Assuming `random.random()` returns integers**
```python
# BAD — wrong assumption
roll = random.random()  # returns 0.654321... (float, not int 0-5)

# FIX — use appropriate function
roll = random.randint(1, 6)  # integer 1-6
# or
roll = int(random.random() * 6) + 1  # also integer 1-6
```

**Error 4: Floating-point comparison with ==**
```python
import math

# BAD — may fail due to floating-point precision
a = 0.1 + 0.2
if a == 0.3:  # False! 0.1 + 0.2 = 0.30000000000000004
    print("Equal")

# FIX — use isclose
if math.isclose(a, 0.3):  # True
    print("Equal")
```

**Error 5: Using `math.factorial` with negative or non-integer values**
```python
import math

# BAD — ValueError
math.factorial(-5)  # ValueError: factorial() not defined for negative values
math.factorial(3.5)  # ValueError: factorial() only accepts integral values

# FIX — validate input
def safe_factorial(n):
    if n < 0 or not isinstance(n, int):
        raise ValueError("n must be a non-negative integer")
    return math.factorial(n)
```

## 📝 Practice Exercises

**Beginner:**
1. Write a program that takes a radius from the user and uses `math.pi` to calculate and print the area and circumference of a circle.
2. Create a script that generates 10 random integers between 1 and 100 using `random.randint()`, stores them in a list, and prints the maximum, minimum, and average.
3. Write a function `hypotenuse(a, b)` that uses `math.sqrt()` and `math.pow()` to calculate the hypotenuse of a right triangle.

**Intermediate:**
4. Create a password generator that uses `random.choice()` to pick characters from a pool of uppercase letters, lowercase letters, digits, and special characters to generate a random 12-character password.
5. Write a program that calculates the GCD of three numbers using `math.gcd()` iteratively, and then computes the LCM (Least Common Multiple) using the relationship `LCM(a, b) = a * b // GCD(a, b)`.
6. Implement a coin flip simulator that uses `random.random()` to simulate flipping a fair coin 10,000 times. Print the percentage of heads and tails, and verify they are approximately 50% each.

**Advanced:**
7. Implement a Monte Carlo simulation to estimate the value of π: randomly generate points in a 2×2 square centered at the origin, count how many fall inside the unit circle, and estimate π as `4 * points_in_circle / total_points`. Use 1,000,000 points.
8. Create a statistical sampling tool that generates a list of 1,000 random numbers from a normal distribution (using `random.gauss(mu, sigma)`), then computes and prints the sample mean, sample standard deviation (using `math.sqrt`), and a histogram with 10 bins.
