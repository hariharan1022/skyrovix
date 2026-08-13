# 3. Django Project Setup

## 📘 Introduction
This module covers the critical distinction between Django projects and apps, how to create and register apps, the essential settings in `settings.py`, and security best practices around `SECRET_KEY`, `DEBUG`, and `ALLOWED_HOSTS`. Proper project setup is the foundation for a scalable, secure Django application.

## 🧠 Key Concepts
- **Project vs App**: A project is the entire website/application; an app is a self-contained module within a project that does one thing well (e.g., blog app, payments app, user profiles app).
- **INSTALLED_APPS**: A list of Django apps (built-in and third-party) that are enabled for this project. You must register your custom apps here.
- **DATABASES**: Configuration dictionary for database connections. Defaults to SQLite. Supports PostgreSQL, MySQL, Oracle.
- **MIDDLEWARE**: A sequence of hooks that process requests and responses globally.
- **TEMPLATES**: Configuration for template engines — directories, context processors, and backend settings.
- **SECRET_KEY**: A cryptographic key used for sessions, CSRF tokens, password reset tokens, and any cryptographic signing. Must be kept secret.
- **DEBUG Mode**: When `True`, shows detailed error pages with stack traces. Never use in production.
- **ALLOWED_HOSTS**: A list of domain/host names this Django site can serve. Required when `DEBUG=False`.

## 💻 Syntax
```bash
# Create a new app
python manage.py startapp blog
```

```python
# settings.py — Registering an app
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'blog',               # Your custom app
]
```

```python
# settings.py — Database configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

```python
# settings.py — Security settings
SECRET_KEY = 'django-insecure-...'   # Generate a new one per project
DEBUG = True                          # False in production
ALLOWED_HOSTS = ['127.0.0.1', '.example.com']
```

## ✅ Example 1 - Basic: Creating and Registering a Blog App

**Problem:** Create a `blog` app within a project called `myblog` and register it in `INSTALLED_APPS`.

**Code:**
```bash
cd myblog
python manage.py startapp blog
```

```
# Generated app structure:
blog/
├── migrations/
│   └── __init__.py
├── __init__.py
├── admin.py          # Register models for admin interface
├── apps.py           # App configuration class
├── models.py         # Define database models
├── tests.py          # Write tests
└── views.py          # Define view functions/classes
```

```python
# In settings.py, add the app to INSTALLED_APPS:
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'blog',             # <-- add this line
]
```

**Output/Description:** The `blog/` directory is created with standard app files. Adding `'blog'` to `INSTALLED_APPS` tells Django to include this app's models, migrations, admin configuration, and management commands.

**Explanation:** `startapp` creates the minimal file structure for a reusable app. The app is not active until added to `INSTALLED_APPS`. Django uses this list to discover models (for migrations), admin registrations, template directories, and static file directories.

## 🚀 Example 2 - Intermediate: Understanding settings.py in Depth

**Problem:** Analyze and configure multiple settings in `settings.py` for a project named `ecommerce`.

**Code:**
```python
# settings.py — Key sections explained

from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent
# BASE_DIR points to the project root directory
# e.g., C:/Users/.../ecommerce/

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'fallback-dev-key')
# NEVER hardcode secret key in production — use environment variables

DEBUG = os.environ.get('DEBUG', 'True') == 'True'
# Toggle via environment variable: set DEBUG=False for production

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '').split(',')
# CSV format: 'example.com,www.example.com'

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third-party apps
    'rest_framework',
    # Local apps
    'products',
    'cart',
    'orders',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'ecommerce'),
        'USER': os.environ.get('DB_USER', 'postgres'),
        'PASSWORD': os.environ.get('DB_PASSWORD', ''),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}
```

**Output/Description:** Settings are configured with environment variable fallbacks for security and portability. The database uses PostgreSQL in production but can fall back to values for local development.

**Explanation:** Using environment variables keeps secrets out of version control. Django reads `DATABASES['default']['ENGINE']` to determine which database backend to use. The `BASE_DIR` is used as a reference point for template directories, static files, and the default SQLite path.

## 🏢 Real World Use Case
A SaaS startup building a project management tool creates a Django project called `pm_tool` with multiple apps: `accounts` (user management), `projects` (project CRUD), `tasks` (task management), `payments` (subscriptions), and `api` (REST endpoints). Each app is independently developable and testable. The team uses PostgreSQL in production and SQLite locally by switching the DATABASES config via environment variables. `SECRET_KEY` is stored in the deployment platform's secrets manager. `DEBUG=False` and `ALLOWED_HOSTS=['pmtool.com', 'www.pmtool.com']` in production.

## 🎯 Interview Questions

**Q1: What is the difference between a Django project and a Django app?**
**A:** A project is the entire web application — the collection of configuration and apps. An app is a self-contained module that provides a specific functionality (e.g., blog, polls, comments). A project can contain multiple apps, and an app can be reused across multiple projects.

**Q2: Why is it important to keep SECRET_KEY secret?**
**A:** The SECRET_KEY is used for cryptographic signing — session cookies, CSRF tokens, password reset tokens, and any data signed with `django.core.signing`. If an attacker obtains the SECRET_KEY, they can forge session cookies, bypass CSRF protection, reset passwords, and decrypt signed data.

**Q3: What happens if DEBUG=True in production?**
**A:** Django displays detailed error pages with full tracebacks, environment variables, settings, and source code. This exposes sensitive information including database credentials, SECRET_KEY, API keys, and internal project structure — a severe security vulnerability.

**Q4: What is ALLOWED_HOSTS and why is Django strict about it?**
**A:** ALLOWED_HOSTS is a list of domain/host names the Django site is allowed to serve. When DEBUG=False, Django validates the HTTP Host header against this list. This prevents HTTP Host header attacks, where an attacker can send a request with a forged Host header to generate password reset emails or cache poisoning.

**Q5: Can you explain the order of INSTALLED_APPS and why it matters?**
**A:** The order matters because Django processes templates, static files, and management commands in order — earlier apps take precedence. Django apps (admin, auth) should come first. Third-party apps come next. Local apps come last. Some packages like `django.contrib.staticfiles` must be listed before apps that depend on it.

## ⚠ Common Errors / Mistakes
- **Committing SECRET_KEY to version control**: Always use environment variables or `.env` files with `.gitignore`.
- **Forgetting to add the app to INSTALLED_APPS**: The app's models won't be discovered, migrations won't be created, and templates/static files won't be found.
- **Running with DEBUG=True in production**: Exposes sensitive information through detailed error pages.
- **Empty ALLOWED_HOSTS when DEBUG=False**: Causes `SuspiciousOperation` errors: "Invalid HTTP_HOST header."
- **Mixing SQLite in production**: SQLite is file-locked and can't handle concurrent writes. Use PostgreSQL/MySQL for production.
- **Using the default SECRET_KEY from a tutorial or cookiecutter template**: Anyone using the same template has the same key.

## 📝 Practice Exercises

**Beginner (3):**
1. Create a Django project called `portfolio` and create an app called `projects` using `startapp`. Register `projects` in `INSTALLED_APPS`.
2. Change the database engine in `settings.py` from `sqlite3` to `postgresql` (you don't need to actually connect — just configure it). Then change it back.
3. Set `DEBUG=False` and add `'127.0.0.1'` to `ALLOWED_HOSTS`. Try to access the site and observe the error when visiting with a different host.

**Intermediate (3):**
1. Configure your project to use environment variables with `python-decouple` or `os.environ.get()` for `SECRET_KEY`, `DEBUG`, `DATABASE_NAME`, and `DATABASE_URL`.
2. Create three apps (`blog`, `shop`, `forum`) in one project. Register each and verify that `python manage.py showmigrations` lists all three after adding a model to each.
3. Research Django's app configuration (`apps.py`) and customize the `BlogConfig` class by setting `verbose_name = "My Blog"` and `default_auto_field`.

**Advanced (2):**
1. Write a custom management command (`python manage.py check_settings`) that reads `settings.py` and reports security issues (DEBUG=True, hardcoded SECRET_KEY, empty ALLOWED_HOSTS, SQLite in production).
2. Create a reusable "settings module" pattern where you have `settings/base.py`, `settings/dev.py`, and `settings/prod.py`. Configure these with `python-decouple` and implement a strategy for switching between them with the `DJANGO_SETTINGS_MODULE` environment variable.
