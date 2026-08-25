# 11. Django Static & Media Files

## 📘 Introduction
Django provides a framework for managing static files (CSS, JavaScript, images) and media files (user-uploaded content). Static files are part of your application code. Media files are user-generated uploads. Django handles serving these files in development and provides management commands to collect them for production deployment.

## 🧠 Key Concepts
- **STATIC_URL**: URL prefix for static files (e.g., `/static/`).
- **STATICFILES_DIRS**: Directories where Django looks for static files (project-level static files).
- **STATIC_ROOT**: Absolute path where `collectstatic` copies all static files for production.
- **`collectstatic`**: Management command that copies static files from all apps and `STATICFILES_DIRS` to `STATIC_ROOT`.
- **`{% load static %}`**: Template tag for generating static file URLs.
- **MEDIA_URL**: URL prefix for user-uploaded media files (e.g., `/media/`).
- **MEDIA_ROOT**: Filesystem path to store uploaded files.
- **FileField/ImageField**: Model fields for file uploads. `upload_to` specifies the subdirectory path.
- **Development Serving**: Django serves static and media files automatically in development.

## 💻 Syntax
```python
# settings.py — Static and media configuration
import os

# Static files
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

```python
# models.py — File upload model
from django.db import models

class Document(models.Model):
    title = models.CharField(max_length=100)
    file = models.FileField(upload_to='documents/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/', blank=True)
```

```html
<!-- Template — Referencing static and media files -->
{% load static %}
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="{% static 'css/style.css' %}">
    <script src="{% static 'js/main.js' %}"></script>
</head>
<body>
    <img src="{% static 'images/logo.png' %}" alt="Logo">
    {% if user.profile.avatar %}
        <img src="{{ user.profile.avatar.url }}" alt="Avatar">
    {% endif %}
</body>
</html>
```

```python
# urls.py — Serving media files in development
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # ... your URL patterns
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

## ✅ Example 1 - Basic: Configuring Static Files for a Project

**Problem:** Set up static files directory and include a CSS file in templates.

**Code:**
```python
# settings.py
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]
```

```bash
# Create static directory structure
mkdir static\css
mkdir static\js
mkdir static\images
```

```css
/* static/css/style.css */
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
}
h1 {
    color: #333;
}
```

```html
<!-- templates/base.html -->
{% load static %}
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}My Site{% endblock %}</title>
    <link rel="stylesheet" href="{% static 'css/style.css' %}">
</head>
<body>
    <h1>{% block heading %}Welcome{% endblock %}</h1>
    {% block content %}{% endblock %}
</body>
</html>
```

**Output/Description:** The CSS is applied to all pages on the site. In development, Django serves the file at `/static/css/style.css`. The `{% static %}` tag generates the correct URL regardless of deployment environment.

**Explanation:** `STATICFILES_DIRS` tells Django where to find project-level static files (app-level static files are auto-discovered in `app/static/`). The `{% static %}` template tag generates the correct URL by prefixing `STATIC_URL`. In production, `collectstatic` copies all files to `STATIC_ROOT` where a web server (nginx, CDN) serves them directly.

## 🚀 Example 2 - Intermediate: Handling User File Uploads

**Problem:** Create a profile page with avatar upload functionality.

**Code:**
```python
# models.py
from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    website = models.URLField(blank=True)

    def __str__(self):
        return f"{self.user.username}'s profile"
```

```python
# forms.py
from django import forms
from .models import Profile

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['bio', 'avatar', 'website']
        widgets = {
            'bio': forms.Textarea(attrs={'rows': 4}),
        }
```

```python
# views.py
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import ProfileForm
from .models import Profile

@login_required
def edit_profile(request):
    profile, created = Profile.objects.get_or_create(user=request.user)
    if request.method == 'POST':
        form = ProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            return redirect('profile')
    else:
        form = ProfileForm(instance=profile)
    return render(request, 'edit_profile.html', {'form': form})
```

```python
# urls.py — Add media serving in development
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # ... your URL patterns
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

```html
<!-- templates/edit_profile.html -->
{% load static %}
<form method="post" enctype="multipart/form-data">
    {% csrf_token %}
    {{ form.as_p }}
    {% if form.instance.avatar %}
        <p>Current avatar:</p>
        <img src="{{ form.instance.avatar.url }}" alt="Current avatar" width="150">
    {% endif %}
    <button type="submit">Save Profile</button>
</form>
```

**Output/Description:** Users can upload profile images. The file is stored in `media/avatars/` with a unique filename (Django generates one automatically). The `avatar.url` attribute provides the full URL. In development, Django serves the uploaded file at `/media/avatars/filename.jpg`.

**Explanation:** `request.FILES` must be passed to forms handling file uploads. `enctype="multipart/form-data"` is required in the HTML form. `upload_to` accepts a directory path or a callable for dynamic paths. Django renames files to avoid conflicts. `ImageField` validates that the uploaded file is a valid image and provides `width` and `height` attributes.

## 🏢 Real World Use Case
A social media platform uses Django's media file system for user-generated content. Profile photos use `ImageField(upload_to='avatars/')`. Post images use `ImageField(upload_to='posts/%Y/%m/%d/')` for date-organized storage. A `collectstatic` deployment pipeline copies static assets to a CDN (like AWS S3 or CloudFront) using `django-storages`. Media files are stored on S3 directly. The static tag generates CDN URLs in production. Custom `upload_to` callables create user-ID-based directories for organization.

## 🎯 Interview Questions

**Q1: What is the difference between STATIC_URL, STATICFILES_DIRS, and STATIC_ROOT?**
**A:** `STATIC_URL` is the URL prefix for static files (e.g., `/static/`). `STATICFILES_DIRS` lists additional directories (outside app static dirs) to search for static files. `STATIC_ROOT` is the absolute filesystem path where `collectstatic` gathers all static files for production deployment.

**Q2: What does `collectstatic` do and when should you run it?**
**A:** `collectstatic` copies all static files from each app's `static/` directory and from `STATICFILES_DIRS` into `STATIC_ROOT`. Run it before deploying to production. The web server is then configured to serve files from `STATIC_ROOT` directly, bypassing Django for performance.

**Q3: How do you serve media files in development vs production?**
**A:** In development, add `urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)` to `urls.py`. In production, serve media files from a dedicated file server, CDN, or cloud storage (AWS S3, Google Cloud Storage) using `django-storages` — do NOT serve media files through Django in production.

**Q4: What is the `upload_to` parameter and how can you customize it?**
**A:** `upload_to` specifies the subdirectory within `MEDIA_ROOT` for storing uploaded files. It can be a string (static path), a `strftime` format (e.g., `'uploads/%Y/%m/%d/'`), or a callable that receives the instance and filename and returns a path. The callable is useful for per-user directories.

**Q5: How does Django handle filename conflicts when uploading files?**
**A:** Django's default storage backend appends a suffix to the filename to avoid conflicts. If `document.pdf` already exists, it becomes `document_1.pdf`, `document_2.pdf`, etc. Custom storage backends (like S3) may handle this differently.

## ⚠ Common Errors / Mistakes
- **Forgetting `enctype="multipart/form-data"` in forms with file fields**: File data doesn't upload; `request.FILES` is empty.
- **Not passing `request.FILES` to form**: Forms with FileField/ImageField silently fail if `request.FILES` is omitted.
- **Serving static/media files through Django in production**: Extremely slow and insecure — use nginx, CDN, or cloud storage.
- **Not running `collectstatic` before deployment**: Missing styles, scripts, and images in production.
- **Using absolute paths in `upload_to`**: `upload_to` is relative to `MEDIA_ROOT`. Using absolute paths causes errors or unexpected locations.

## 📝 Practice Exercises

**Beginner (3):**
1. Create a `static/` directory in your project root. Add a CSS file that styles the body background color. Use `{% load static %}` and `{% static %}` in your base template.
2. Add a JavaScript file that shows an alert on page load. Include it in the template using `{% static %}`.
3. Run `collectstatic` and verify all files are copied to `STATIC_ROOT`.

**Intermediate (3):**
1. Create a `Document` model with a `FileField` and file upload view. Restrict uploads to PDF files only using form validation.
2. Implement an avatar upload system where: (a) users upload their photo, (b) the image is automatically resized to 150x150 using `Pillow`, (c) old avatars are deleted when a new one is uploaded (override `save()`).
3. Configure Django to use AWS S3 for static and media files using `django-storages`. Store media files privately and generate temporary signed URLs for access.

**Advanced (2):**
1. Build an image gallery with drag-and-drop upload, automatic thumbnail generation (multiple sizes), EXIF data stripping for security, and lazy loading using Django + JavaScript. Use `upload_to` callables to organize images by user and date.
2. Implement a secure file server view that serves media files through Django with access control (users can only access their own files). Override the default file serving mechanism and use `X-Accel-Redirect` (nginx) or `X-Sendfile` (Apache) for efficient file delivery.
