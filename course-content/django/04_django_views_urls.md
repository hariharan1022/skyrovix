# 4. Django Views & URLs

## 📘 Introduction
Views and URL configuration are the core of Django's request handling. When a browser sends a request, Django matches the URL pattern, calls the associated view function, and returns an HTTP response. This module covers function-based views, URL patterns, parameter capturing, URL namespacing, and reverse URL resolution.

## 🧠 Key Concepts
- **Function-Based View (FBV)**: A Python function that takes an `HttpRequest` object and returns an `HttpResponse` object. The simplest way to handle requests.
- **URL Patterns**: Defined in `urlpatterns` list using `path()` for simple routes and `re_path()` for regex-based routes.
- **URL Parameters**: Captured from the URL using angle brackets `<type:name>` — supports `str`, `int`, `slug`, `uuid`, `path` converters.
- **`include()`**: Incorporates URL patterns from other app's `urls.py` files, enabling modular URL configuration.
- **`reverse()`**: Generates URLs from their name and parameters, avoiding hardcoded URLs in views and templates.
- **Named URL Groups**: Assign a `name` argument to each `path()` or `re_path()` for reference.

## 💻 Syntax
```python
# views.py — Basic function-based view
from django.http import HttpResponse

def home(request):
    return HttpResponse("<h1>Welcome to Django!</h1>")
```

```python
# urls.py — Mapping URLs to views
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('blog/', include('blog.urls')),   # Include app URLs
]
```

```python
# views.py — View with URL parameters
from django.http import HttpResponse

def article_detail(request, year, slug):
    return HttpResponse(f"Article from {year}: {slug}")
```

```python
# urls.py — Parameterized URL
urlpatterns = [
    path('articles/<int:year>/<slug:slug>/', views.article_detail, name='article-detail'),
]
```

```python
# Using reverse() to generate URLs
from django.urls import reverse

url = reverse('article-detail', args=[2026, 'hello-world'])
# Result: '/articles/2026/hello-world/'
```

## ✅ Example 1 - Basic: Creating Home and About Pages

**Problem:** Create two simple views (home and about) and wire them to URLs.

**Code:**
```python
# views.py
from django.http import HttpResponse

def home(request):
    return HttpResponse("""
        <h1>Home Page</h1>
        <p>Welcome to our website!</p>
        <a href='/about/'>About Us</a>
    """)

def about(request):
    return HttpResponse("""
        <h1>About Us</h1>
        <p>We are learning Django!</p>
        <a href='/'>Back to Home</a>
    """)
```

```python
# urls.py (project-level)
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
]
```

**Output/Description:** Visiting `http://127.0.0.1:8000/` shows the home page with a link to `/about/`. Clicking the link navigates to the about page with a link back. Each view returns a simple HTML string wrapped in an `HttpResponse`.

**Explanation:** Each URL pattern maps a URL path to a view function. The view receives an `HttpRequest` object and must return an `HttpResponse`. The `name` parameter allows templates and views to reference the URL by name instead of hardcoding the path.

## 🚀 Example 2 - Intermediate: URL Parameters and Reverse Resolution

**Problem:** Create a blog detail view that accepts a year and slug parameter, and use `reverse()` to generate the URL.

**Code:**
```python
# blog/views.py
from django.http import HttpResponse
from django.urls import reverse

def blog_list(request):
    articles = [
        {'year': 2026, 'slug': 'django-intro', 'title': 'Django Introduction'},
        {'year': 2026, 'slug': 'python-tips', 'title': 'Python Tips & Tricks'},
    ]
    links = []
    for article in articles:
        url = reverse('blog:detail', args=[article['year'], article['slug']])
        links.append(f'<li><a href="{url}">{article["title"]}</a></li>')
    return HttpResponse(f"<h1>Blog</h1><ul>{''.join(links)}</ul>")

def blog_detail(request, year, slug):
    return HttpResponse(f"<h1>Article</h1><p>Year: {year}</p><p>Slug: {slug}</p>")
```

```python
# blog/urls.py
from django.urls import path
from . import views

app_name = 'blog'   # Namespace for this app's URLs

urlpatterns = [
    path('', views.blog_list, name='list'),
    path('<int:year>/<slug:slug>/', views.blog_detail, name='detail'),
]
```

```python
# project urls.py
from django.urls import path, include

urlpatterns = [
    path('blog/', include('blog.urls')),
]
```

**Output/Description:** Visiting `/blog/` displays a list of article links. Each link leads to `/blog/2026/django-intro/` or similar. The `reverse()` function generates these URLs dynamically, so if the URL pattern changes, all links update automatically.

**Explanation:** `app_name` creates a URL namespace (`blog:detail`). The `<int:year>` converter captures an integer; `<slug:slug>` captures a slug string (letters, numbers, hyphens, underscores). `reverse()` takes the URL name and positional or keyword arguments matching the URL pattern converters.

## 🏢 Real World Use Case
An e-commerce platform uses parameterized URLs for product pages: `/products/<slug:category_slug>/<slug:product_slug>/`. The `include()` function organizes URLs across apps — `accounts/`, `products/`, `cart/`, `orders/` — each with their own `urls.py`. Named URL patterns allow templates throughout the site to generate links with `{% url 'cart:add' product.id %}`, ensuring consistent URLs even when the URL structure changes.

## 🎯 Interview Questions

**Q1: What is the difference between `path()` and `re_path()`?**
**A:** `path()` uses Django's built-in path converters (`str`, `int`, `slug`, `uuid`, `path`) for simple, readable URL patterns. `re_path()` uses regular expressions for complex patterns that path converters cannot handle. Django recommends `path()` whenever possible.

**Q2: How does URL resolution work when Django receives a request?**
**A:** Django starts with the `ROOT_URLCONF` setting, iterates through `urlpatterns` in order, and stops at the first matching pattern. If `include()` is used, Django truncates the matched portion of the URL and passes the remaining string to the included `urlpatterns`. If no pattern matches, Django returns a 404 error.

**Q3: What is the purpose of `app_name` in `urls.py`?**
**A:** `app_name` creates a URL namespace for the app, allowing multiple apps to have URL patterns with the same name (e.g., `blog:index` and `forum:index`). It enables unambiguous URL resolution with `{% url 'blog:index' %}` or `reverse('blog:index')`.

**Q4: What happens if two URL patterns match the same path?**
**A:** Django uses the first matching pattern from top to bottom in the `urlpatterns` list. Only the first match is used; subsequent matching patterns are ignored. This means you should order more specific patterns before less specific ones.

**Q5: How do URL converters work, and can you create a custom one?**
**A:** URL converters use `register_converter()` to define custom parameter matching. Built-in converters (`str`, `int`, `slug`, `uuid`, `path`) each have a `regex` attribute that validates the URL segment and a `to_python()` method that converts the string to the Python type. You can create custom converters by implementing `regex`, `to_python()`, and `to_url()`.

## ⚠ Common Errors / Mistakes
- **Forgetting the trailing slash**: Django's `APPEND_SLASH` setting (default True) redirects `/blog` to `/blog/`. Inconsistent use causes unexpected redirects.
- **Hardcoding URLs in templates**: Using `/blog/2026/hello/` instead of `{% url 'blog:detail' year=2026 slug='hello' %}` breaks when URLs change.
- **Wrong order of URL patterns**: Putting a catch-all pattern (`<slug:slug>/`) before specific patterns (`about/`) makes the specific pattern unreachable.
- **Mismatched `app_name` and `include()` namespacing**: Missing `app_name` causes `NoReverseMatch` errors on namespaced URL lookups.
- **Forgetting to return an HttpResponse**: Every view must return an `HttpResponse` object. Missing it triggers "The view didn't return an HttpResponse object."

## 📝 Practice Exercises

**Beginner (3):**
1. Create three views: `home`, `contact`, and `services`. Wire them to URLs `/`, `/contact/`, and `/services/`. Each should return a simple HTML page.
2. Add a greeting view that accepts a name parameter: `/greet/<str:name>/`. Display "Hello, [name]!" on the page.
3. Create a calculator view that accepts two integers: `/add/<int:a>/<int:b>/`. Return the sum as HTML.

**Intermediate (3):**
1. Create a blog app with URL namespace `blog`. Add views for listing posts (`/blog/`), viewing a single post (`/blog/<int:pk>/`), and viewing posts by category (`/blog/category/<slug:category>/`). Use `reverse()` in views.
2. Implement a URL pattern using `re_path()` to match dates in `YYYY/MM/DD/` format and extract year, month, day as integers. Create a view that displays the parsed date.
3. Create a custom path converter called `FourDigitYear` that only matches 4-digit years 1900-2099. Register it and use it in a URL pattern.

**Advanced (2):**
1. Build a URL router system that uses `include()` with multiple nested URL namespaces: `shop/` → includes `products/` URLs, `products/` → includes `reviews/` URLs. Implement views at each level and resolve URLs across namespaces.
2. Implement a URL-based content negotiation system where the same view serves HTML, JSON, and XML based on the URL suffix (`.html`, `.json`, `.xml`). Use different URL patterns pointing to the same view with different format parameters.
