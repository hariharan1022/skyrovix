## 42. Python Class Methods

## 📘 Introduction
Python classes support three distinct method types: instance methods, class methods, and static methods. Instance methods operate on an object instance via `self`, class methods operate on the class itself via `cls`, and static methods are utility functions namespaced inside the class with no access to instance or class state. Choosing the right method type improves code clarity and enforces design intent.

## 🧠 Key Concepts
- Instance methods receive `self` — access and mutate instance attributes
- Class methods receive `cls` — access and mutate class-level state, serve as alternative constructors
- Static methods receive neither `self` nor `cls` — pure functions grouped under the class namespace
- `@classmethod` decorator marks a method that receives the class as first argument
- `@staticmethod` decorator marks a method that does not receive an implicit first argument
- Instance methods are the default — no decorator needed
- Alternative constructors (e.g., `FromCsv`, `FromJson`) are idiomatic uses of class methods
- Static methods replace standalone helper functions that logically belong to a class

## 💻 Syntax
```python
class MyClass:
    class_var = "shared"

    def instance_method(self):
        """Receives the instance (self)."""
        return self.instance_var

    @classmethod
    def class_method(cls):
        """Receives the class (cls)."""
        return cls.class_var

    @staticmethod
    def static_method(arg1, arg2):
        """Receives no implicit first argument."""
        return arg1 + arg2
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Create a `Car` class with a class-level counter that tracks how many instances have been created. Use instance methods to return details, a class method to access the count, and a static method to validate speed values.

**Code:**
```python
class Car:
    total_cars = 0

    def __init__(self, make, model, speed=0):
        self.make = make
        self.model = model
        self.speed = speed
        Car.total_cars += 1

    def accelerate(self, amount):
        self.speed += amount
        return f"Speed is now {self.speed}"

    @classmethod
    def from_string(cls, car_string):
        make, model = car_string.split(",")
        return cls(make.strip(), model.strip())

    @classmethod
    def get_total_cars(cls):
        return f"Total cars created: {cls.total_cars}"

    @staticmethod
    def is_valid_speed(speed):
        return isinstance(speed, (int, float)) and speed >= 0

# Usage
c1 = Car("Toyota", "Camry")
c2 = Car.from_string("Honda, Civic")
print(Car.get_total_cars())
print(c1.accelerate(30))
print(Car.is_valid_speed(-5))
```

**Output:**
```
Total cars created: 2
Speed is now 30
False
```

**Explanation:** `accelerate()` is an instance method modifying `self.speed`. `get_total_cars()` is a class method accessing `cls.total_cars` — it works on the class itself, not an instance. `from_string()` is an alternative constructor that parses a string into a new `Car` object. `is_valid_speed()` is a static method performing a pure validation check with no instance or class dependency.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Build a `Logger` class that supports different logging levels (INFO, WARNING, ERROR). Use a class method to set the global log level, instance methods to log messages, and a static method to format timestamps.

**Code:**
```python
import datetime

class Logger:
    LEVELS = {"INFO": 1, "WARNING": 2, "ERROR": 3}
    _global_level = "INFO"

    def __init__(self, name):
        self.name = name

    def info(self, message):
        self._log("INFO", message)

    def warning(self, message):
        self._log("WARNING", message)

    def error(self, message):
        self._log("ERROR", message)

    def _log(self, level, message):
        if Logger.LEVELS.get(level, 0) >= Logger.LEVELS[Logger._global_level]:
            timestamp = Logger._timestamp()
            print(f"[{timestamp}] [{level}] {self.name}: {message}")

    @classmethod
    def set_level(cls, level):
        if level not in cls.LEVELS:
            raise ValueError(f"Invalid level: {level}")
        cls._global_level = level

    @staticmethod
    def _timestamp():
        return datetime.datetime.now().strftime("%H:%M:%S")

# Usage
Logger.set_level("WARNING")
app_log = Logger("App")
db_log = Logger("Database")
app_log.info("App started")          # filtered out
app_log.warning("Low memory")        # printed
db_log.error("Connection timeout")   # printed
```

**Output (timestamp varies):**
```
[10:15:30] [WARNING] App: Low memory
[10:15:30] [ERROR] Database: Connection timeout
```

**Explanation:** Instance methods `info()`, `warning()`, `error()` call the internal `_log()` which checks the class-level `_global_level` before printing. The class method `set_level()` modifies the global level for all instances. The static method `_timestamp()` formats the current time — it needs no instance or class state, making it a pure utility function.

## 🏢 Real World Use Case
**Django Model Alternative Constructors:** In Django ORM, class methods like `User.objects.create_user()` or custom `@classmethod` methods such as `User.from_email(email)` provide alternative constructors. Static methods are used for utility validations like `validate_password_strength(password)` that belong to the model but require no instance or class access.

## 🎯 Interview Questions (5 with answers)

**Q1. When should you use `@classmethod` vs `@staticmethod`?**
*Use `@classmethod` when you need access to the class or its constructors (e.g., alternative constructors, factory methods). Use `@staticmethod` when the function is purely utility logic that happens to be grouped under the class but needs no class state.*

**Q2. Can a class method access instance attributes?**
*No — a class method receives only `cls` and has no reference to any specific instance. It can only access class-level attributes and call other class/static methods.*

**Q3. How do you call a class method from an instance?**
*You can call a class method on an instance (`obj.class_method()`) — Python automatically passes the instance's class as `cls`. However, calling it on the class (`ClassName.class_method()`) is clearer.*

**Q4. What is an alternative constructor and how is it implemented?**
*An alternative constructor is a `@classmethod` that creates an instance from a different input format (e.g., JSON string, file, CSV). It calls `cls(...)` inside to construct and return a new object.*

**Q5. Can static methods be inherited and overridden?**
*Yes — static methods are inherited by subclasses and can be overridden. The overridden version must also be decorated with `@staticmethod`.*

## ⚠ Common Errors / Mistakes
- Forgetting `@classmethod` or `@staticmethod` decorator — without it, Python treats the method as an instance method and passes `self` as the first argument.
- Using `self` instead of `cls` inside a class method — while it works (the class is passed as `self`), it is misleading and breaks subclass behavior.
- Using instance methods for logic that doesn't need instance state — prefer static methods for pure functions.
- Mutating class-level state from an instance method when class-level mutation was intended — be explicit by using `@classmethod`.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)

**Beginner:**
1. Create a `Dog` class with a class-level `species = "Canis familiaris"` and a class method `get_species()` that returns it.
2. Create a `MathUtils` class with only static methods: `add(a, b)`, `multiply(a, b)`, and `is_even(n)`.
3. Create a `Student` class with an instance method `get_info()` returning name and grade, and a class method `from_dict(data)` that creates a student from a dictionary.

**Intermediate:**
4. Create a `Shape` class where `__init__` is private-like and a class method `square(side)` and `circle(radius)` serve as named constructors returning the correct shape instance.
5. Create a `DatabaseConnection` class with a class-level `pool` list, an instance method `connect()`, a class method `pool_size()`, and a static method `validate_connection_string(cs)` that checks if a connection string is well-formed.
6. Create a `Report` class with a class method `generate_summary(reports_list)` that aggregates data from multiple instances, and instance methods for adding rows.

**Advanced:**
7. Create a `Registry` class where each subclass is automatically registered. Use a class method `__init_subclass__` or a metaclass to populate a `_registry` dict. Provide a class method `get_registered()` to list all subclasses and a static method `create(type_name, *args)` to instantiate a registered class by name.
8. Create a `Currency` class that supports conversion between USD, EUR, and INR. Use class methods to set exchange rates, static methods for formatting amounts, and instance methods for conversion. Store conversion rates as class-level attributes.
