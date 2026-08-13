## 25. JS Classes
## 📘 Introduction
ES6 introduced `class` syntax — syntactic sugar over JavaScript's existing prototype-based inheritance. Classes provide a cleaner, more familiar way to create constructor functions and manage inheritance, with support for static members, private fields, getters/setters, and method overriding.

## 🧠 Key Concepts
- `class ClassName { ... }` — class declaration (not hoisted like functions)
- `constructor()` — called when `new` is used; initializes instance properties
- **Methods** — functions on the prototype (shared across instances)
- **Static methods** — `static methodName() {}` — called on class itself, not instances
- **Inheritance**: `extends ParentClass` + `super()` in constructor
- **Private fields** `#field` — truly private (ES2022+), cannot be accessed outside class
- **Getters/Setters** — `get prop()` / `set prop(val)` — accessed as properties
- `instanceof` — checks if an object is an instance of a class (or its ancestors)

## 💻 Syntax
```javascript
class Person {
  #privateField = 'secret';

  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hi, I'm ${this.name}`;
  }

  static species() {
    return 'Homo sapiens';
  }

  get upperName() {
    return this.name.toUpperCase();
  }

  set upperName(val) {
    this.name = val;
  }
}
```

## ✅ Example 1 - Basic (Class + Getters/Setters)
**Problem:** Create a `Rectangle` class with area calculation using getters.

**Code:**
```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }

  get perimeter() {
    return 2 * (this.width + this.height);
  }
}

const rect = new Rectangle(5, 10);
console.log(`Area: ${rect.area}`);          // 50
console.log(`Perimeter: ${rect.perimeter}`); // 30
```

**Output:**
```
Area: 50
Perimeter: 30
```

**Explanation:** `area` and `perimeter` are defined as getters — they are accessed as properties (`rect.area`), not methods (`rect.area()`). They are computed on the fly based on current `width`/`height`.

## 🚀 Example 2 - Intermediate (Inheritance + Private Fields + Static)
**Problem:** Model an `Employee` extending a `Person` class with private salary.

**Code:**
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `I am ${this.name}`;
  }
}

class Employee extends Person {
  #salary;

  constructor(name, role, salary) {
    super(name);
    this.role = role;
    this.#salary = salary;
  }

  getDetails() {
    return `${super.introduce()}, ${this.role}`;
  }

  static fromObject(obj) {
    return new Employee(obj.name, obj.role, obj.salary);
  }
}

const emp = new Employee('Alice', 'Engineer', 90000);
console.log(emp.getDetails());       // I am Alice, Engineer
console.log(emp instanceof Person);  // true
console.log(emp instanceof Employee);// true
console.log(emp.#salary);            // SyntaxError (private)
```

**Output:**
```
I am Alice, Engineer
true
true
```

**Explanation:** `extends` sets up prototypal inheritance. `super(name)` calls the parent constructor. `#salary` is a truly private field — attempting to access it outside the class throws a SyntaxError. The static factory method `fromObject` creates instances without `new`.

## 🏢 Real World Use Case
UI component framework: a base `Component` class with `render()`, `setState()`, and lifecycle hooks. Specialized classes like `Button` and `Dropdown` extend it. Private fields `#state` encapsulate internal state. Static methods register components globally. `instanceof` checks in error boundaries.

## 🎯 Interview Questions
1. **What is the difference between `class` and a constructor function?** — `class` is syntactic sugar; both create prototypes. Classes are not hoisted, must be called with `new`, and methods are non-enumerable.
2. **What does `super()` do?** — Calls the parent class constructor. In a derived class, you must call `super()` before accessing `this`.
3. **What are `static` methods used for?** — Utility functions that belong to the class, not instances (e.g. `Math.max`, `Array.from`). Called as `ClassName.method()`.
4. **How do private fields work (`#field`)?** — Truly private at the language level (ES2022+). Accessible only inside the class body. Not discoverable via `Object.keys()` or `for...in`.
5. **How do you check if an object is an instance of a class?** — `object instanceof ClassName`. It checks the entire prototype chain.

## ⚠ Common Errors / Mistakes
- Forgetting to call `super()` in a derived constructor (throws `ReferenceError`)
- Using `new` on a class without a constructor (works — default empty constructor)
- Assuming class methods are on the instance — they are on the prototype
- Using `static` methods on instances — they're not accessible there
- Trying to access `#privateField` from outside the class (SyntaxError)

## 📝 Practice Exercises
**Beginner**
1. Create a `Book` class with `title`, `author`, and `year` properties and a `getAge()` method.
2. Add a getter `info` that returns `"title (year) by author"` format.
3. Create a `Library` class with `addBook(book)` and `listBooks()` methods.

**Intermediate**
4. Create a `DigitalBook` class that extends `Book` with an additional `format` property (`'pdf' | 'epub'`).
5. Use a private `#ratings` array inside a `Movie` class with `addRating(n)` and `get averageRating` getter.
6. Add a static method `Library.fromJSON(jsonArray)` that creates a Library from an array of book objects.

**Advanced**
7. Implement a simple ORM-like `Model` class with static `find()`, `create()`, instance `save()`, and `delete()` methods using private fields for dirty tracking.
8. Create a `Mixin` function system — write a `User` class that composes behaviors from `Timestamps` (adds `createdAt`/`updatedAt`) and `Validatable` (adds `validate()`) mixins.
