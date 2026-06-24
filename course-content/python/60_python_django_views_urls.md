## 60. Django Views & URLs
## 📘 Introduction
Views and URLs are the entry points of a Django web application. Views are Python functions (or classes) that receive HTTP requests and return HTTP responses. URL patterns map incoming URLs to specific views. Django's template engine allows dynamic HTML generation with context data, control flow, and template inheritance.

## 🧠 Key Concepts
- **Function-based views (FBVs)**: Simple Python functions that take a `request` and return a `response`
- **URL patterns**: Defined with `path()` and `re_path()` (regex) in `urls.py`
- **Template rendering**: `render(request, 'template.html', context)` merges context data into HTML
- **Template language**: `{{ variable }}` for output, `{% for %}`, `{% if %}`, `{% url %}` tags
- **Static files**: CSS, JS, images served via `static` template tag
- **URL parameters**: Captured from URL path and passed to view as arguments

## 💻 Syntax
```python
# views.py
from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    return HttpResponse("Hello, World!")

def greet(request, name):
    return HttpResponse(f"Hello, {name}!")

def about(request):
    context = {'company': 'Skyrovix', 'year': 2026}
    return render(request, 'about.html', context)
```

```python
# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('greet/<str:name>/', views.greet, name='greet'),
    path('about/', views.about, name='about'),
]
```

```html
<!-- templates/about.html -->
{% if year == 2026 %}
  <p>Welcome to {{ company }} — founded in {{ year }}</p>
{% endif %}
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Create a function-based view that renders a template with dynamic data using `render()` and context.

```python
# myapp/views.py
from django.shortcuts import render

def profile(request, username):
    context = {
        'username': username,
        'age': 30,
        'skills': ['Python', 'Django', 'SQL']
    }
    return render(request, 'profile.html', context)
```

```python
# myapp/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('profile/<str:username>/', views.profile, name='profile'),
]
```

```html
{# templates/profile.html #}
<!DOCTYPE html>
<html>
<head>
    <title>{{ username }}'s Profile</title>
</head>
<body>
    <h1>Profile: {{ username }}</h1>
    <p>Age: {{ age }}</p>
    <h3>Skills:</h3>
    <ul>
        {% for skill in skills %}
            <li>{{ skill }}</li>
        {% endfor %}
    </ul>
</body>
</html>
```

**Output (visiting `/profile/alice/`):**
```html
<!DOCTYPE html>
<html>
<head>
    <title>alice's Profile</title>
</head>
<body>
    <h1>Profile: alice</h1>
    <p>Age: 30</p>
    <h3>Skills:</h3>
    <ul>
        <li>Python</li>
        <li>Django</li>
        <li>SQL</li>
    </ul>
</body>
</html>
```

**Explanation:** The view receives `username` from the URL pattern (`<str:username>` captures a string from the URL path). `render()` merges the context dict into the template. Template tags `{{ }}` output variables, and `{% for %}` loops over the skills list. The URL is accessed as `/profile/alice/` — Django matches the `username` parameter from the URL.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Create a page listing products from the database using URL patterns with integer parameters and static files.

```python
# shop/views.py
from django.shortcuts import render
from .models import Product

def product_list(request):
    products = Product.objects.all()
    return render(request, 'shop/product_list.html', {'products': products})

def product_detail(request, product_id):
    product = Product.objects.get(id=product_id)
    return render(request, 'shop/product_detail.html', {'product': product})
```

```python
# shop/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.product_list, name='product-list'),
    path('<int:product_id>/', views.product_detail, name='product-detail'),
]
```

```python
# shop/project/urls.py — main URL conf
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('products/', include('shop.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
```

```html
{# templates/shop/product_list.html #}
{% load static %}
<!DOCTYPE html>
<html>
<head>
    <title>Product List</title>
    <link rel="stylesheet" href="{% static 'shop/style.css' %}">
</head>
<body>
    <h1>Our Products</h1>
    {% if products %}
        <ul>
        {% for product in products %}
            <li>
                <a href="{% url 'product-detail' product.id %}">
                    {{ product.name }} — ${{ product.price }}
                </a>
            </li>
        {% empty %}
            <li>No products available.</li>
        {% endfor %}
        </ul>
    {% else %}
        <p>No products found.</p>
    {% endif %}
</body>
</html>
```

```html
{# templates/shop/product_detail.html #}
{% load static %}
<!DOCTYPE html>
<html>
<head>
    <title>{{ product.name }}</title>
    <link rel="stylesheet" href="{% static 'shop/style.css' %}">
</head>
<body>
    <h1>{{ product.name }}</h1>
    <p>Price: ${{ product.price }}</p>
    <p>Category: {{ product.category }}</p>
    <a href="{% url 'product-list' %}">Back to list</a>
</body>
</html>
```

**Output (visiting `/products/`):**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Product List</title>
    <link rel="stylesheet" href="/static/shop/style.css">
</head>
<body>
    <h1>Our Products</h1>
    <ul>
        <li><a href="/products/1/">Laptop — $999.99</a></li>
        <li><a href="/products/2/">Phone — $699.99</a></li>
        <li><a href="/products/3/">Headphones — $149.99</a></li>
    </ul>
</body>
</html>
```

**Explanation:** `{% url 'product-detail' product.id %}` generates URLs dynamically, avoiding hardcoded paths. `<int:product_id>` captures an integer from the URL and passes it to the view. `{% empty %}` handles empty QuerySets. Static files are served with `{% static %}` during development. The `{% if %}` / `{% else %}` template tags conditionally render content.

## 🏢 Real World Use Case
An e-commerce platform uses Django views and URLs to power thousands of product pages. URL patterns like `/category/<slug:category_slug>/<slug:product_slug>/` create SEO-friendly URLs. Class-based views (ListView, DetailView) reduce boilerplate. Template inheritance provides a consistent layout across all pages. Static files (CSS, JS, images) are compressed and served via CDN in production. This architecture supports millions of page views per day.

## 🎯 Interview Questions (5 with answers)

**1. What is the difference between `path()` and `re_path()`?**
`path()` uses simple route patterns with angle brackets for parameters (`<int:id>`). `re_path()` uses regular expressions for complex URL matching.

**2. What does `render()` do?**
It combines a template with a context dictionary and returns an HttpResponse object with the rendered HTML. It's a shortcut for `loader.get_template()` + `template.render()`.

**3. How do you pass URL parameters to a Django view?**
Define them in the URL pattern using angle brackets: `path('article/<int:year>/<slug:slug>/', views.article_detail)`. The view receives them as function parameters matching the names.

**4. What is the `{% url %}` template tag used for?**
It generates absolute URL paths from a URL pattern name and optional arguments: `{% url 'profile' username='alice' %}` → `/profile/alice/`.

**5. How do you serve static files in Django during development?**
Set `STATIC_URL = '/static/'` in settings.py, create a `static/` directory in each app, and use `{% load static %}` + `{% static 'app/style.css' %}` in templates. Also add the static URL pattern in the project's `urls.py` for development.

## ⚠ Common Errors / Mistakes
- **Missing `{% load static %}`**: Forgetting this at the top of a template causes `static` tag to be unrecognized.
- **No trailing slash**: Django expects URLs to end with `/`. A request to `/products` without slash may redirect or raise 404 depending on `APPEND_SLASH` setting.
- **Name collisions in URL names**: Use namespacing (`app_name = 'shop'` in app `urls.py`) and reference with `{% url 'shop:product-list' %}`.
- **Template not found**: Templates should be in `app/templates/app/template.html` or in a project-level `TEMPLATES.DIRS` directory.
- **Syntax errors in template tags**: `{% if %}` must be closed with `{% endif %}`; `{% for %}` with `{% endfor %}`.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)

**Beginner:**
1. Create a view `hello` that takes a `name` parameter from the URL and returns "Hello, {name}!" as plain text.
2. Create a view `current_time` that renders a template showing the current date and time (use `datetime.now()` in context).
3. Create a URL pattern with `re_path` to match URLs like `/article/2024/` (4-digit year) and pass the year to a view.

**Intermediate:**
4. Create a `Book` model and a view `book_list` that renders all books in an HTML table. Add a link on each row to a `book_detail` view showing full details.
5. Use `{% if %}` and `{% for %}` in a template to display a list of students, highlighting (with a CSS class) those with a grade above 80.
6. Add a static CSS file to an app that styles a product listing page. Include it with `{% static %}` in the template.

**Advanced:**
7. Build a blog with three URL patterns: `/blog/` (post list), `/blog/<int:year>/<int:month>/` (archive by date), `/blog/<slug:slug>/` (post detail). Each uses a function-based view. Use `{% url %}` with named arguments for navigation between pages.
8. Implement a search view that reads a `q` query parameter from the URL (`/search/?q=django`), filters a model, and renders results. Use `request.GET` to extract the parameter. Handle the case where `q` is empty gracefully.
