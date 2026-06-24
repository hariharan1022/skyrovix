## 45. Python Encapsulation

## 📘 Introduction
Encapsulation is the bundling of data and methods that operate on that data within a single unit (a class), restricting direct access to some components. Python uses naming conventions — not language-enforced access modifiers — to indicate intended visibility: public (no prefix), protected (single underscore `_`), and private (double underscore `__` with name mangling). Together with properties, these conventions form Python's encapsulation model.

## 🧠 Key Concepts
- **Public**: no underscore prefix — accessible from anywhere; the default for all attributes
- **Protected**: single underscore prefix `_attr` — "please don't touch this" convention; accessible but signals internal use
- **Private**: double underscore prefix `__attr` — triggers name mangling to `_ClassName__attr` at compile time
- **Name mangling**: Python rewrites `__attr` to `_ClassName__attr` to prevent accidental overrides in subclasses
- `@property` provides controlled access with getter/setter interface
- Getter/setter pattern: methods to retrieve and assign values with validation logic
- Python trusts developers — there is no `private` or `protected` keyword as in Java/C++
- Best practice: use public attributes for simple values, properties for validation, private for implementation details

## 💻 Syntax
```python
class MyClass:
    def __init__(self):
        self.public = "accessible everywhere"
        self._protected = "internal use by convention"
        self.__private = "name-mangled to _MyClass__private"

    def _internal_method(self):
        pass

    def __private_method(self):
        pass
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Create a `BankAccount` class that prevents direct manipulation of the balance from outside the class. Use a protected attribute with controlled getter/setter via properties.

**Code:**
```python
class BankAccount:
    def __init__(self, owner, initial_balance=0):
        self.owner = owner
        self._balance = 0
        if initial_balance > 0:
            self.deposit(initial_balance)

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self._balance += amount

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal must be positive")
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount

# Usage
acc = BankAccount("Alice", 1000)
print(f"Balance: ${acc.balance}")
acc.deposit(500)
acc.withdraw(200)
print(f"Balance: ${acc.balance}")

# Direct access is discouraged but not prevented
print(f"Protected _balance: ${acc._balance}")
```

**Output:**
```
Balance: $1000
Balance: $1300
Protected _balance: $1300
```

**Explanation:** `_balance` is a protected attribute (convention says don't touch it). Access is controlled via the `balance` property (read-only) and the `deposit()`/`withdraw()` methods that enforce business rules. The underscore prefix signals to other developers that `_balance` is internal. Though Python allows `acc._balance = 9999`, the convention discourages it.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Create a `User` class where the password is stored securely using a private attribute with name mangling. Provide methods to set and verify the password. Demonstrate how name mangling prevents accidental access or collision in subclasses.

**Code:**
```python
class User:
    def __init__(self, username, password):
        self.username = username
        self.__password = self._hash(password)

    def _hash(self, password):
        return "".join(str(ord(c) ^ 0xFF) for c in password)

    def verify_password(self, password):
        return self._hash(password) == self.__password

    def set_password(self, old_password, new_password):
        if not self.verify_password(old_password):
            raise PermissionError("Wrong password")
        self.__password = self._hash(new_password)

    def get_encrypted_password(self):
        return self.__password

class AdminUser(User):
    def __init__(self, username, password, role):
        super().__init__(username, password)
        self.role = role
        # self.__password is NOT accessible here — name mangling
        # The admin subclass uses _User__password to access parent's private attr

# Usage
u = User("alice", "secret123")
print(f"Username: {u.username}")
print(f"Encrypted: {u.get_encrypted_password()}")
print(f"Verify 'secret123': {u.verify_password('secret123')}")
print(f"Verify 'wrong': {u.verify_password('wrong')}")

# Name mangling in action
print(f"Mangled name: {u._User__password}")  # Access via mangled name (possible but strongly discouraged)
```

**Output:**
```
Username: alice
Encrypted: 242247239247243243243243247243247
Verify 'secret123': True
Verify 'wrong': False
Mangled name: 242247239247243243243243247243247
```

**Explanation:** `__password` triggers name mangling to `_User__password`. This prevents a subclass from accidentally defining its own `__password` that shadows the parent's version. Although Python does not truly prevent access (the mangled name can still be accessed), the double underscore signals strong intent that this is private. The parent's `__password` and an `AdminUser`'s `__password` would be stored separately under different mangled names (`_User__password` vs `_AdminUser__password`).

## 🏢 Real World Use Case
**ORM Model Fields in Databases:** SQLAlchemy and Django ORM use protected attributes (`_state`, `_meta`) for internal state while exposing public attributes and properties for model fields. Private methods like `__init_subclass__` are used for metaclass registration. Name mangling prevents mixin collisions when multiple abstract model classes are combined.

## 🎯 Interview Questions (5 with answers)

**Q1. Does Python have true private attributes like Java?**
*No. Python relies on naming conventions: `_attr` (protected) and `__attr` (private via name mangling). Nothing in Python prevents access — it is all voluntary consent by convention.*

**Q2. What is name mangling and why is it used?**
*Name mangling transforms `__attr` to `_ClassName__attr` at compile time. It prevents accidental attribute collisions in subclasses, not to enforce security.*

**Q3. How do you access a private attribute from outside the class?**
*Use the mangled name `_ClassName__attr` — e.g., `obj._MyClass__private`. This is strongly discouraged and considered a breach of the class's contract.*

**Q4. Should you use `@property` or getter/setter methods?**
*Use `@property` for simple attribute access with validation. Use explicit getter/setter methods when the operation is more complex (e.g., database reads/writes, caching logic) or when the method name carries semantics beyond "get/set."*

**Q5. What is the difference between `_attr` and `__attr__`?**
*`_attr` is a protected attribute (convention). `__attr__` (dunder) is a Python special method or attribute — these are not private; they are reserved for Python's internal protocol. Never invent your own `__attr__` names.*

## ⚠ Common Errors / Mistakes
- Expecting `__attr` to be truly inaccessible — Python name mangling is not security enforcement.
- Using `__attr` for every attribute "just to be safe" — this complicates subclassing and debugging.
- Accidentally creating a new attribute with the same name instead of modifying the existing one due to name mangling confusion.
- Forgetting that name mangling happens at compile time — `setattr(obj, '__attr', val)` does NOT trigger mangling.
- Overusing protected attributes when a simple public attribute with a property would be cleaner.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)

**Beginner:**
1. Create a `Person` class with a public `name`, a protected `_age`, and a public method `birthday()` that increments the age.
2. Create a `Counter` class with a private `__count` that can only be modified via `increment()` and `decrement()` methods, and read via a `count` property.
3. Create a `Temperature` class with a private `__celsius` attribute. Provide a `celsius` property (getter/setter) with validation (no values below -273.15).

**Intermediate:**
4. Create a `PasswordManager` class with a private `__master_password`. Provide methods `set_master(old, new)`, `verify(attempt)`, and a read-only property `locked` that returns `True` if too many wrong attempts occurred.
5. Create a `ShoppingCart` class with a protected `_items` list. Provide public methods `add_item()`, `remove_item()`, and a read-only `total` property. Subclass it as `DiscountCart` that overrides the `total` property to apply a percentage discount.
6. Create a `Logger` class hierarchy where the base class stores its log level in a private `__level` attribute. Create `FileLogger` and `ConsoleLogger` subclasses. Demonstrate how name mangling prevents the subclasses' own `__level` from colliding with the base class's.

**Advanced:**
7. Create a `SecureConfig` class that stores configuration values in a private `__config` dict. Provide property-like access via `__getattr__` and `__setattr__` that logs all access. Use `__getattribute__` to prevent access to the internal `__config` dict. Ensure that setting an attribute only writes to `__config` if it was previously defined (preventing accidental creation of new attributes).
8. Create a `Proxy` class that wraps another object and provides controlled access: public methods are forwarded, protected methods require a passkey, and private methods are blocked entirely. Use `__getattr__` for forwarding and `__setattr__` for tracking mutations. Demonstrate by wrapping a `BankAccount` instance.
