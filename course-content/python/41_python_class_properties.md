## 41. Python Class Properties

## 📘 Introduction
Class properties in Python provide a way to manage attribute access with controlled getter, setter, and deleter logic. The `@property` decorator transforms a method into a getter, allowing computed or validated attributes while maintaining a clean dot-access syntax. Properties enable you to start with simple attributes and later add logic without breaking the public interface.

## 🧠 Key Concepts
- `@property` decorator marks a method as a getter, allowing `obj.attr` syntax instead of `obj.attr()`
- Getter method returns the attribute value
- Setter method (`@attr.setter`) validates or transforms data before assignment
- Deleter method (`@attr.deleter`) handles cleanup when `del obj.attr` is called
- Computed attributes derive their value dynamically from other attributes
- Properties maintain backward compatibility when replacing plain attributes with logic
- Read-only properties omit the setter, making an attribute immutable after construction

## 💻 Syntax
```python
@property
def attr(self):
    """Getter - returns the value."""
    return self._attr

@attr.setter
def attr(self, value):
    """Setter - validates and sets the value."""
    self._attr = value

@attr.deleter
def attr(self):
    """Deleter - cleans up."""
    del self._attr
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Create a `Temperature` class that stores Celsius and provides a computed Fahrenheit property. Ensure that only valid numeric temperatures are accepted.

**Code:**
```python
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = 0
        self.celsius = celsius      # uses setter

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if not isinstance(value, (int, float)):
            raise TypeError("Temperature must be a number")
        if value < -273.15:
            raise ValueError("Temperature cannot be below absolute zero")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

# Usage
t = Temperature(100)
print(f"{t.celsius}°C = {t.fahrenheit}°F")
t.celsius = 0
print(f"{t.celsius}°C = {t.fahrenheit}°F")
```

**Output:**
```
100°C = 212.0°F
0°C = 32.0°F
```

**Explanation:** The `@property` decorator exposes `celsius` with a getter/setter that validates input (number check and absolute zero guard). `fahrenheit` is a read-only computed property — it has no setter, so it is derived dynamically from `_celsius`. Attempting `t.fahrenheit = 100` would raise an `AttributeError`.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Build a `Rectangle` class with `width` and `height` properties that enforce positive values, and computed `area` and `perimeter` properties. Also provide a `del` handler that resets the rectangle dimensions to zero.

**Code:**
```python
class Rectangle:
    def __init__(self, width=1, height=1):
        self._width = 1
        self._height = 1
        self.width = width
        self.height = height

    @property
    def width(self):
        return self._width

    @width.setter
    def width(self, value):
        if not isinstance(value, (int, float)):
            raise TypeError("Width must be numeric")
        if value <= 0:
            raise ValueError("Width must be positive")
        self._width = value

    @property
    def height(self):
        return self._height

    @height.setter
    def height(self, value):
        if not isinstance(value, (int, float)):
            raise TypeError("Height must be numeric")
        if value <= 0:
            raise ValueError("Height must be positive")
        self._height = value

    @property
    def area(self):
        return self._width * self._height

    @property
    def perimeter(self):
        return 2 * (self._width + self._height)

    @width.deleter
    @height.deleter
    def dimensions(self):
        self._width = 0
        self._height = 0
        print("Dimensions reset to zero")

# Usage
r = Rectangle(10, 5)
print(f"Area: {r.area}, Perimeter: {r.perimeter}")
del r.dimensions
print(f"After delete - width: {r.width}, height: {r.height}")
```

**Output:**
```
Area: 50, Perimeter: 30
Dimensions reset to zero
After delete - width: 0, height: 0
```

**Explanation:** Both `width` and `height` have setters that validate the value is numeric and positive. `area` and `perimeter` are read-only computed properties. The deleter is attached to a shared name `dimensions` and resets both backing fields. This pattern ensures the object cannot be left in an invalid state.

## 🏢 Real World Use Case
**Form Validation in Web Frameworks:** A `User` model uses properties to validate email format, ensure passwords meet minimum length, and compute a `full_name` from `first_name` + `last_name` attributes. The property layer catches invalid data before it reaches the database, and computed fields eliminate redundant storage.

## 🎯 Interview Questions (5 with answers)

**Q1. What is the difference between a property and a regular attribute?**
*A property is a managed attribute accessed via getter/setter methods while keeping dot notation. Regular attributes are stored directly in `__dict__` with no validation or computation.*

**Q2. How do you create a read-only property?**
*Define only the getter using `@property` and omit the setter. Any attempt to assign to a read-only property raises `AttributeError`.*

**Q3. Can a property be inherited and overridden?**
*Yes. A child class can override a property getter, setter, or deleter by redefining the property. Use `@property` on the child method and optionally call the parent's property via `super()`.*

**Q4. What is name mangling and does it relate to properties?**
*Name mangling converts `__attr` to `_ClassName__attr` to avoid subclass collisions. Properties often store data in mangled names (e.g., `self._attr`) to discourage direct access.*

**Q5. How do you detect if a property exists on an object?**
*Use `hasattr(obj, 'prop')` or check `type(obj).__dict__` for the property descriptor. Properties are class-level descriptors, not instance attributes.*

## ⚠ Common Errors / Mistakes
- Forgetting to store the backing value under a different name (e.g., `self._celsius` vs `self.celsius`), causing infinite recursion when the setter calls `self.attr = value`.
- Omitting the setter and wondering why an attribute is read-only — properties without a setter cannot be assigned.
- Using properties for trivial attributes with no logic, adding unnecessary overhead over plain attributes.
- Raising the wrong exception type in a setter (use `TypeError` for type violations, `ValueError` for value violations).

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)

**Beginner:**
1. Create a `Person` class with a `name` property that capitalizes the first letter on set and returns the stored name.
2. Create a `Circle` class with a read-only `area` property computed from `radius`.
3. Create a `BankAccount` class with a `balance` property that prevents setting a negative balance.

**Intermediate:**
4. Create a `Book` class with properties `title`, `author`, and a read-only `slug` property that generates a URL-friendly string (lowercase, hyphens instead of spaces) from the `title` during `__init__`.
5. Create a `Student` class where `grade` is a property that accepts only integers 0–100 and stores a letter grade (`'A'`, `'B'`, `'C'`, `'D'`, `'F'`).
6. Create a `ShoppingCart` class with a `total` property that dynamically sums item prices from an internal list, and a `discount` property that applies a percentage reduction.

**Advanced:**
7. Create a `TimePeriod` class with `hours`, `minutes`, `seconds` properties. Setting `seconds` should cascade into minutes/hours (e.g., setting 3661 becomes 1 hour, 1 minute, 1 second). Provide a read-only `total_seconds` property.
8. Create a `Configuration` class where properties read and write from a JSON file on disk. Each property getter reads the file, and each setter writes back. Cache the loaded data to avoid repeated disk I/O within a single operation.
