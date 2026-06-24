# 5. Django Templates

## 📘 Introduction
Django's template system allows you to separate presentation logic from business logic. Templates are text files (usually HTML) that contain placeholders and logic tags for dynamic content. The Django Template Language (DTL) is a sandboxed, Python-like language designed for non-programmers to create readable templates with inheritance, filters, and tags.

## 🧠 Key Concepts
- **Template Directory**: By default, Django looks for a `templates/` directory inside each app. You can also specify global template directories in `settings.py`.
- **`render()` function**: Shorthand that loads a template, fills it with context, and returns an `HttpResponse`.
- **Context**: A dictionary of data passed from the view to the template for rendering.
- **DTL Variables**: `{{ variable }}` — outputs the value. Supports attribute access and list indexing.
- **DTL Tags**: `{% tag %}` — provides logic like loops, conditionals, and inheritance.
- **DTL Comments**: `{# comment #}` — not rendered in output.
- **Template Filters**: `{{ var|filter }}` — transforms variable values (date formatting, string manipulation, etc.).
- **Template Inheritance**: `{% extends "base.html" %}` with `{% block %}` tags creates a child-parent template structure.
- **`{% include %}`**: Embeds another template within the current template.

## 💻 Syntax
```python
# views.py — Using render()
from django.shortcuts import render

def home(request):
    context = {
        'title': 'Home Page',
        'items': ['Apple', 'Banana', 'Cherry'],
    }
    return render(request, 'home.html', context)
```

```html
<!-- templates/home.html — Template with DTL -->
<!DOCTYPE html>
<html>
<head>
    <title>{{ title }}</title>
</head>
<body>
    <h1>{{ title }}</h1>
    <ul>
    {% for item in items %}
        <li>{{ item|upper }} ({{ item|length }} letters)</li>
    {% empty %}
        <li>No items found</li>
    {% endfor %}
    </ul>
    {# This comment won't appear in HTML #}
</body>
</html>
```

```html
<!-- templates/base.html — Base template for inheritance -->
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}My Site{% endblock %}</title>
</head>
<body>
    <header>{% include 'header.html' %}</header>
    <main>{% block content %}{% endblock %}</main>
    <footer>{% include 'footer.html' %}</footer>
</body>
</html>
```

```html
<!-- templates/about.html — Child template -->
{% extends 'base.html' %}

{% block title %}About Us{% endblock %}

{% block content %}
    <h1>About Our Company</h1>
    <p>We started in {{ founded_year }}...</p>
{% endblock %}
```

## ✅ Example 1 - Basic: Creating a Dynamic Profile Page

**Problem:** Display a user profile page with name, bio, and a list of skills using template context and DTL.

**Code:**
```python
# views.py
from django.shortcuts import render

def profile(request):
    user_data = {
        'name': 'Alice Johnson',
        'bio': 'Full-stack developer and Django enthusiast.',
        'skills': ['Python', 'Django', 'JavaScript', 'PostgreSQL'],
        'join_date': '2026-01-15',
    }
    return render(request, 'profile.html', user_data)
```

```html
<!-- templates/profile.html -->
<h1>{{ name }}</h1>
<p class="bio">{{ bio }}</p>
<p>Joined: {{ join_date|date:"F j, Y" }}</p>

<h2>Skills</h2>
<ul>
{% for skill in skills %}
    <li>{{ skill }}</li>
{% endfor %}
</ul>
```

**Output/Description:** The page renders "Alice Johnson" as heading, her bio, formatted join date ("January 15, 2026"), and a bulleted skill list. The `date` filter transforms the raw date string.

**Explanation:** The view passes a dictionary as context. Template variables (`{{ name }}`) are replaced with dictionary values. The `{% for %}` tag iterates over the skills list. The `date` filter formats the date string into a readable format. Filters are chainable: `{{ skill|upper|slice:":5" }}`.

## 🚀 Example 2 - Intermediate: Template Inheritance with Blocks

**Problem:** Create a consistent layout across multiple pages using template inheritance with a base template, reusable includes, and multiple block sections.

**Code:**
```html
<!-- templates/base.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{% block title %}My Blog{% endblock %}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav>
        <a href="/">Home</a> |
        <a href="/blog/">Blog</a> |
        <a href="/contact/">Contact</a>
    </nav>

    <main>
        {% block content %}
        <p>Default content if not overridden</p>
        {% endblock %}
    </main>

    <aside>
        {% block sidebar %}
        {% include 'sidebar_links.html' %}
        {% endblock %}
    </aside>

    <footer>
        {% block footer %}
        <p>&copy; 2026 My Blog</p>
        {% endblock %}
    </footer>
</body>
</html>
```

```html
<!-- templates/blog/post_list.html -->
{% extends 'base.html' %}

{% block title %}Blog Posts{% endblock %}

{% block content %}
    <h1>Latest Posts</h1>
    {% for post in posts %}
        <article>
            <h2>{{ post.title }}</h2>
            <p>{{ post.content|truncatechars:200 }}</p>
            <small>{{ post.created_at|date:"M d, Y" }}</small>
        </article>
    {% empty %}
        <p>No posts yet.</p>
    {% endfor %}
{% endblock %}
```

```python
# views.py
from django.shortcuts import render

def post_list(request):
    posts = [
        {'title': 'Django Templates', 'content': 'Templates are powerful...', 'created_at': '2026-06-20'},
        {'title': 'Python Tips', 'content': 'Here are some useful Python tips that will...', 'created_at': '2026-06-18'},
    ]
    return render(request, 'blog/post_list.html', {'posts': posts})
```

**Output/Description:** The page inherits the nav, footer, and sidebar from `base.html` but overrides the title and content blocks. The `truncatechars` filter shortens content to 200 characters. The `date` filter formats the date.

**Explanation:** `{% extends %}` must be the first tag in the child template. `{% block %}` tags in the child replace matching blocks in the parent. `{{ block.super }}` includes the parent block's content. The `{% include %}` tag renders a separate template file inline.

## 🏢 Real World Use Case
A news website uses template inheritance extensively: `base.html` provides the overall layout (header, footer, analytics scripts, navigation). Section templates (`sports.html`, `politics.html`, `tech.html`) extend `section_base.html` which extends `base.html`. Article pages extend `article_base.html`. The `{% include %}` tag is used for reusable components (article cards, author bios, ad placements, sidebar widgets). Template filters format dates consistently and pluralize comment counts.

## 🎯 Interview Questions

**Q1: What is the difference between `{% url %}` and `reverse()` in Django?**
**A:** `{% url %}` is a template tag that generates URLs from named URL patterns inside templates (e.g., `{% url 'blog:detail' pk=post.pk %}`). `reverse()` is the Python equivalent used in views and Python code. Both perform the same URL resolution — `{% url %}` calls `reverse()` internally.

**Q2: How does Django's template system prevent XSS attacks?**
**A:** Django's template engine auto-escalls HTML special characters (`<`, `>`, `&`, `"`, `'`) in all variable output unless the variable is marked with the `safe` filter or `{% autoescape off %}` block. This prevents malicious HTML/JavaScript injection. For trusted HTML, use `{{ content|safe }}` or the `mark_safe()` utility in Python.

**Q3: What is template inheritance and why is it useful?**
**A:** Template inheritance allows you to define a base "skeleton" template with common elements (navigation, header, footer) and use `{% block %}` tags for content sections that child templates can override. It eliminates duplication, ensures consistent layout, and makes site-wide changes (like adding a nav item) trivial — just edit the base template.

**Q4: How do you add custom template filters or tags?**
**A:** Create a `templatetags/` directory inside an app with an `__init__.py` file and a module file. Register filters with `@register.filter` decorator, and tags with `@register.simple_tag` or `@register.inclusion_tag`. Load them in templates with `{% load module_name %}`.

**Q5: What does the `{{ block.super }}` do in Django templates?**
**A:** `{{ block.super }}` includes the parent block's content within a child's `{% block %}`, allowing you to append to the parent's content rather than completely overriding it. For example, adding extra CSS links to a parent's `<head>` block while keeping existing ones.

## ⚠ Common Errors / Mistakes
- **Using Python syntax in templates**: DTL uses `{% endif %}` not `{% end if %}`, `{% empty %}` not `{% else %}`, and `.` not `[]` for accessing list items.
- **Forgetting to `{% load %}` custom tags**: Custom template tags and filters require `{% load %}` at the top of the template.
- **Missing context keys**: Accessing a missing context variable silently outputs nothing (empty string) rather than raising an error — leading to confusing blank spots.
- **`{% extends %}` not at the top**: The `{% extends %}` tag must be the very first tag in the template, before any whitespace or other content.
- **Hardcoding static URLs**: Use `{% load static %}` and `{% static 'css/style.css' %}` instead of hardcoding `/static/css/style.css`.

## 📝 Practice Exercises

**Beginner (3):**
1. Create a template that displays a user's profile with `{{ name }}`, `{{ email }}`, and `{{ bio }}`. Pass the data from a view using a context dictionary.
2. Use the `{% for %}` tag to iterate over a list of fruits and display each in an unordered list. Use `{% empty %}` to show a message when the list is empty.
3. Apply three different filters: `{{ text|upper }}`, `{{ text|truncatechars:10 }}`, and `{{ number|default:"N/A" }}`.

**Intermediate (3):**
1. Create a base template `base.html` with `{% block title %}`, `{% block content %}`, and `{% block extra_js %}`. Create two child pages (home and contact) that extend it and override different blocks.
2. Build a navigation bar using `{% include 'nav.html' %}` and pass context variables to the included template. Highlight the current page using a variable from the view.
3. Create a custom template filter `{{ value|currency }}` that formats a number as currency with commas and a dollar sign (e.g., `1234567` → `$1,234,567`).

**Advanced (2):**
1. Implement a template tag system with `{% breadcrumbs %}` that automatically generates breadcrumb navigation based on the current URL path, splitting by `/` and capitalizing each segment.
2. Build a pagination template component using template tags that receives the current page number, total pages, and generates paginated navigation links (previous, next, first, last, and numbered pages with an ellipsis for gaps).
