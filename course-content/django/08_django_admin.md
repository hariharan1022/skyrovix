# 8. Django Admin

## 📘 Introduction
Django's admin interface is one of its most powerful features. It automatically generates a fully functional, customizable administration interface based on your registered models. The admin panel allows non-technical users to create, read, update, and delete data without writing any frontend code.

## 🧠 Key Concepts
- **Superuser**: A special user with all permissions created via `python manage.py createsuperuser`.
- **Model Registration**: `admin.site.register(Model)` adds a model to the admin interface.
- **ModelAdmin**: A class that customizes how a model is displayed and managed in the admin.
- **list_display**: Controls which fields appear in the list view columns.
- **list_filter**: Adds filter sidebar for specified fields.
- **search_fields**: Enables search box for text fields.
- **fieldsets**: Groups fields into sections on the detail form.
- **readonly_fields**: Displays fields as read-only text.
- **Inlines**: Displays related models on the same page as the parent model (StackedInline, TabularInline).
- **Admin Actions**: Custom bulk operations selectable from the dropdown in the list view.
- **`@admin.register()`**: Decorator alternative to `admin.site.register()`.

## 💻 Syntax
```python
# admin.py — Basic registration
from django.contrib import admin
from .models import Article, Category

class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'author', 'published_at']
    list_filter = ['status', 'published_at', 'author']
    search_fields = ['title', 'content']
    ordering = ['-published_at']
    readonly_fields = ['created_at', 'updated_at']

admin.site.register(Article, ArticleAdmin)
```

```python
# admin.py — Using the @admin.register() decorator
from django.contrib import admin
from .models import Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'article_count']
    prepopulated_fields = {'slug': ('name',)}

    def article_count(self, obj):
        return obj.articles.count()
    article_count.short_description = "Articles"
```

```python
# admin.py — TabularInline for related models
class CommentInline(admin.TabularInline):
    model = Comment
    extra = 1  # Number of empty forms to display

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    inlines = [CommentInline]
```

## ✅ Example 1 - Basic: Creating a Superuser and Registering a Model

**Problem:** Create a superuser, register a `Book` model in the admin, and perform CRUD operations.

**Code:**
```python
# models.py
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
```

```bash
# Create superuser
python manage.py createsuperuser
# Enter: Username: admin
#        Email: admin@example.com
#        Password: ********
```

```python
# admin.py
from django.contrib import admin
from .models import Book

admin.site.register(Book)
```

**Output/Description:** Visit `http://127.0.0.1:8000/admin/`, log in with superuser credentials. The `Books` model appears as a link. Clicking it shows a list of books with a default display showing the `__str__()` output. You can add, edit, and delete books.

**Explanation:** By default, Django admin uses the model's `__str__()` for display. The admin automatically generates forms based on model fields. The superuser has all permissions — you can also create users with specific permissions through the admin's User and Group management.

## 🚀 Example 2 - Intermediate: Full ModelAdmin Customization

**Problem:** Create a customized admin for an `Article` model with filters, search, inline comments, custom actions, and field grouping.

**Code:**
```python
# admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import Article, Comment

class CommentInline(admin.TabularInline):
    model = Comment
    extra = 1
    readonly_fields = ['created_at']
    fields = ['name', 'email', 'content', 'created_at']

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'author_name', 'view_count', 'is_featured', 'published_at']
    list_filter = ['status', 'is_featured', 'published_at', 'author']
    search_fields = ['title', 'content']
    ordering = ['-published_at']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_at'
    list_editable = ['status', 'is_featured']
    list_per_page = 25
    readonly_fields = ['created_at', 'updated_at', 'view_count']
    inlines = [CommentInline]

    fieldsets = [
        ('Content', {
            'fields': ['title', 'slug', 'content', 'author', 'category']
        }),
        ('Publishing', {
            'fields': ['status', 'is_featured', 'published_at'],
            'classes': ['collapse'],
        }),
        ('Metadata', {
            'fields': ['view_count', 'created_at', 'updated_at'],
            'classes': ['collapse'],
        }),
    ]

    actions = ['make_published', 'make_featured']

    def author_name(self, obj):
        return obj.author.get_full_name() or obj.author.username
    author_name.short_description = "Author"
    author_name.admin_order_field = 'author__last_name'

    def view_count(self, obj):
        color = 'green' if obj.views > 100 else 'orange'
        return format_html('<span style="color: {};">{}</span>', color, obj.views)

    @admin.action(description="Mark selected articles as published")
    def make_published(self, request, queryset):
        updated = queryset.update(status='published')
        self.message_user(request, f'{updated} articles published.')

    @admin.action(description="Mark selected articles as featured")
    def make_featured(self, request, queryset):
        updated = queryset.update(is_featured=True)
        self.message_user(request, f'{updated} articles featured.')
```

**Output/Description:** The admin article list shows custom columns with colored view counts, editable status and featured fields, filter sidebar, search box, date drill-down, and bulk action dropdown. The edit form has collapsible fieldsets and inline comment management.

**Explanation:** `list_editable` fields can be changed directly from the list view. `prepopulated_fields` auto-fills slug from title. `date_hierarchy` adds a date-based drill-down navigation. `fieldsets` organizes the edit form into sections. `@admin.action` creates custom bulk operations with user feedback messages. `format_html` safely renders HTML in admin list displays.

## 🏢 Real World Use Case
A content management system for a news website uses Django admin extensively. Journalists (with staff status) log in to write articles using a customized admin with `TinyMCE` or `CKEditor` widget for rich text. Editors have additional permissions to publish content. The admin shows article analytics (view count, read time) as read-only fields. Custom actions allow bulk publishing, archiving old articles, and generating SEO metadata. The admin's `list_filter` enables editors to find articles by section, author, status, and date range.

## 🎯 Interview Questions

**Q1: What is the difference between `admin.site.register(Model)` and `@admin.register(Model)`?**
**A:** Both register a model with the admin. `admin.site.register(Model)` is the traditional function call. `@admin.register(Model)` is a decorator that performs the same registration. The decorator syntax is cleaner and keeps the registration next to the ModelAdmin class definition. If no custom ModelAdmin is needed, `admin.site.register(Model)` can be called without a second argument.

**Q2: How do you customize the admin list display with computed columns?**
**A:** Define methods on the ModelAdmin and add them to `list_display`. Methods can return computed values, formatted HTML (using `format_html`), or data from related models. Use `short_description` attribute for the column header and `admin_order_field` to enable sorting on a related field.

**Q3: What are Inlines in Django admin?**
**A:** Inlines allow editing related models on the same page as the parent model. `TabularInline` displays rows in a table format; `StackedInline` displays fields in a stacked layout. They require a `ForeignKey` relationship from the inline model to the parent. The `extra` option controls how many empty forms are shown.

**Q4: How do you create custom admin actions?**
**A:** Define a method on the ModelAdmin that takes `request` and `queryset` parameters. Use `@admin.action(description="...")` or set `actions.short_description`. The method can update queryset, call model methods, and send messages with `self.message_user()`. Register the action by adding it to the `actions` list attribute.

**Q5: How do you restrict admin access based on user permissions?**
**A:** Django admin respects the permission system (add, change, delete, view per model). `ModelAdmin` methods like `has_add_permission()`, `has_change_permission()`, `has_delete_permission()`, and `has_view_permission()` can be overridden to implement custom access logic based on `request.user`. Use `get_queryset()` to limit visible objects per user.

## ⚠ Common Errors / Mistakes
- **Forgetting to create a superuser**: The admin login page exists but no user can access it.
- **Not registering the model**: The model won't appear in admin regardless of ModelAdmin configuration.
- **Missing `__str__()` or using default object representation**: List display shows "Article object (1)" instead of meaningful text.
- **Using `list_editable` with fields that have `db_index=False`**: Can cause performance issues on large datasets.
- **Exposing sensitive fields**: Accidentally showing password hashes, API keys, or internal notes in list_display.
- **Not setting `list_per_page`**: Default page size of 100 can be slow for models with thousands of records.

## 📝 Practice Exercises

**Beginner (3):**
1. Create a superuser and log into the admin interface at `/admin/`. Register the `Book` model and add 3 books through the admin.
2. Add `list_display`, `list_filter`, and `search_fields` to the `Book` admin. Verify each works.
3. Change the admin site header using `admin.site.site_header = "My Book Library Admin"` and `admin.site.site_title = "Book Admin"`.

**Intermediate (3):**
1. Create a `Category` model with a `ForeignKey` to `Book` and add a `TabularInline` on the Book admin so editors can add categories inline.
2. Add a custom admin action "Mark as Out of Stock" that updates a `status` field on selected books. Show a success message with the count.
3. Create custom permissions using `Meta.permissions` on a model and restrict the admin list view so regular staff can only see their own objects (override `get_queryset()`).

**Advanced (2):**
1. Build a custom admin dashboard view that overrides the admin index template (`admin/index.html`) to show charts (using Chart.js or similar) of daily article submissions, user registrations, and popular content — all within the Django admin interface.
2. Implement a "soft delete" pattern in admin where clicking "Delete" marks objects as archived (using a `deleted_at` timestamp field) instead of actually deleting from database. Override `delete_queryset`, `delete_model`, and `get_queryset` to exclude soft-deleted items.
