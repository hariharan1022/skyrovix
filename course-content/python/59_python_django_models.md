## 59. Django Models
## 📘 Introduction
Django models define the structure of your database using Python classes. Each model maps to a single database table, and each attribute maps to a table column. Django's ORM (Object-Relational Mapper) lets you query the database using Python code instead of raw SQL. Migrations handle schema changes automatically.

## 🧠 Key Concepts
- **Model class**: Subclass of `django.db.models.Model` — each is a database table
- **Fields**: `CharField`, `IntegerField`, `DateTimeField`, `ForeignKey`, `BooleanField`, `TextField`, etc.
- **Migrations**: Python files that record changes to models (`makemigrations` + `migrate`)
- **ORM Queries**: `filter()`, `get()`, `create()`, `all()`, `exclude()`, `order_by()`
- **Admin registration**: Register models in `admin.py` to manage via the admin interface
- **Relationships**: `ForeignKey` (many-to-one), `ManyToManyField`, `OneToOneField`

## 💻 Syntax
```python
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    in_stock = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
```

**Migrations:**
```bash
python manage.py makemigrations
python manage.py migrate
```

**ORM queries:**
```python
# Create
Product.objects.create(name='Laptop', price=999.99)

# Read
product = Product.objects.get(id=1)
products = Product.objects.filter(in_stock=True, price__lt=500)

# Update
product.price = 899.99
product.save()

# Delete
product.delete()
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Define a simple `Book` model with title, author, and publication year. Create and retrieve records.

```python
# books/models.py
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    published_year = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} by {self.author}"
```

```python
# books/admin.py
from django.contrib import admin
from .models import Book

admin.site.register(Book)
```

**Shell interaction (python manage.py shell):**
```python
from books.models import Book

# Create
book1 = Book.objects.create(title='1984', author='George Orwell', published_year=1949)
book2 = Book.objects.create(title='To Kill a Mockingbird', author='Harper Lee', published_year=1960)

# Retrieve all
all_books = Book.objects.all()
for b in all_books:
    print(b)

# Filter
old_books = Book.objects.filter(published_year__lt=1950)
print("Books before 1950:", [b.title for b in old_books])

# Get single
book = Book.objects.get(title='1984')
print(f"Title: {book.title}, Author: {book.author}, Year: {book.published_year}")
```

**Output:**
```
1984 by George Orwell
To Kill a Mockingbird by Harper Lee
Books before 1950: ['1984']
Title: 1984, Author: George Orwell, Year: 1949
```

**Explanation:** `Book` is a model with 4 fields. `CharField` for text, `IntegerField` for year, `DateTimeField` with `auto_now_add` for creation timestamp. `__str__()` defines the human-readable representation. `admin.site.register()` makes the model manageable in Django's admin. The ORM provides `objects.create()` for inserts, `all()` for full table scans, `filter()` with field lookups (`__lt` = less than), and `get()` for single record retrieval.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Create related models (Author and Book with ForeignKey), run migrations, and perform JOIN-style queries.

```python
# library/models.py
from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')
    genre = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    published = models.DateField()

    def __str__(self):
        return self.title
```

```python
# library/admin.py
from django.contrib import admin
from .models import Author, Book

admin.site.register(Author)
admin.site.register(Book)
```

**Shell interaction:**
```python
from library.models import Author, Book
from datetime import date

# Create author
author = Author.objects.create(name='J.K. Rowling', email='jk@example.com', bio='British author')

# Create books linked to author
Book.objects.create(title='Harry Potter and the Sorcerer\'s Stone', author=author, genre='Fantasy', price=20.99, published=date(1997, 6, 26))
Book.objects.create(title='Harry Potter and the Chamber of Secrets', author=author, genre='Fantasy', price=21.99, published=date(1998, 7, 2))

# Query: get all books by author
books = author.books.all()  # via related_name
print(f"Books by {author.name}:")
for b in books:
    print(f"  - {b.title} (${b.price})")

# Query: get author from book (reverse FK)
book = Book.objects.get(title__startswith='Harry Potter')
print(f"\n'{book.title}' is written by {book.author.name}")

# Filter across relationship
fantasy_books = Book.objects.filter(author__name='J.K. Rowling', genre='Fantasy')
print(f"\nFantasy books by Rowling: {fantasy_books.count()}")
```

**Output:**
```
Books by J.K. Rowling:
  - Harry Potter and the Sorcerer's Stone ($20.99)
  - Harry Potter and the Chamber of Secrets ($21.99)

'Harry Potter and the Sorcerer's Stone' is written by J.K. Rowling

Fantasy books by Rowling: 2
```

**Explanation:** `ForeignKey` creates a many-to-one relationship (one author, many books). `on_delete=models.CASCADE` means deleting an author deletes all their books. `related_name='books'` allows `author.books.all()` for reverse queries. Django ORM automatically follows relationships with double-underscore syntax (`author__name`). `startswith` is a field lookup (LIKE query in SQL).

## 🏢 Real World Use Case
A university's course registration system uses Django models for Student, Course, and Enrollment (with ForeignKey + additional fields like grade). Migrations manage schema evolution across semesters. The ORM powers complex queries — "find all courses taught by Professor X in which students from department Y have enrolled, sorted by enrollment count." The admin interface allows registrars to manage data without writing SQL or building custom CRUD views.

## 🎯 Interview Questions (5 with answers)

**1. What is the difference between `CharField` and `TextField`?**
`CharField` is for short strings with a `max_length` (e.g., names, titles). `TextField` is for large text with no practical size limit (e.g., blog content, bios).

**2. What does `on_delete=models.CASCADE` do?**
It specifies that when a referenced object is deleted, all objects that reference it via ForeignKey should also be deleted. Other options: `PROTECT`, `SET_NULL`, `SET_DEFAULT`, `DO_NOTHING`.

**3. What is the difference between `filter()` and `get()`?**
`filter()` returns a QuerySet (0, 1, or many results). `get()` returns a single object and raises `DoesNotExist` or `MultipleObjectsReturned` if the lookup doesn't match exactly one record.

**4. What are migrations and why are they needed?**
Migrations are Python files that track changes to model definitions. They allow you to apply, revert, and share schema changes consistently across environments. `makemigrations` creates migration files; `migrate` applies them to the database.

**5. How do you create a model field with a default value?**
Add `default=value` to the field definition, e.g., `is_active = models.BooleanField(default=True)` or `created_at = models.DateTimeField(auto_now_add=True)`.

## ⚠ Common Errors / Mistakes
- **Forgetting `on_delete` for ForeignKey**: Django 2.0+ requires explicit `on_delete`. `models.CASCADE` is the most common choice.
- **Not running migrations**: Changing a model requires both `makemigrations` and `migrate`. Forgetting either leaves the database out of sync.
- **Using `get()` when multiple objects match**: Raises `MultipleObjectsReturned`. Use `filter().first()` if you expect at most one.
- **Field type mismatches**: Using `IntegerField` for prices loses cents. Use `DecimalField` for monetary amounts.
- **Missing `__str__`**: Without it, objects appear as "Book object (1)" in admin and shell output.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)

**Beginner:**
1. Create a model `Movie` with fields: title (CharField), director (CharField), year (IntegerField), rating (FloatField). Register it in admin.
2. Run `makemigrations` and `migrate`. Use the shell to create 3 movies and retrieve all of them.
3. Add a `__str__` method to the Movie model. Verify it works in the shell.

**Intermediate:**
4. Create a model `Review` with a ForeignKey to Movie, plus `reviewer_name` (CharField) and `score` (IntegerField). Register both in admin. Create a movie and 2 reviews via the shell.
5. Write ORM queries to: (a) get all reviews for a specific movie, (b) get the average score per movie using `annotate()` and `Avg`.
6. Add a `published` field (DateField with `auto_now_add=True`) to the Movie model. Run migrations and verify existing records get auto-populated with the current date.

**Advanced:**
7. Create a `Student` model (name, email) and a `Course` model (title, code, credits). Add a ManyToManyField from Student to Course with an explicit `through` model `Enrollment` that includes an `enrolled_date` and `grade`. Write a query to find all students enrolled in a course with grade 'A'.
8. Build a model hierarchy: `Category` -> `Product` (ForeignKey to Category) -> `OrderItem` (ForeignKey to Product, plus quantity and unit_price). Write a query using `select_related()` and `prefetch_related()` to fetch an order with all related item, product, and category data in minimal queries.
