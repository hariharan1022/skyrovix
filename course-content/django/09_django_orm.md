# 9. Django ORM Queries

## 📘 Introduction
Django's Object-Relational Mapper (ORM) is a powerful database abstraction layer that allows you to interact with your database using Python code. Instead of writing SQL, you use Python methods that are translated into optimized SQL queries behind the scenes. The ORM supports all major databases and provides a consistent API for queries regardless of the backend.

## 🧠 Key Concepts
- **Manager**: The interface through which database queries are provided. Default is `Model.objects`.
- **QuerySet**: A collection of database queries — lazy, cached, and chainable.
- **Chaining**: QuerySet methods return new QuerySets, allowing method chaining: `Model.objects.filter(...).exclude(...).order_by(...)`.
- **Field Lookups**: Filter modifiers like `exact`, `contains`, `icontains`, `gt`, `gte`, `lt`, `lte`, `in`, `startswith`, `range`, `date`, `year`, `month`, `day`, `isnull`.
- **Aggregation**: Computing summary values (Count, Sum, Avg, Max, Min) with `annotate()` and `aggregate()`.
- **Eager Loading**: `select_related()` (for ForeignKey/OneToOne) and `prefetch_related()` (for ManyToMany/reverse FK) optimize queries by reducing database hits.
- **Q Objects**: Complex queries with OR (`|`), AND (`&`), and NOT (`~`) logic combinations.

## 💻 Syntax
```python
# Basic queries
all_books = Book.objects.all()
filtered = Book.objects.filter(author='Tolkien', published=True)
excluded = Book.objects.exclude(price__gt=50)
single = Book.objects.get(id=1)
ordered = Book.objects.order_by('-price')

# Field lookups
contains = Book.objects.filter(title__contains='Django')
date_range = Book.objects.filter(published_date__year=2026)
in_list = Book.objects.filter(status__in=['draft', 'review'])
null_check = Book.objects.filter(description__isnull=False)

# Aggregation
from django.db.models import Count, Sum, Avg, Max, Min
total = Book.objects.aggregate(avg_price=Avg('price'))
counts = Book.objects.values('author').annotate(total=Count('id'))

# Related objects (eager loading)
books = Book.objects.select_related('author').all()
authors = Author.objects.prefetch_related('books').all()

# Complex queries with Q
from django.db.models import Q
results = Book.objects.filter(
    Q(title__icontains='python') | Q(title__icontains='django'),
    ~Q(status='archived')
)
```

## ✅ Example 1 - Basic: CRUD Operations with the ORM

**Problem:** Perform basic Create, Read, Update, Delete operations using Django ORM.

**Code:**
```bash
python manage.py shell
```

```python
>>> from blog.models import Book

# CREATE
>>> book = Book(title='Django for Beginners', author='William Vincent', price=29.99)
>>> book.save()
>>> Book.objects.create(title='Two Scoops of Django', author='Daniel Greenfeld', price=39.99)

# READ (all)
>>> books = Book.objects.all()
>>> for b in books:
...     print(b.title, b.price)

# READ (filtered)
>>> cheap_books = Book.objects.filter(price__lt=35)
>>> specific = Book.objects.get(title='Django for Beginners')

# UPDATE
>>> book = Book.objects.get(id=1)
>>> book.price = 24.99
>>> book.save()
>>> Book.objects.filter(author='William Vincent').update(price=19.99)

# DELETE
>>> book = Book.objects.get(id=2)
>>> book.delete()
>>> Book.objects.filter(price__gt=50).delete()
```

**Output/Description:** Books are created, read, updated, and deleted. The `save()` method persists changes. `filter()` returns a QuerySet; `get()` returns a single object. `update()` does a bulk SQL UPDATE without loading objects into memory. `delete()` removes records.

**Explanation:** `Model.objects.create()` combines instantiation and save in one step. `get()` raises `Model.DoesNotExist` if no match or `Model.MultipleObjectsReturned` if multiple matches. `update()` and `delete()` on QuerySets operate at the database level and return the count of affected rows.

## 🚀 Example 2 - Intermediate: Complex Queries with Annotations and Q Objects

**Problem:** Build a query that finds popular authors (avg rating > 3) who have at least 2 published books in specific genres.

**Code:**
```python
from django.db.models import Count, Avg, Q, F
from bookstore.models import Author, Book, Review

# Annotate each author with book count and average rating
popular_authors = Author.objects.annotate(
    book_count=Count('books', filter=Q(books__status='published')),
    avg_rating=Avg('books__reviews__rating'),
).filter(
    book_count__gte=2,
    avg_rating__gt=3.0,
).order_by('-avg_rating')

for author in popular_authors:
    print(f"{author.name}: {author.book_count} books, avg rating {author.avg_rating:.1f}")

# Complex Q query: books matching any of multiple genres, except archived
from django.db.models import Q

books = Book.objects.filter(
    Q(genre='fic') | Q(genre='fan') | Q(genre='sci'),
    ~Q(status='archived'),
    price__lte=F('stock') * 5,  # price <= stock * 5 (using F() expressions)
)

# Find books with many reviews (prefetch for performance)
from django.db.models import Prefetch

top_books = Book.objects.filter(
    reviews__rating__gte=4
).distinct().prefetch_related(
    Prefetch('reviews', queryset=Review.objects.filter(rating__gte=4))
)

# Values + annotations for grouped data
stats = Book.objects.values('genre').annotate(
    total=Count('id'),
    avg_price=Avg('price'),
    max_price=Max('price'),
).order_by('-total')

# Chaining filters, excludes, and annotations with F expressions
from django.db.models import F

result = Book.objects.filter(
    published_date__year=2026
).exclude(
    status='draft'
).annotate(
    revenue=F('price') * F('copies_sold')
).filter(
    revenue__gt=1000
).order_by('-revenue')[:10]
```

**Output/Description:** The query returns authors with high average ratings who have multiple published books. The `annotate()` adds computed fields. `Q` objects combine OR conditions. `F()` expressions reference model fields in queries. `Prefetch` optimizes related data loading.

**Explanation:** `annotate()` adds aggregated fields to each result while grouping by the model. `values()` before `annotate()` changes the grouping level. `F()` expressions allow comparing model fields and performing arithmetic in the database. `distinct()` prevents duplicate rows from JOIN operations. `Prefetch` with a custom queryset pre-filters related data.

## 🏢 Real World Use Case
An analytics dashboard for an e-commerce platform uses Django ORM to generate reports. `Order.objects.filter(created_at__gte=start_date).values('product__category').annotate(total_revenue=Sum('total_amount'), order_count=Count('id'), avg_order_value=Avg('total_amount'))` generates category-level sales data. Q objects handle complex filtering: `Q(status='shipped') | Q(status='delivered')` combined with `~Q(payment_status='refunded')`. `select_related('user__profile')` optimizes the order list for the admin dashboard.

## 🎯 Interview Questions

**Q1: What is the difference between `select_related()` and `prefetch_related()`?**
**A:** `select_related()` performs a SQL JOIN to include related objects in a single query. It works for ForeignKey and OneToOneField relationships. `prefetch_related()` executes separate queries and joins results in Python. It works for ManyToManyField and reverse ForeignKey relationships. Use `select_related` for single-valued relationships, `prefetch_related` for multi-valued.

**Q2: What is a QuerySet and when is it evaluated?**
**A:** A QuerySet is a lazy collection of database queries. It is not evaluated (no database hit) until it is "iterated" — list conversion, iteration, slicing without step, pickling, repr, len, bool conversion, or explicit `.iterator()`. This laziness allows chaining filters without hitting the database until necessary.

**Q3: What is the difference between `aggregate()` and `annotate()`?**
**A:** `aggregate()` returns a dictionary of computed values across the entire QuerySet (e.g., total count, average price). It does not group results. `annotate()` adds computed fields to each object in the QuerySet (e.g., number of reviews per book). It groups by model instance and returns a QuerySet.

**Q4: How do you handle OR conditions in Django ORM?**
**A:** Use Q objects with the `|` operator: `Model.objects.filter(Q(field1='value') | Q(field2='value'))`. Combine with `&` for AND and `~` for NOT. Q objects can be nested arbitrarily. For simple OR on the same field, use `__in` lookup: `Model.objects.filter(field__in=['a', 'b'])`.

**Q5: What is an `F()` expression and when would you use it?**
**A:** `F()` allows referencing model field values directly in database queries, avoiding race conditions. Use cases: incrementing a counter (`views = F('views') + 1`), comparing fields (`filter(price__gt=F('original_price'))`), updating based on another field, and conditional annotations with `Case/When`.

## ⚠ Common Errors / Mistakes
- **N+1 query problem**: Accessing related objects in a loop without `select_related`/`prefetch_related` generates one query per iteration.
- **Calling `.all()` unnecessarily**: `Model.objects.all()` is the default manager — calling it again on a queryset returns the same data without benefit.
- **Using `get()` when multiple objects exist**: Raises `MultipleObjectsReturned`. Use `filter()` or add more constraints.
- **Not handling `DoesNotExist` exception**: `get()` raises `Model.DoesNotExist` when no match found — must handle with try/except.
- **Forgetting `.distinct()` on JOIN queries**: Many-to-many and reverse FK queries can return duplicate rows.
- **Inefficient queries with `count()` vs `len()`**: Use `queryset.count()` for database-count, not `len(queryset)` which loads all records.

## 📝 Practice Exercises

**Beginner (3):**
1. Create a `Product` model with `name`, `price`, and `stock`. Write ORM queries to: get all products, filter by price range, get a single product by name.
2. Perform `aggregate()` to compute total stock, average price, and most expensive product across all products.
3. Use `order_by()` to list products cheapest first, then most expensive, then by name alphabetically.

**Intermediate (3):**
1. Add a `Category` model (ForeignKey to Product). Use `annotate()` to show each category with product count and average price. Order by product count descending.
2. Implement a search feature using Q objects: find products where the name OR description contains a search term, OR the category name matches, EXCEPT archived products.
3. Use `select_related()` and `prefetch_related()` to optimize a query that displays a category list with all products and each product's reviews. Count the number of SQL queries with `django.db.connection.queries`.

**Advanced (2):**
1. Build a full-text search using `SearchVector` and `SearchQuery` from `django.contrib.postgres.search`. Implement ranking and trigram similarity for fuzzy matching.
2. Implement a recursive CTE using Django ORM's `With` clause (PostgreSQL) to query a hierarchical category tree (self-referencing ForeignKey). Write a query that fetches all descendants of a given category with depth information.
