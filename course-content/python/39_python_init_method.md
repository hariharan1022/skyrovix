# 39. Python __init__ Method

## 📘 Introduction

The `__init__` method is Python's constructor — a special method automatically called when a new instance of a class is created. Its primary purpose is to initialize the object's attributes to a valid initial state. The method accepts `self` as its first parameter (referring to the newly created instance), followed by any additional arguments needed to set up the object. `__init__` supports default parameter values, making some or all arguments optional during object creation. In inheritance hierarchies, `super().__init__()` calls the parent class's constructor, ensuring that inherited attributes are properly initialized. The `__init__` method can include validation logic to reject invalid values immediately, preventing the creation of objects in an invalid state. Unlike constructors in some languages, Python's `__init__` does not create the object (that's `__new__`'s job) — it only initializes it. Mastering `__init__` is essential for writing robust, self-validating classes.

## 🧠 Key Concepts

- **Constructor**: `__init__` is called immediately after the object is created to initialize its state
- **self parameter**: The first argument, referencing the instance being initialized
- **Default parameters**: `__init__(self, name="Unknown")` makes arguments optional with fallback values
- **super().__init__()**: Calls the parent class's constructor from a subclass, ensuring inherited attributes are set
- **Validation**: Logic inside `__init__` to check parameter values and reject invalid ones early
- **Attribute initialization**: Setting initial values for all attributes the object will need during its lifetime

| Concept | Syntax | Purpose |
|---------|--------|---------|
| Basic init | `def __init__(self, name):` | Initialize instance with required args |
| Default params | `def __init__(self, name="Guest"):` | Make args optional with defaults |
| Validation | `if not name: raise ValueError(...)` | Reject invalid state at creation time |
| Parent call | `super().__init__(name)` | Initialize parent class from subclass |

## 💻 Syntax

```python
# Basic __init__
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# __init__ with default parameters
class Person:
    def __init__(self, name="Guest", age=0):
        self.name = name
        self.age = age

# __init__ with validation
class Person:
    def __init__(self, name, age):
        if not name or not isinstance(name, str):
            raise ValueError("Name must be a non-empty string")
        if age < 0 or age > 150:
            raise ValueError("Age must be between 0 and 150")
        self.name = name
        self.age = age

# __init__ calling parent with super()
class Employee(Person):
    def __init__(self, name, age, emp_id):
        super().__init__(name, age)  # Initialize Person part
        self.emp_id = emp_id

# __init__ with computed attributes
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.area = width * height  # Computed attribute
        self.perimeter = 2 * (width + height)
```

Line-by-line explanation:
- `def __init__(self, name, age):` — defines the constructor; `self` is the instance, `name` and `age` are required parameters
- `self.name = name` — stores the parameter value as an instance attribute, making it accessible throughout the object's lifetime
- `def __init__(self, name="Guest", age=0):` — provides default values; object can be created as `Person()` with no arguments
- `if not name: raise ValueError(...)` — validates input and immediately rejects invalid data, preventing the creation of broken objects
- `super().__init__(name, age)` — calls the `Person.__init__` method from `Employee.__init__`, initializing inherited attributes
- `self.area = width * height` — computes a derived attribute from constructor parameters, so it's available immediately

## ✅ Example 1 - Basic: Book Class with Defaults and Validation

**Problem**: Create a `Book` class where the constructor validates the year and provides defaults for optional fields.

**Code**:
```python
class Book:
    def __init__(self, title, author, year, genre="Fiction", pages=0):
        # Validation
        if not title:
            raise ValueError("Title cannot be empty")
        if year < -3000 or year > 2026:
            raise ValueError(f"Invalid year: {year}")

        # Assignment
        self.title = title
        self.author = author
        self.year = year
        self.genre = genre
        self.pages = pages
        self.age = 2026 - year  # Computed attribute

    def __str__(self):
        return f"'{self.title}' by {self.author} ({self.year})"

# Valid usage
book1 = Book("1984", "George Orwell", 1949)
book2 = Book("Dune", "Frank Herbert", 1965, "Science Fiction", 412)

print(book1)
print(f"Age: {book1.age} years old")
print(f"Pages: {book1.pages} (default)")

print(book2)
print(f"Genre: {book2.genre}")

# Invalid usage — will raise ValueError
try:
    bad_book = Book("", "No Name", 2000)
except ValueError as e:
    print(f"Error: {e}")
```

**Output**:
```
'1984' by George Orwell (1949)
Age: 77 years old
Pages: 0 (default)
'Dune' by Frank Herbert (1965)
Genre: Science Fiction
Error: Title cannot be empty
```

**Explanation**: The `Book.__init__` demonstrates several important patterns. Default parameters (`genre="Fiction"`, `pages=0`) make object creation flexible — `book1` uses only required args. Validation in the constructor catches errors early: passing an empty title raises `ValueError` immediately, preventing the creation of a `Book` with invalid data. The computed attribute `self.age` is derived from the year, showing that `__init__` can do more than just store parameters. This "fail fast" approach ensures objects are always in a valid state.

## 🚀 Example 2 - Intermediate: Inheritance with super().__init__()

**Problem**: Build a class hierarchy for different types of bank accounts. A base `Account` class initializes common attributes, while `SavingsAccount` and `CheckingAccount` extend it with specific features.

**Code**:
```python
class Account:
    def __init__(self, owner, account_number, initial_balance=0):
        if initial_balance < 0:
            raise ValueError("Initial balance cannot be negative")
        self.owner = owner
        self.account_number = account_number
        self._balance = initial_balance
        self.transactions = []

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self._balance += amount
        self.transactions.append(f"Deposit: +${amount}")
        return self._balance

    def get_balance(self):
        return self._balance

class SavingsAccount(Account):
    def __init__(self, owner, account_number, initial_balance=0, interest_rate=0.02):
        # Call parent constructor
        super().__init__(owner, account_number, initial_balance)
        # Additional initialization for savings
        if interest_rate < 0 or interest_rate > 1:
            raise ValueError("Interest rate must be between 0 and 1")
        self.interest_rate = interest_rate

    def add_interest(self):
        interest = self._balance * self.interest_rate
        self._balance += interest
        self.transactions.append(f"Interest: +${interest:.2f}")
        return interest

class CheckingAccount(Account):
    def __init__(self, owner, account_number, initial_balance=0, overdraft_limit=500):
        super().__init__(owner, account_number, initial_balance)
        if overdraft_limit < 0:
            raise ValueError("Overdraft limit cannot be negative")
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self._balance + self.overdraft_limit:
            raise ValueError("Overdraft limit exceeded")
        self._balance -= amount
        self.transactions.append(f"Withdrawal: -${amount}")
        return self._balance

# Create accounts
savings = SavingsAccount("Alice", "SAV-001", 1000, 0.03)
checking = CheckingAccount("Bob", "CHK-001", 500, 1000)

# Use savings-specific feature
savings.add_interest()
print(f"Savings balance after interest: ${savings.get_balance():.2f}")

# Use checking-specific feature
checking.withdraw(1200)  # Uses overdraft
print(f"Checking balance: ${checking.get_balance():.2f}")

# Both share deposit from parent
savings.deposit(500)
print(f"Savings after deposit: ${savings.get_balance():.2f}")
```

**Output**:
```
Savings balance after interest: $1030.00
Checking balance: $-700.00
Savings after deposit: $1530.00
```

**Explanation**: The `super().__init__()` call in both subclasses initializes the base `Account` attributes (`owner`, `account_number`, `_balance`, `transactions`). Each subclass then adds its own attributes (`interest_rate`, `overdraft_limit`) and methods (`add_interest`, `withdraw`). The `SavingsAccount`'s `__init__` validates `interest_rate` before storing it, following the fail-fast pattern. Both subclasses inherit `deposit()` and `get_balance()` from `Account` without redefining them. This demonstrates how `__init__` works with inheritance to build layered object initialization.

## 🏢 Real World Use Case

**Django's model system** uses `__init__` extensively. When you define a Django model, the base `Model.__init__` receives keyword arguments that match the model's field definitions. It validates field types, sets default values, and populates instance attributes — all through the constructor. When you call `MyModel(name="Alice", age=30)`, Django's `__init__` processes each field, runs validators, converts values, and stores them. **SQLAlchemy** ORM uses `__init__` (or custom `__init__` methods on declarative models) to map database columns to Python attributes. The constructor accepts column values, validates types, and can compute derived fields. **Pydantic**, a data validation library, generates `__init__` methods automatically from type annotations. Its generated `__init__` includes parameter validation, type coercion, and default handling — all based on class annotations. **Requests** library uses `__init__` in its `Response` object to parse HTTP responses, populating attributes like `status_code`, `headers`, `content`, and `elapsed` from the raw server response.

## 🎯 Interview Questions

**Q1: Is `__init__` a constructor? What is the difference between `__init__` and `__new__`?**
A: `__init__` is the initializer, not the constructor. `__new__` is the actual constructor — it creates and returns a new instance of the class. `__init__` then receives that instance (as `self`) and initializes it. `__new__` is rarely overridden (used primarily for immutable types and metaclasses), while `__init__` is defined for almost every class. In most cases, `__init__` is all you need.

**Q2: What does `super().__init__()` do and why is it important in inheritance?**
A: `super().__init__()` calls the parent class's `__init__` method from a subclass, ensuring that the parent's initialization logic runs before the subclass adds its own. Without it, the parent's attributes would not be initialized, and the object would be in an incomplete state. `super()` handles the Method Resolution Order (MRO) correctly, which is especially important in multiple inheritance scenarios. Always call `super().__init__()` in a subclass unless you have a specific reason not to.

**Q3: Can a class have multiple `__init__` methods? How do you simulate method overloading in Python?**
A: Python does not support multiple `__init__` methods — if you define multiple, the last one overwrites the previous ones. To simulate overloading, use default parameter values (`def __init__(self, name="", age=None)`), variable-length arguments (`*args, **kwargs`), or class methods as alternative constructors (`@classmethod def from_string(cls, data):`).

**Q4: What happens if `__init__` does not set an attribute that a method later tries to access?**
A: The attribute will not exist, and accessing it will raise `AttributeError`. This is a common bug — ensure `__init__` initializes all attributes that the object's methods might access, even if they start as `None` or empty. This is called "defining the object's invariant" — the set of attributes that must always exist for the object to be in a valid state.

**Q5: Can `__init__` return a value? What happens if it does?**
A: `__init__` must return `None`. If you try to return a non-None value, Python raises a `TypeError` at runtime. The `__new__` method is responsible for returning the created object. `__init__` only modifies the already-created instance. If you need conditional object creation (return an existing instance or None), override `__new__` or use a factory method instead.

## ⚠ Common Errors / Mistakes

**Error 1: Forgetting to call `super().__init__()` in a subclass**
```python
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        # Wrong: parent __init__ not called
        # self.breed = breed  # self.name never initialized

        # Correct
        super().__init__(name)
        self.breed = breed
```

**Error 2: Using mutable default parameters in `__init__`**
```python
class ShoppingCart:
    # Wrong: all carts share the same list!
    def __init__(self, items=[]):
        self.items = items

    # Correct: None sentinel, create new list each time
    def __init__(self, items=None):
        self.items = items if items is not None else []
```

**Error 3: Raising an exception in `__init__` and leaving a partially initialized object**
```python
class User:
    def __init__(self, name, age):
        self.name = name
        if age < 0:
            # Object has .name but not .age
            raise ValueError("Age cannot be negative")
        self.age = age

# Even though __init__ raised, the object was already created by __new__
# It just never got fully initialized. The partially-initialized object
# will be garbage collected since no reference survives the exception.
```

## 📝 Practice Exercises

**Beginner:**
1. Create a `Circle` class with an `__init__` that takes `radius` as a parameter. Validate that radius is positive. Compute and store `diameter` and `area` as derived attributes.
2. Create a `Student` class where `__init__` accepts `name`, `student_id`, and optional `grades` (default empty list). Use the None sentinel pattern for the mutable default.
3. Build a `Timer` class that records the creation time in `__init__` using `time.time()` and provides an `elapsed()` method to return seconds since creation.

**Intermediate:**
4. Create a class hierarchy: `Vehicle` → `Car` and `Vehicle` → `Motorcycle`. `Vehicle.__init__` takes `make`, `model`, `year`. Each subclass adds specific attributes (e.g., `Car` has `doors`, `Motorcycle` has `engine_cc`). Use `super().__init__()`.
5. Build a `Temperature` class with `__init__` that accepts a value and a unit ('C', 'F', or 'K'). Validate the unit and that the value is above absolute zero. Store all three representations as computed attributes (celsius, fahrenheit, kelvin).
6. Implement a `ConfigLoader` class where `__init__` accepts a filename, reads the JSON file, and stores all key-value pairs as instance attributes (using `self.__dict__.update(data)`). Validate that the file exists and contains valid JSON.

**Advanced:**
7. Create a `ValidationMeta` metaclass that automatically adds type-checking to `__init__` based on class annotations. For example, a class with `name: str` and `age: int` annotations should have `__init__` automatically validate that `name` is a `str` and `age` is an `int`.
8. Design an `AttributeValidator` descriptor/decorator that can be applied to `__init__` parameters to add reusable validation rules (e.g., `@validate("age", min_value=0, max_value=150)`). Implement using function decorators that wrap the `__init__` method.
