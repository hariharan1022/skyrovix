## 44. Python Polymorphism

## 📘 Introduction
Polymorphism (many forms) allows objects of different types to respond to the same interface. Python achieves polymorphism through duck typing ("if it walks like a duck and quacks like a duck, it's a duck"), method overriding in inheritance, operator overloading via magic methods, and abstract base classes that enforce interface contracts.

## 🧠 Key Concepts
- **Duck typing**: an object's suitability is determined by the presence of methods/properties, not its type
- **Method overriding**: a subclass redefines a parent method with the same signature
- **Operator overloading**: magic methods (`__add__`, `__sub__`, `__len__`, `__str__`, etc.) define how operators work on custom objects
- **Polymorphism with inheritance**: a child class can be used wherever the parent type is expected
- **Abstract Base Classes (ABCs)**: define an interface contract; subclasses must implement abstract methods
- The `abc` module provides `ABC` and `@abstractmethod`
- Python's `len()`, `str()`, `+`, `==` all use magic methods behind the scenes

## 💻 Syntax
```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, r):
        self.r = r
    def area(self):
        return 3.14 * self.r * self.r

# Operator overloading
class Vector:
    def __init__(self, x, y):
        self.x = x; self.y = y
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    def __str__(self):
        return f"Vector({self.x}, {self.y})"
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Create different shape classes (`Rectangle`, `Circle`, `Triangle`) that each implement `area()` and `perimeter()`. Use a common interface to process them polymorphically without checking types.

**Code:**
```python
import math

class Rectangle:
    def __init__(self, w, h):
        self.w = w
        self.h = h
    def area(self):
        return self.w * self.h
    def perimeter(self):
        return 2 * (self.w + self.h)
    def __str__(self):
        return f"Rectangle({self.w}x{self.h})"

class Circle:
    def __init__(self, r):
        self.r = r
    def area(self):
        return math.pi * self.r ** 2
    def perimeter(self):
        return 2 * math.pi * self.r
    def __str__(self):
        return f"Circle(r={self.r})"

class Triangle:
    def __init__(self, a, b, c):
        self.a = a
        self.b = b
        self.c = c
    def area(self):
        s = (self.a + self.b + self.c) / 2
        return math.sqrt(s * (s - self.a) * (s - self.b) * (s - self.c))
    def perimeter(self):
        return self.a + self.b + self.c
    def __str__(self):
        return f"Triangle({self.a},{self.b},{self.c})"

def print_shape_info(shape):
    print(f"{shape}: area={shape.area():.2f}, perimeter={shape.perimeter():.2f}")

# Usage
shapes = [Rectangle(4, 5), Circle(3), Triangle(3, 4, 5)]
for s in shapes:
    print_shape_info(s)
```

**Output:**
```
Rectangle(4x5): area=20.00, perimeter=18.00
Circle(r=3): area=28.27, perimeter=18.85
Triangle(3,4,5): area=6.00, perimeter=12.00
```

**Explanation:** Each class defines `area()` and `perimeter()` with different implementations. The function `print_shape_info()` accepts any object that provides these methods — duck typing at work. No type checking, no inheritance required. Adding a new shape class automatically works without changing the processing code.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Create a `Book` class with operator overloading for comparison (`==`, `<`), string representation (`__str__`, `__repr__`), and length (`__len__` based on page count). Use it polymorphically in sorting and searching.

**Code:**
```python
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def __str__(self):
        return f"'{self.title}' by {self.author}"

    def __repr__(self):
        return f"Book({self.title!r}, {self.author!r}, {self.pages})"

    def __len__(self):
        return self.pages

    def __eq__(self, other):
        if not isinstance(other, Book):
            return NotImplemented
        return self.title == other.title and self.author == other.author

    def __lt__(self, other):
        if not isinstance(other, Book):
            return NotImplemented
        return self.pages < other.pages

    def __hash__(self):
        return hash((self.title, self.author))

books = [
    Book("1984", "Orwell", 328),
    Book("Brave New World", "Huxley", 311),
    Book("Fahrenheit 451", "Bradbury", 194),
]
print("Sorted by pages (ascending):")
for b in sorted(books):
    print(f"  {b} — {len(b)} pages")

b1 = Book("1984", "Orwell", 328)
b2 = Book("1984", "Orwell", 350)
print(f"b1 == b2: {b1 == b2}")
print(f"repr: {repr(b1)}")
```

**Output:**
```
Sorted by pages (ascending):
  'Fahrenheit 451' by Bradbury — 194 pages
  'Brave New World' by Huxley — 311 pages
  '1984' by Orwell — 328 pages
b1 == b2: True
repr: Book('1984', 'Orwell', 328)
```

**Explanation:** `__lt__` enables `<` comparison and therefore `sorted()` works naturally. `__eq__` defines equality by title+author (not page count). `__len__` returns page count, so `len(book)` works. `__str__` provides a readable display, `__repr__` an unambiguous representation. The `sorted()` function is polymorphic — it calls `__lt__` automatically.

## 🏢 Real World Use Case
**Django's Polymorphic Models:** Django REST Framework uses serializers polymorphically — a `Serializer` base class defines `to_representation()` and `to_internal_value()`. Different serializer types (ModelSerializer, ListSerializer) override these methods. The view layer calls the same interface regardless of serializer type, leveraging both duck typing and inheritance-based polymorphism.

## 🎯 Interview Questions (5 with answers)

**Q1. What is duck typing and how does it enable polymorphism in Python?**
*Duck typing means an object's fitness is determined by whether it implements required methods/properties, not its type. Python inherently supports this since method calls are resolved at runtime. If two objects have an `area()` method, they can be used interchangeably regardless of class hierarchy.*

**Q2. What magic method would you implement to enable `len(obj)`?**
*Implement `__len__(self)` to return an integer. Python's `len()` function calls this method internally.*

**Q3. How does operator overloading differ in Python vs languages like C++?**
*Python only allows overloading through predefined magic methods (`__add__`, `__sub__`, etc.) — you cannot create new operators or change the arity of existing ones. C++ allows arbitrary operator overloading with any signature.*

**Q4. What is the purpose of `NotImplemented` in magic methods?**
*Returning `NotImplemented` tells Python to try the reflected operation on the other operand (e.g., `__radd__`). If both return `NotImplemented`, Python raises `TypeError`. This enables symmetric operators.*

**Q5. Can you achieve polymorphism without inheritance?**
*Yes — duck typing is polymorphism without inheritance. Python's `len()` works on strings, lists, dicts, and custom objects because all implement `__len__`. No common base class is required.*

## ⚠ Common Errors / Mistakes
- Implementing `__eq__` without implementing `__hash__` — mutable objects with `__eq__` should set `__hash__ = None` or implement both correctly.
- Forgetting to return `NotImplemented` in binary operations when the type doesn't match — this breaks the symmetric operator protocol.
- Assuming polymorphism requires inheritance — duck typing is simpler and more flexible.
- Overloading `__add__` but returning incorrect types (e.g., returning a non-`Vector` when adding two `Vector`s), violating the principle of least surprise.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)

**Beginner:**
1. Create `Cat` and `Dog` classes with a `speak()` method. Write a function `make_sound(animal)` that calls `speak()` without type checking.
2. Create a `Point` class with `__add__` and `__str__` magic methods so two points can be added and printed.
3. Create `PDFReport` and `CSVReport` classes with `generate()` and `filename()` methods. Write a function that processes any report object.

**Intermediate:**
4. Create a `Time` class with hours, minutes, seconds. Implement `__add__`, `__sub__`, `__eq__`, `__lt__`, and `__str__`. Ensure overflow handling (90 minutes becomes 1 hour, 30 minutes).
5. Create a `Fraction` class that works with `+`, `-`, `*`, `/`, `==`, `<`, and implements `__float__` and `__int__`. Handle reduction to lowest terms.
6. Create an abstract `PaymentMethod` class with an abstract `pay(amount)` method. Implement `CreditCard`, `PayPal`, and `BankTransfer` subclasses. Write a `checkout(cart, payment_method)` function that works polymorphically.

**Advanced:**
7. Create a `Polynomial` class that represents a polynomial (e.g., `3x^2 + 2x + 1`). Implement `__add__`, `__sub__`, `__mul__`, `__call__` (evaluate the polynomial at a given x value), `__str__`, and `__repr__`. Support both `Polynomial + Polynomial` and `Polynomial + scalar`.
8. Create a composite pattern with `File` and `Directory` classes. Both implement `get_size()`. `Directory` contains multiple `FileSystemNode` objects and aggregates their sizes. Add `__add__` to `FileSystemNode` for merging directory structures, and `__len__` to return the number of items (for files, always 1; for directories, the count of immediate children). The entire system should be polymorphic — a function that processes `FileSystemNode` objects doesn't know or care if it gets a `File` or a `Directory`.
