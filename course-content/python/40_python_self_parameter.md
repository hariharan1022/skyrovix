# 40. Python self Parameter

## 📘 Introduction

`self` is a cornerstone of Python's object-oriented programming — it is the first parameter of every instance method and refers to the specific instance on which the method is being called. When you call `obj.method()`, Python automatically passes `obj` as the `self` argument: `MyClass.method(obj)`. This mechanism gives each method access to the instance's attributes and other methods. While `self` is not a keyword (it is a strong convention), deviating from it is heavily discouraged. For class methods, the convention uses `cls` as the first parameter, referencing the class itself rather than an instance. Static methods use neither `self` nor `cls` — they behave like plain functions that happen to live in a class namespace. Understanding the distinction between instance methods, class methods, and static methods, and knowing when and how to use each, is essential for designing clean, well-structured classes in Python.

## 🧠 Key Concepts

- **self**: First parameter of instance methods; refers to the specific object instance
- **Automatic passing**: Python passes the instance as `self` automatically — you do NOT pass it explicitly
- **Instance attribute access**: `self.attribute` accesses attributes belonging to the current instance
- **cls**: First parameter of class methods (decorated with `@classmethod`); refers to the class itself
- **@classmethod**: Decorator that makes a method receive the class (`cls`) instead of the instance (`self`)
- **@staticmethod**: Decorator that makes a method receive neither `self` nor `cls`; acts like a plain function
- **self vs cls**: `self` accesses instance data; `cls` accesses class data and creates instances

| Method Type | First Parameter | Decorator | Access |
|-------------|----------------|-----------|--------|
| Instance method | `self` | None | Instance & class data |
| Class method | `cls` | `@classmethod` | Class data only (no instance) |
| Static method | None | `@staticmethod` | Neither (plain function) |

## 💻 Syntax

```python
class Demo:
    class_attr = "shared"

    def __init__(self, value):
        self.instance_attr = value  # self refers to the new instance

    # Instance method — receives self (the instance)
    def instance_method(self):
        print(f"Instance: {self.instance_attr}, Class: {self.class_attr}")

    # Class method — receives cls (the class)
    @classmethod
    def class_method(cls):
        print(f"Class attr: {cls.class_attr}")
        return cls("created_by_class_method")  # Creates an instance

    # Static method — receives neither self nor cls
    @staticmethod
    def static_method(a, b):
        return a + b

# Usage
obj = Demo("my_value")

# Instance method: Python passes obj as self automatically
obj.instance_method()          # Same as Demo.instance_method(obj)

# Class method: Python passes Demo as cls automatically
Demo.class_method()            # Creates a new instance

# Static method: no automatic argument passing
result = Demo.static_method(3, 4)
print(result)                  # 7
```

Line-by-line explanation:
- `def __init__(self, value):` — `self` is the newly created instance; `value` is the argument passed when calling `Demo("my_value")`
- `self.instance_attr = value` — stores a value on the specific instance that `self` references
- `def instance_method(self):` — `self` provides access to `self.instance_attr` (instance) and `self.class_attr` (class)
- `@classmethod` — decorator that changes the method binding so the first parameter is the class, not an instance
- `def class_method(cls):` — `cls` is the class (`Demo`), not an instance; can access class attributes and create instances
- `@staticmethod` — decorator that makes the method receive no automatic first argument
- `Demo.static_method(3, 4)` — called like a regular function; no implicit argument passing

## ✅ Example 1 - Basic: Self in Instance Methods

**Problem**: Create a `Counter` class where each instance has its own count. Demonstrate that `self` correctly refers to each specific instance when calling methods.

**Code**:
```python
class Counter:
    def __init__(self, start=0):
        self.count = start
        self.label = f"Counter-{id(self)}"

    def increment(self, amount=1):
        self.count += amount
        return self.count

    def reset(self):
        self.count = 0

    def show(self):
        print(f"{self.label}: count = {self.count}")

# Create two independent counters
c1 = Counter()
c2 = Counter(10)

# Show initial state
c1.show()    # Counter-...: count = 0
c2.show()    # Counter-...: count = 10

# Operate on c1 only
c1.increment()
c1.increment(5)
c1.show()    # Counter-...: count = 6

# c2 is unchanged
c2.show()    # Counter-...: count = 10

# Reset c1
c1.reset()
c1.show()    # Counter-...: count = 0

# Demonstrate that self refers to the specific instance
print(f"c1 is c1.increment: {c1.increment() == c1.count}")  # True — self is c1
```

**Output**:
```
Counter-23874876: count = 0
Counter-23874900: count = 10
Counter-23874876: count = 6
Counter-23874900: count = 10
Counter-23874876: count = 0
c1 is c1.increment: True
```

**Explanation**: When `c1.increment()` is called, Python translates it to `Counter.increment(c1)`. Inside the method, `self` is `c1`, so `self.count` refers to `c1.count`. When `c2.increment()` is called, `self` is `c2`, and `self.count` refers to `c2.count`. The two counters are completely independent — the `self` parameter is the mechanism that gives each method call the correct instance context.

## 🚀 Example 2 - Intermediate: Self vs cls vs Static

**Problem**: Build an `Employee` tracking system that uses instance methods for individual operations, a class method to track the total employee count and create employees from CSV data, and a static method for utility validation.

**Code**:
```python
class Employee:
    company = "TechCorp"
    _total_employees = 0

    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        Employee._total_employees += 1
        self.emp_id = Employee._total_employees

    def apply_raise(self, percentage):
        self.salary += self.salary * (percentage / 100)
        return self.salary

    def __str__(self):
        return f"{self.name} (ID: {self.emp_id}) - ${self.salary:.2f}"

    @classmethod
    def total_employees(cls):
        return cls._total_employees

    @classmethod
    def from_csv_string(cls, csv_line):
        name, salary = csv_line.strip().split(",")
        return cls(name, float(salary))

    @staticmethod
    def validate_salary(salary):
        return salary >= 0 and salary <= 1_000_000

# Using instance methods
e1 = Employee("Alice", 75000)
e2 = Employee("Bob", 90000)
e1.apply_raise(10)
print(e1)

# Using class method
print(f"Total employees: {Employee.total_employees()}")

# Using class method as alternative constructor
e3 = Employee.from_csv_string("Charlie,85000")
print(e3)
print(f"Total employees: {Employee.total_employees()}")

# Using static method
print(f"Valid salary: {Employee.validate_salary(50000)}")
print(f"Invalid salary: {Employee.validate_salary(2_000_000)}")
```

**Output**:
```
Alice (ID: 1) - $82500.00
Total employees: 2
Charlie (ID: 3) - $85000.00
Total employees: 3
Valid salary: True
Invalid salary: False
```

**Explanation**: Instance methods (`apply_raise`) use `self` to access and modify each employee's own salary data. Class methods (`total_employees`, `from_csv_string`) use `cls` to access class-level data (`_total_employees`) or create new instances (`cls(name, float(salary))`). The static method (`validate_salary`) is a utility that neither needs instance nor class context — it simply validates a number. Each method type serves a distinct purpose: `self` for instance data, `cls` for class-level operations, and static methods for standalone utilities.

## 🏢 Real World Use Case

**Django's class-based views** use `self` extensively — each HTTP method handler (e.g., `def get(self, request, *args, **kwargs)`) receives `self` to access view attributes like `self.request`, `self.args`, `self.kwargs`, and `self.object`. Class methods like `as_view()` are class methods that return a callable view function. **SQLAlchemy** uses `@classmethod` for alternative constructors like `from_json()` and `from_tuple()`, allowing model instances to be created from different data formats. **Pydantic** uses `@classmethod` and `@staticmethod` in its field validators — `@classmethod` validators receive the class to access field metadata, while `@staticmethod` validators are pure functions. The `self` parameter is fundamental to all Python ORMs, web frameworks, and GUI libraries (Tkinter, PyQt) where every widget or model interaction requires accessing the instance's state.

## 🎯 Interview Questions

**Q1: What is `self` in Python? Is it a keyword?**
A: `self` is not a keyword — it is a strong naming convention for the first parameter of instance methods. It refers to the instance on which the method is called. Python automatically passes the instance as the first argument when you call a method on an object. You could technically use any name (e.g., `this`, `me`), but using `self` is universally expected and any linter will flag deviations.

**Q2: What is the difference between `self` and `cls`?**
A: `self` is used in instance methods and refers to the specific object instance — it provides access to instance attributes (via `self.attr`) and class attributes (via `self.__class__.attr` or just `self.attr` if not shadowed). `cls` is used in class methods (decorated with `@classmethod`) and refers to the class itself — it provides access to class attributes and can create new instances (`cls(...)`). Instance methods need `self` because each object has its own data; class methods use `cls` because they work at the class level.

**Q3: How does Python pass `self` automatically? What happens internally?**
A: When you write `obj.method(arg1)`, Python translates it to `ClassName.method(obj, arg1)`. The attribute lookup finds the method on the class, then Python creates a bound method object where the first argument (`self`) is pre-bound to `obj`. This is known as the descriptor protocol — functions are descriptors whose `__get__` method returns a bound method when accessed via an instance. This automatic binding is why `self` is not explicitly passed.

**Q4: When would you use a `@staticmethod` vs a `@classmethod`?**
A: Use `@staticmethod` when the method does not need access to the class or instance — it is essentially a plain function placed in the class for organizational purposes (e.g., utility/helper functions related to the class). Use `@classmethod` when the method needs access to the class (e.g., to create instances via `cls(...)`, access class attributes, or call other class methods). Common `@classmethod` use cases: alternative constructors (`from_json`, `from_file`) and factory methods.

**Q5: What happens if you forget the `self` parameter in an instance method?**
A: The method will not receive the instance as the first argument. When called as `obj.method()`, Python passes `obj` as the first positional argument, but since the method does not declare `self`, `obj` will be received by whatever parameter is first — or if no parameters are defined, Python raises a `TypeError: method() takes 0 positional arguments but 1 was given`. If there are parameters, `obj` is received as the first named parameter, shifting all other arguments, which typically leads to confusing errors.

## ⚠ Common Errors / Mistakes

**Error 1: Forgetting `self` as the first parameter of an instance method**
```python
class Dog:
    def __init__(self, name):
        self.name = name

    # Wrong: no self parameter
    def bark():
        return "Woof!"

d = Dog("Buddy")
# d.bark()  # TypeError: bark() takes 0 positional arguments but 1 was given
Dog.bark()  # Works because no instance is passed
```

**Error 2: Passing `self` explicitly as an argument**
```python
class Dog:
    def __init__(self, name):
        self.name = name

    def introduce(self):
        return f"I am {self.name}"

d = Dog("Buddy")

# Wrong: don't pass self explicitly
# d.introduce(d)  # TypeError: introduce() takes 1 positional argument but 2 were given

# Correct: Python passes self automatically
d.introduce()
```

**Error 3: Using `self` in a static method**
```python
class MathUtils:
    @staticmethod
    def add(a, b):
        # Wrong: self does not exist in static methods
        # return self.validate(a) + self.validate(b)  # NameError

        # Correct: use utility functions or call static method via class name
        return MathUtils._validate(a) + MathUtils._validate(b)

    @staticmethod
    def _validate(n):
        if not isinstance(n, (int, float)):
            raise TypeError("Expected number")
        return n
```

## 📝 Practice Exercises

**Beginner:**
1. Create a `Person` class with `name` and `age` instance attributes. Write instance methods `greet()` (returns a greeting) and `birthday()` (increments age). Verify that `self` correctly refers to each instance.
2. Write a `BankAccount` class where `deposit()` and `withdraw()` use `self` to access the balance. Create two accounts and verify that operations on one do not affect the other.
3. Add a `@classmethod` called `from_string` to a `Book` class that parses a string like `"Title,Author,2020"` and creates a `Book` instance.

**Intermediate:**
4. Build a `Vehicle` class with a class attribute `vehicle_count` that tracks how many instances have been created. Use `@classmethod` for `total_vehicles()` and `@staticmethod` for `is_valid_vin(vin)` (check that a VIN string is 17 characters).
5. Create a `Temperature` class with `@classmethod` alternative constructors `from_celsius()`, `from_fahrenheit()`, and `from_kelvin()`, each storing the temperature internally in Kelvin and using `self` to convert for display.
6. Design a `Configuration` class where `__init__` uses `self` to store settings from a dict. Add a `@classmethod` `from_file(filename)` that reads a JSON file and creates a Configuration instance.

**Advanced:**
7. Implement a custom descriptor class that logs every time `self` (i.e., any instance attribute) is accessed or modified, tracking the instance identity and attribute name.
8. Build an `AutoMethod` metaclass that automatically adds `self` as the first parameter if a function defined in a class body has parameters but is not decorated with `@staticmethod` or `@classmethod`, effectively simulating a linting rule at the metaclass level.
