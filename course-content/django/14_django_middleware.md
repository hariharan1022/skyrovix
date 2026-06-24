# 14. Django Middleware

## 📘 Introduction
Middleware is a framework of hooks into Django's request/response processing. It's a lightweight, low-level plugin system that globally modifies Django's input or output. Each middleware component is responsible for processing requests before they reach the view and/or processing responses after the view returns. Middleware is configured in `settings.py`'s `MIDDLEWARE` list.

## 🧠 Key Concepts
- **Middleware Chain**: Each request passes through every middleware class in order (top to bottom). Responses pass through in reverse order (bottom to top).
- **Built-in Middleware**: Django ships with `SecurityMiddleware`, `SessionMiddleware`, `CommonMiddleware`, `CsrfViewMiddleware`, `AuthenticationMiddleware`, `MessageMiddleware`, `XFrameOptionsMiddleware`, and more.
- **Custom Middleware**: A class with `__init__(self, get_response)` and `__call__(self, request)`. Optionally `process_view(self, request, view_func, view_args, view_kwargs)`, `process_exception(self, request, exception)`, and `process_template_response(self, request, response)`.
- **Middleware Order**: The order in `MIDDLEWARE` matters — some middleware depends on earlier middleware having processed the request (e.g., `AuthenticationMiddleware` requires `SessionMiddleware`).
- **Common Use Cases**: Custom logging, IP blocking, maintenance mode, request timing, CORS headers, request rate limiting.

## 💻 Syntax
```python
# settings.py — Default middleware (Django 5.x)
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

```python
# middleware.py — Basic custom middleware structure
class SimpleMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Pre-processing: runs before the view
        response = self.get_response(request)
        # Post-processing: runs after the view
        return response
```

```python
# middleware.py — Full custom middleware with all hooks
class CustomMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Pre-processing
        request.custom_start_time = time.time()
        response = self.get_response(request)
        # Post-processing
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        # Runs just before the view is called
        pass

    def process_exception(self, request, exception):
        # Runs when a view raises an exception
        pass

    def process_template_response(self, request, response):
        # Runs for template responses (views returning TemplateResponse)
        return response
```

## ✅ Example 1 - Basic: Request Timing Middleware

**Problem:** Create a middleware that logs the time taken to process each request.

**Code:**
```python
# myapp/middleware.py
import time
import logging

logger = logging.getLogger(__name__)

class RequestTimingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = time.time()
        response = self.get_response(request)
        duration = time.time() - start_time

        logger.info(
            f"{request.method} {request.path} - {duration:.3f}s "
            f"[{response.status_code}]"
        )
        response['X-Request-Duration'] = str(duration)
        return response
```

```python
# settings.py — Add middleware (order matters)
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # ... other middleware ...
    'myapp.middleware.RequestTimingMiddleware',  # Custom middleware
]
```

**Output/Description:** Every request logs its method, path, duration, and status code. The duration is also added as a custom HTTP response header. This helps identify slow views during development and provides performance metrics in production.

**Explanation:** The `__call__` method captures the start time, lets the request continue through the middleware chain (via `get_response`), then calculates the duration and logs it. Adding the header enables frontend debugging. Placing this middleware early in the chain ensures accurate timing of all downstream processing.

## 🚀 Example 2 - Intermediate: IP Blocking and Maintenance Mode Middleware

**Problem:** Create middleware that blocks specific IP addresses and shows a maintenance page for all users (except staff) during maintenance.

**Code:**
```python
# myapp/middleware.py
from django.http import HttpResponseForbidden, HttpResponseTemporaryRedirect
from django.shortcuts import render
from django.conf import settings
import re

class IPBlockingMiddleware:
    """Block requests from specific IP addresses."""

    def __init__(self, get_response):
        self.get_response = get_response
        self.blocked_ips = getattr(settings, 'BLOCKED_IPS', [])
        self.allowed_paths = getattr(settings, 'ALLOWED_PATHS_FOR_BLOCKED', [])

    def __call__(self, request):
        ip = self.get_client_ip(request)

        if ip in self.blocked_ips:
            # Check if the request path is in allowed exceptions
            request_path = request.path_info
            if not any(self.path_matches(request_path, path) for path in self.allowed_paths):
                return HttpResponseForbidden("Access denied.")

        return self.get_response(request)

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0].strip()
        return request.META.get('REMOTE_ADDR')

    def path_matches(self, request_path, pattern):
        if pattern.endswith('*'):
            return request_path.startswith(pattern[:-1])
        return request_path == pattern


class MaintenanceModeMiddleware:
    """Show maintenance page when site is in maintenance mode."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if getattr(settings, 'MAINTENANCE_MODE', False):
            # Allow staff and superusers through
            if request.user.is_authenticated and (request.user.is_staff or request.user.is_superuser):
                return self.get_response(request)

            # Allow specific paths (like login for staff)
            allowed_paths = getattr(settings, 'MAINTENANCE_ALLOWED_PATHS', [])
            if any(request.path.startswith(path) for path in allowed_paths):
                return self.get_response(request)

            return render(request, 'maintenance.html', status=503)

        return self.get_response(request)
```

```python
# settings.py
BLOCKED_IPS = ['192.168.1.100', '10.0.0.50']
ALLOWED_PATHS_FOR_BLOCKED = ['/api/public/', '/health/']
MAINTENANCE_MODE = False
MAINTENANCE_ALLOWED_PATHS = ['/admin/', '/static/']

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'myapp.middleware.IPBlockingMiddleware',      # Early in chain
    'myapp.middleware.MaintenanceModeMiddleware',  # Before auth views
    # ... rest of middleware ...
]
```

**Output/Description:** Blocked IP addresses receive a 403 Forbidden response for most paths. During maintenance mode, non-staff users see a maintenance page (503 Service Unavailable). Staff can still access the admin to fix issues. Both middlewares are placed strategically in the chain.

**Explanation:** Middleware order is critical. `IPBlockingMiddleware` runs early to block unwanted traffic before any processing. `MaintenanceModeMiddleware` uses `request.user` which requires `AuthenticationMiddleware` to have run — so it must be placed after it. The `process_exception` hook could be used for custom error pages. The `process_view` hook is useful for per-view middleware logic.

## 🏢 Real World Use Case
A large SaaS platform uses middleware for: `SecurityMiddleware` (HTTPS redirect), `CORSHeadersMiddleware` (custom, sets CORS headers for API), `RateLimitMiddleware` (custom, throttles API requests per IP using Redis), `JWTAuthMiddleware` (custom, extracts JWT from Authorization header for API), `RequestLoggerMiddleware` (custom, logs all requests to ELK stack), and `WhiteNoiseMiddleware` (serves static files). The middleware chain is carefully ordered: security -> CORS -> logging -> session -> auth -> rate limiting -> CSRF -> view.

## 🎯 Interview Questions

**Q1: How does the Django middleware chain process requests and responses?**
**A:** Middleware forms a processing pipeline. On the request phase, middleware runs in the order listed in `MIDDLEWARE` (top to bottom). Each middleware's `__call__` pre-processing runs, then `get_response(request)` passes control to the next middleware. On the response phase, middleware runs in reverse order (bottom to top) as each `get_response()` returns. This creates an "onion" layer architecture.

**Q2: What is the difference between `process_view`, `process_exception`, and `process_template_response`?**
**A:** `process_view(self, request, view_func, args, kwargs)` runs after the request passes through all middleware but just before the view is called. `process_exception(self, request, exception)` runs when a view raises an exception. `process_template_response(self, request, response)` runs on views returning `TemplateResponse` (not regular `HttpResponse`), allowing post-processing of template context.

**Q3: When should you place custom middleware at the beginning vs the end of the MIDDLEWARE list?**
**A:** Place middleware early (top) when it must run before most other processing (security checks, IP blocking, rate limiting). Place middleware late (bottom) when it needs request features from other middleware (request.user from AuthenticationMiddleware, session data from SessionMiddleware) or when it should affect only the view layer.

**Q4: What does Django's SecurityMiddleware do?**
**A:** SecurityMiddleware provides security enhancements: (1) HTTP -> HTTPS redirect when `SECURE_SSL_REDIRECT` is True, (2) `X-Content-Type-Options: nosniff` header, (3) `X-XSS-Protection` header, (4) strict transport security (`Strict-Transport-Security`) header, (5) secure cookies for session/csrf when using HTTPS, (6) referrer policy header.

**Q5: Can middleware return a response without calling `get_response`?**
**A:** Yes. If a middleware returns an `HttpResponse` without calling `self.get_response(request)`, the request is short-circuited and no further middleware or the view is processed. This is how IP blocking, redirect middleware, and cache middleware work — they intercept the request before it reaches the view.

## ⚠ Common Errors / Mistakes
- **Wrong middleware order**: Placing `AuthenticationMiddleware` before `SessionMiddleware` causes errors since session data isn't available yet.
- **Forgetting to return `get_response(request)`**: The request doesn't continue through the chain, and no view runs.
- **Modifying `request` without considering thread safety**: Django is not thread-safe regarding request mutations in some configurations.
- **Using `process_view` when not needed**: Most middleware needs can be handled in `__call__`. `process_view` is only for view-specific processing.
- **Not calling `get_response` in exception handlers**: If `process_exception` returns None, the exception propagates. Return a response to handle it.
- **Assuming middleware runs for static/media in production**: In production, static/media files are typically served by the web server without going through Django.

## 📝 Practice Exercises

**Beginner (3):**
1. Create a `SimpleLoggingMiddleware` that prints the request method and path to the console. Add it to `MIDDLEWARE` and test.
2. Create a `HeaderInjectMiddleware` that adds a custom `X-Server: Django` header to every response. Verify in browser dev tools.
3. Implement a `AdminOnlyDuringWorkHours` middleware that returns a 403 if non-staff users access `/admin/` outside 9 AM - 5 PM.

**Intermediate (3):**
1. Build an `AllowedHostsMiddleware` that checks the request's `Host` header against a custom list (different from Django's `ALLOWED_HOSTS`). Return a 400 response for disallowed hosts with a custom error page.
2. Create a `RequestAnnotatorMiddleware` that adds `request.start_time`, `request.request_id` (UUID), and `request.user_agent` (parsed) to each request. Use these in views.
3. Implement a response compression middleware that gzip-compresses responses larger than 1KB with a configurable compression level and content type whitelist (compress HTML/JSON, don't compress images).

**Advanced (2):**
1. Build a rate-limiting middleware that uses Redis to track request counts per IP per minute. Return `429 Too Many Requests` with `Retry-After` header when limits are exceeded. Implement sliding window algorithm. Make it configurable per URL pattern.
2. Implement a middleware that supports A/B testing: reads a cookie or query parameter to determine the experiment variant, injects the variant into `request.ab_test_variant`, and modifies the response to set the cookie. Include a Django template context processor that makes the variant available in templates so different variants can render different content.
