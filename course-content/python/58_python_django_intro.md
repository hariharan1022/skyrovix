## 58. Django Tutorial
## 📘 Introduction
Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It follows the "batteries-included" philosophy, providing an ORM, admin interface, authentication, URL routing, template engine, and more out of the box. Django is built on the MTV (Model-Template-View) architecture, a variation of MVC.

## 🧠 Key Concepts
- **MTV Architecture**: Model (data), Template (presentation), View (business logic)
- **Project vs App**: A project is a website; apps are reusable modules within a project
- **manage.py**: Command-line utility for administrative tasks (runserver, startapp, migrate)
- **settings.py**: Configuration file — databases, installed apps, middleware, static files
- **urls.py**: URL dispatcher — maps URLs to views
- **views.py**: Request handlers — Python functions/classes that return HTTP responses
- **models.py**: Database schema definition (Python classes mapped to tables)
- **Django Admin**: Auto-generated admin interface for managing models

## 💻 Syntax
```bash
# Create project and app
django-admin startproject mysite
cd mysite
python manage.py startapp myapp
python manage.py runserver
python manage.py migrate
```

```python
# settings.py — add app
INSTALLED_APPS = [
    ...
    'myapp',
]

# views.py
from django.http import HttpResponse
def home(request):
    return HttpResponse("Hello, Django!")

# urls.py (project)
from django.urls import path, include
urlpatterns = [
    path('', include('myapp.urls')),
]

# urls.py (app)
from django.urls import path
from . import views
urlpatterns = [
    path('', views.home, name='home'),
]
```

## ✅ Example 1 - Basic (Problem, Code, Output, Explanation)

**Problem:** Create a new Django project, define a simple view, and wire it to a URL.

```bash
# Terminal commands:
django-admin startproject myfirstproject
cd myfirstproject
python manage.py startapp pages
```

```python
# pages/views.py
from django.http import HttpResponse

def index(request):
    return HttpResponse("<h1>Welcome to Django!</h1>")
```

```python
# pages/urls.py (create this file)
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```

```python
# myfirstproject/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('pages.urls')),
]
```

```python
# myfirstproject/settings.py — add to INSTALLED_APPS
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'pages',  # <-- add this
]
```

**Output (when visiting http://127.0.0.1:8000/):**
```
Welcome to Django!
```

**Explanation:** `startproject` creates the project skeleton. `startapp` creates a reusable app. The view function `index()` returns an HttpResponse with HTML. URLs are mapped in two `urls.py` files: the project-level one includes the app's URLs, and the app-level one routes the root path to the view. The app must be registered in `INSTALLED_APPS` in `settings.py`.

## 🚀 Example 2 - Intermediate (Problem, Code, Output, Explanation)

**Problem:** Explore the project structure and understand how the components connect.

```bash
# Show project directory tree
python manage.py --help
```

**Project structure:**
```
myfirstproject/
├── manage.py                 # Command-line utility
├── myfirstproject/           # Project configuration package
│   ├── __init__.py
│   ├── asgi.py               # ASGI config (async)
│   ├── settings.py           # Settings: DB, apps, middleware, templates
│   ├── urls.py               # URL configuration
│   └── wsgi.py               # WSGI config (deployment)
├── pages/                    # App package
│   ├── __init__.py
│   ├── admin.py              # Model admin registration
│   ├── apps.py               # App configuration
│   ├── migrations/           # Database migrations
│   │   └── __init__.py
│   ├── models.py             # Data models
│   ├── tests.py              # Tests
│   ├── urls.py               # App URL configuration
│   └── views.py              # View functions/classes
└── db.sqlite3                # Default SQLite database (after migrate)
```

**Key files explained:**
- **manage.py**: The thin wrapper around `django-admin`. Used for `runserver`, `migrate`, `shell`, `createsuperuser`, etc.
- **settings.py**: Central configuration — `DATABASES`, `INSTALLED_APPS`, `MIDDLEWARE`, `TEMPLATES`, `STATIC_URL`, `SECRET_KEY`.
- **urls.py**: URL patterns dispatch incoming requests to the appropriate view.
- **views.py**: Contains logic that processes requests and returns responses.
- **models.py**: Defines the database schema as Python classes.
- **admin.py**: Registers models with the Django admin interface.

**Output (from `python manage.py runserver`):**
```
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 18 unapplied migration(s). Your project may not work properly until they are applied.
Run 'python manage.py migrate' to apply them.

June 23, 2026 - 14:30:00
Django version 5.0, using settings 'myfirstproject.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

**Explanation:** The project structure separates configuration (inner `myfirstproject/`) from application code (`pages/`). `manage.py` is the entry point. Each app is a self-contained module. Django's admin interface is enabled by default at `/admin/`. The migration warning reminds you to run `migrate` to create the database tables for built-in apps (auth, admin, etc.).

## 🏢 Real World Use Case
A startup builds a SaaS platform using Django. The `settings.py` configures PostgreSQL (production), adds 15+ custom apps (accounts, billing, analytics, etc.), and sets up middleware for authentication, CORS, and security. The project's main `urls.py` includes app URLs with namespacing. The team uses `manage.py` to migrate schemas, collect static files, and run the development server. Django's structure enforces consistency as the codebase scales to 100+ models.

## 🎯 Interview Questions (5 with answers)

**1. What is the difference between a Django project and a Django app?**
A project is the entire website (configuration + collection of apps). An app is a self-contained module that does one thing (e.g., blog, polls, accounts). A project can contain many apps; an app can be reused across projects.

**2. What is the MTV architecture in Django?**
Model (data layer — database schema), Template (presentation layer — HTML), View (business logic — processes requests, queries models, renders templates).

**3. What is `manage.py` used for?**
It's a command-line tool for project management: `runserver`, `startapp`, `migrate`, `makemigrations`, `createsuperuser`, `shell`, `collectstatic`, `test`, and more.

**4. What does `INSTALLED_APPS` in settings.py do?**
It lists all Django applications that are activated for this project. Django uses this to discover models, templates, static files, management commands, and migration files.

**5. How do you create a superuser for the Django admin?**
Run `python manage.py createsuperuser` and provide username, email, and password.

## ⚠ Common Errors / Mistakes
- **Forgetting to add app to INSTALLED_APPS**: The app won't work — Django won't find its models, templates, or migrations.
- **Running `runserver` without `migrate` first**: The first run will warn about unapplied migrations. Always run `python manage.py migrate` before starting development.
- **Editing files outside the project structure**: Don't move `manage.py` or rename the inner project folder without adjusting import paths.
- **Committing SECRET_KEY to version control**: The default `SECRET_KEY` in settings.py should be replaced with an environment variable in production.

## 📝 Practice Exercises (3 beginner, 3 intermediate, 2 advanced - NO answers)

**Beginner:**
1. Create a Django project called `myblog` and a app called `posts`. Register the app in `INSTALLED_APPS`.
2. Create a view in the `posts` app that returns "Hello, Blog!" as an HttpResponse. Wire it to the URL path `/hello/`.
3. Run the development server and verify the page loads at `http://127.0.0.1:8000/hello/`.

**Intermediate:**
4. Create a second app called `about`. Add a view that returns an HTML page with an `<h1>` heading. Map it to the URL `/about/` in the project's main `urls.py`.
5. Create a view that takes an integer parameter from the URL (`/user/<int:id>/`) and returns "User ID: {id}" in the response.
6. Explore the Django admin by running `migrate`, `createsuperuser`, then logging into `/admin/`. Observe the default auth models (Users, Groups).

**Advanced:**
7. Set up a Django project with two apps: `shop` and `blog`. Each app should have its own `urls.py` included from the project's main `urls.py` with different prefixes (`/shop/` and `/blog/`). Each app should have at least 2 views.
8. Modify `settings.py` to use a custom `SECRET_KEY` from an environment variable (using `os.environ.get()`), with a fallback for development. Add comments explaining each setting group in `settings.py`.
