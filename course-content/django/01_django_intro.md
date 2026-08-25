# 1. Django Introduction

## 📘 Introduction
Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers at the Lawrence Journal-World newspaper in 2003–2005 and released publicly under a BSD license in 2005, Django follows the "batteries-included" philosophy — providing almost everything developers need out of the box. Django is maintained by the Django Software Foundation.

## 🧠 Key Concepts
- **MTV Architecture**: Django follows Model-Template-View pattern. Model handles data & database, Template handles presentation layer, View handles business logic (comparable to MVC where Django's View acts like Controller and Template acts like View).
- **Batteries-Included**: Django ships with ORM, admin panel, authentication, forms, sessions, caching, security, middleware, signals, and more — no need for third-party libraries for core features.
- **DRY Principle**: Don't Repeat Yourself — Django encourages reusable apps, template inheritance, and code reuse.
- **Security**: Built-in protection against SQL injection, XSS, CSRF, clickjacking, and more.
- **ORM**: Object-Relational Mapper that allows database operations using Python code instead of raw SQL.
- **Admin Interface**: Automatically generated, customizable admin panel from model definitions.

## 💻 Syntax
```python
# Basic Django app structure
# models.py
from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
```

```bash
# Install Django
pip install django

# Create project
django-admin startproject mysite

# Run server
python manage.py runserver
```

## ✅ Example 1 - Basic: Understanding Django vs Simple Python Web Server

**Problem:** Compare a raw Python HTTP server with a minimal Django view.

**Code:**
```python
# Raw Python server (server.py)
from http.server import HTTPServer, BaseHTTPRequestHandler

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"Hello, World!")

server = HTTPServer(('localhost', 8000), Handler)
server.serve_forever()
```

```python
# Django equivalent (views.py)
from django.http import HttpResponse

def home(request):
    return HttpResponse("Hello, World!")
```

**Output/Description:** Both serve "Hello, World!" on HTTP GET. Django handles routing, middleware, headers, and security automatically — the raw server requires manual handling of everything.

**Explanation:** Django abstracts away low-level HTTP handling, allowing you to focus on logic. The `request` object carries metadata (method, headers, session, user) inaccessible in raw server without significant boilerplate.

## 🚀 Example 2 - Intermediate: MTV Architecture Walkthrough

**Problem:** Create a simple web page showing a list of books using Django's MTV pattern.

**Code:**
```python
# models.py — Model (Data layer)
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
```

```python
# views.py — View (Business logic layer)
from django.shortcuts import render
from .models import Book

def book_list(request):
    books = Book.objects.all()
    return render(request, 'books/list.html', {'books': books})
```

```html
<!-- templates/books/list.html — Template (Presentation layer) -->
<ul>
{% for book in books %}
    <li>{{ book.title }} by {{ book.author }}</li>
{% endfor %}
</ul>
```

```python
# urls.py — URL routing
from django.urls import path
from . import views

urlpatterns = [
    path('books/', views.book_list, name='book-list'),
]
```

**Output/Description:** Visiting `/books/` displays an HTML list of all books from the database. The data flows: Database → Model (Book) → View (book_list) → Template (list.html) → Browser.

**Explanation:** Each layer has a distinct responsibility. The Model defines data structure and database access. The View fetches data and prepares it for display. The Template renders HTML. Changing the template design does not affect model or view logic.

## 🏢 Real World Use Case
Instagram uses Django as its primary web framework, serving hundreds of millions of users. The platform's massive scale relies on Django's stability, security, and ability to handle high traffic. Other notable Django users include Pinterest (image sharing), Spotify (music streaming), YouTube (initially built with Django), Dropbox (file storage), Disqus (comments platform), Eventbrite (event management), and Mozilla (browser support site). Django's admin interface is widely used for internal dashboards, content management systems, and data entry applications across industries from healthcare to fintech.

## 🎯 Interview Questions

**Q1: What is the difference between Django's MTV architecture and the traditional MVC pattern?**
**A:** Django's MTV (Model-Template-View) is conceptually similar to MVC. The key difference is naming: Django's View handles business logic (which is the Controller's job in MVC), and Django's Template handles presentation (which is the View's job in MVC). Django's Model is equivalent to MVC's Model. In practice, Django's "View" acts as the controller by processing requests and returning responses.

**Q2: What does "batteries-included" mean in Django?**
**A:** It means Django ships with built-in components for common web development tasks — ORM, authentication, admin panel, forms, sessions, caching, CSRF protection, template engine, URL routing, middleware, signals, internationalization, and more. Developers rarely need to install external packages for core functionality.

**Q3: Name three major companies that use Django and explain why they chose it.**
**A:** Instagram (chose Django for its simplicity, scalability, and security; they scaled to millions of users with minimal changes), Pinterest (selected Django for its rapid development capabilities and excellent ORM), and Spotify (uses Django for backend services due to its reliability and extensive built-in features).

**Q4: How does Django's ORM help prevent SQL injection?**
**A:** Django's ORM automatically parameterizes queries, meaning user input is always escaped and separated from SQL statement structure. The ORM uses Python's database adapter parameterization (e.g., `WHERE title = %s`) instead of string concatenation, making SQL injection nearly impossible through standard ORM operations.

**Q5: What is the Django Software Foundation and why was Django open-sourced?**
**A:** The Django Software Foundation (DSF) is a non-profit organization that promotes, supports, and advances Django. Django was open-sourced because the creators (Adrian Holovaty and Simon Willison) believed the framework could benefit the broader web development community and that community contributions would improve it.

## ⚠ Common Errors / Mistakes
- **Confusing MTV with MVC**: Developers coming from other frameworks often try to force MVC patterns, not realizing Django's View is equivalent to MVC's Controller.
- **Trying to fight Django's conventions**: Django works best when following its "Django way" — fighting the framework with excessive customization leads to maintenance problems.
- **Installing too many packages**: The "batteries-included" philosophy means you should use Django's built-in components before reaching for third-party packages.
- **Ignoring security settings**: Django has strong defaults, but some developers disable CSRF middleware or turn off security features during development and forget to re-enable them.
- **Not using virtual environments**: Installing Django globally can cause version conflicts across projects.

## 📝 Practice Exercises

**Beginner (3):**
1. Install Django in a virtual environment and verify the installation by printing the Django version using `python -m django --version`.
2. Research and list five built-in features of Django that you wouldn't need to install separately.
3. Visit djangoproject.com and summarize Django's design philosophies in your own words.

**Intermediate (3):**
1. Write a small Python script that creates a simple HTTP server using only the standard library, then rewrite the same functionality using Django. Compare the code volume and complexity.
2. Create a diagram of Django's MTV architecture and explain the data flow for a request where a user visits `/books/1/` to see details of the first book.
3. Research how Instagram uses Django at scale (cite your sources) and write a summary of three key challenges they faced and solved.

**Advanced (2):**
1. Implement a minimal WSGI application from scratch using Python's `wsgiref` module, then demonstrate how Django's request/response cycle builds on WSGI by tracing `runserver` → `WSGIHandler` → `get_response()`.
2. Build a non-web application that uses Django's ORM standalone (without `runserver`) — configure `django.conf.settings` and import models to perform database operations outside the typical request/response cycle.
