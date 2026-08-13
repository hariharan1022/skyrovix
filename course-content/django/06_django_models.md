# 6. Django Models

## 📘 Introduction
Django models are Python classes that define the structure and behavior of your data. Each model maps to a single database table, with attributes representing database fields. Django's ORM handles creating tables, querying data, and maintaining relationships between models automatically.

## 🧠 Key Concepts
- **models.Model**: Every model must inherit from `django.db.models.Model` to get database functionality.
- **Field Types**: Django provides dozens of field types mapping to database column types: `CharField`, `IntegerField`, `BooleanField`, `DateField`, `DateTimeField`, `TextField`, `FloatField`, `FileField`, `ImageField`, `EmailField`, `URLField`, `SlugField`, `DecimalField`, and more.
- **Field Options**: Constraints and behavior like `max_length`, `null`, `blank`, `default`, `unique`, `choices`, `db_index`, `verbose_name`, `help_text`.
- **Relationship Fields**: `ForeignKey` (many-to-one), `ManyToManyField`, `OneToOneField` define database relationships.
- **Meta Class**: Inner class for model-level metadata like `ordering`, `verbose_name`, `db_table`, `unique_together`, `indexes`.
- **`__str__()` Method**: Defines the human-readable representation of a model instance (used in admin and shell).

## 💻 Syntax
```python
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']

    def __str__(self):
        return self.name


class Article(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, db_index=True)
    content = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='articles')
    tags = models.ManyToManyField('Tag', blank=True)
    views = models.IntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at', '-created_at']
        indexes = [
            models.Index(fields=['status', 'published_at']),
        ]

    def __str__(self):
        return self.title


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
```

## ✅ Example 1 - Basic: Creating a Book Model

**Problem:** Create a `Book` model with title, author, price, and publication date.

**Code:**
```python
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    published_date = models.DateField()

    def __str__(self):
        return f"{self.title} by {self.author}"
```

**Output/Description:** This model creates a database table `myapp_book` with columns: `id` (auto-generated primary key), `title` (varchar 200), `author` (varchar 100), `price` (decimal 6,2), `published_date` (date). Running `python manage.py makemigrations` and `python manage.py migrate` creates the actual table.

**Explanation:** Each `models.Field` class maps to a database column type. `CharField` requires `max_length`. `DecimalField` needs `max_digits` (total digits) and `decimal_places`. `DateField` stores a date. The `__str__()` method determines how the object appears in the admin and shell. The table name is `appname_modelname` by default.

## 🚀 Example 2 - Intermediate: Models with Relationships and Meta Options

**Problem:** Create an e-commerce data model with `Author`, `Book`, and `Review` models demonstrating all three relationship types and Meta class usage.

**Code:**
```python
from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True)
    website = models.URLField(blank=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Book(models.Model):
    GENRE_CHOICES = [
        ('fic', 'Fiction'),
        ('non', 'Non-Fiction'),
        ('sci', 'Science Fiction'),
        ('fan', 'Fantasy'),
        ('bio', 'Biography'),
    ]

    title = models.CharField(max_length=200, db_index=True)
    genre = models.CharField(max_length=3, choices=GENRE_CHOICES)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    stock = models.IntegerField(default=0)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')
    published_date = models.DateField()
    is_bestseller = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-published_date']
        verbose_name = "Book"
        verbose_name_plural = "Books"

    def __str__(self):
        return self.title


class Review(models.Model):
    RATING_CHOICES = [(i, str(i)) for i in range(1, 6)]

    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reviews')
    reviewer_name = models.CharField(max_length=100)
    rating = models.IntegerField(choices=RATING_CHOICES)
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['book', 'reviewer_name']  # One review per person per book

    def __str__(self):
        return f"{self.reviewer_name} rated {self.book} ({self.rating}/5)"
```

**Output/Description:** Three tables are created: `myapp_author`, `myapp_book` (with `author_id` foreign key column), and `myapp_review` (with `book_id` foreign key). The `related_name` in ForeignKey fields enables reverse queries: `author.books.all()` and `book.reviews.all()`.

**Explanation:** `ForeignKey` creates a many-to-one relationship (one author has many books, one book belongs to one author). `on_delete=models.CASCADE` deletes all books when an author is deleted. `choices` restricts field values. `unique_together` creates a composite unique constraint. The `Meta` class provides ordering and database-level configurations.

## 🏢 Real World Use Case
A learning management system (LMS) models its data with Django models: `User` (built-in), `Course`, `Lesson`, `Enrollment`, `Progress`, `Quiz`, `Question`, `Answer`. `Course` has a `ForeignKey` to `User` (instructor). `Enrollment` has `ForeignKey` to both `User` and `Course` with `unique_together`. `Lesson` uses `ForeignKey` with `related_name='lessons'` on `Course`. `Progress` tracks completion per user per lesson. `Question` has `ForeignKey` to `Quiz` with `on_delete=models.CASCADE`. The `Meta.ordering` ensures consistent display order throughout the admin and frontend.

## 🎯 Interview Questions

**Q1: What is the difference between `null=True` and `blank=True` on a model field?**
**A:** `null=True` allows the database column to store `NULL` values (database-level). `blank=True` allows the field to be left empty in forms and validation (application-level). For string fields (`CharField`, `TextField`), use `blank=True` rather than `null=True` because Django stores empty strings, not NULL.

**Q2: Explain `on_delete` options for ForeignKey in Django.**
**A:** `CASCADE` deletes related objects, `PROTECT` prevents deletion with a `ProtectedError`, `SET_NULL` sets the foreign key to NULL (requires `null=True`), `SET_DEFAULT` sets to default value, `SET()` allows a custom function, `DO_NOTHING` takes no action (may cause database integrity errors), `RESTRICT` (Django 3.1+) prevents deletion if there are restricted relationships.

**Q3: What is the Meta class in Django models and what are some common options?**
**A:** `Meta` is an inner class that provides model-level metadata. Common options: `ordering` (default ordering for queries), `verbose_name`/`verbose_name_plural` (human-readable names), `db_table` (custom table name), `unique_together`/`constraints` (composite constraints), `indexes` (custom indexes), `abstract` (makes model abstract), `permissions` (custom permissions).

**Q4: How do you define a many-to-many relationship with extra data?**
**A:** Use a through model with `ManyToManyField(through='Membership')`. The intermediate model includes the foreign keys plus extra fields. For example, a `Person` can join multiple `Group`s, and `Membership` tracks the `date_joined` and `invite_reason` for each person-group pair.

**Q5: What does `auto_now_add` vs `auto_now` do?**
**A:** `auto_now_add=True` sets the field to the current timestamp only when the object is first created (ideal for `created_at`). `auto_now=True` sets the field to the current timestamp every time the object is saved (ideal for `updated_at`). Both use `datetime.now()` and cannot be overridden manually.

## ⚠ Common Errors / Mistakes
- **Forgetting `on_delete` for ForeignKey**: Django requires `on_delete` as a required argument. Common mistake is omitting it entirely.
- **Using `null=True` on CharField/TextField**: Creates unnecessary NULL vs empty string ambiguity. Use `blank=True` instead.
- **Not using `db_index` on frequently queried fields**: Causes slow queries on large tables. Always index foreign keys and filter fields.
- **Confusing `unique=True` with `primary_key=True`**: `unique=True` ensures no duplicate values but allows one NULL (on databases that allow it). `primary_key=True` is always unique and not null.
- **Setting `auto_now` and `auto_now_add` on the same field**: These options are mutually exclusive — use one per field.
- **Circular import with ForeignKey strings**: Use the string form `'app.Model'` for ForeignKeys to models in other apps or self-referencing.

## 📝 Practice Exercises

**Beginner (3):**
1. Create a `Student` model with fields: `first_name`, `last_name`, `email` (unique), `date_of_birth`, `enrollment_date` (auto-set on creation).
2. Create a `Product` model with `name`, `description` (TextField), `price` (DecimalField), `quantity_in_stock` (IntegerField with default 0), and `available` (BooleanField default True).
3. Add `__str__()` and `Meta.ordering` to both models.

**Intermediate (3):**
1. Create models for a library system: `Author`, `Book`, `Borrower`, and `Loan`. `Author` has a one-to-many relationship with `Book`. `Loan` connects `Book` and `Borrower` with a `borrow_date`, `due_date`, and `returned` boolean.
2. Add a `Publisher` model with a unique name. Create a many-to-many relationship between `Publisher` and `Book`. Add a through model `Publication` with a `contract_date` field.
3. Implement a `Category` model with a self-referencing `ForeignKey` (`parent`) for hierarchical categories. Add `Meta.verbose_name_plural = "Categories"`.

**Advanced (2):**
1. Build an inventory management model system: `Warehouse`, `Shelf` (with location in warehouse via FK), `Product` (with SKU, barcode), `StockLevel` (FK to Product and Shelf, quantity field, unique_together). Implement `clean()` method validation to prevent negative stock.
2. Implement an event-sourcing pattern using Django models: create `Event` as an abstract base model with `timestamp`, `user`, `event_type`. Create concrete event models (`OrderPlaced`, `PaymentReceived`, `ItemShipped`) that inherit from `Event` using multi-table inheritance. Discuss the trade-offs vs single-table inheritance.
