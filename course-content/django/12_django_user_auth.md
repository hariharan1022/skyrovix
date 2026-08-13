# 12. Django User Authentication

## 📘 Introduction
Django comes with a robust, built-in authentication system handling user accounts, login/logout, password management, permissions, and sessions. The `django.contrib.auth` app provides the User model and views for common authentication workflows. Django also supports custom user models for extending or replacing the default User.

## 🧠 Key Concepts
- **django.contrib.auth**: The built-in authentication framework providing User model, permissions, and session handling.
- **User Model**: Default fields include `username`, `password`, `email`, `first_name`, `last_name`, `is_staff`, `is_superuser`, `is_active`, `date_joined`.
- **Creating Users**: `create_user()` (regular user) and `create_superuser()` (admin user with all permissions).
- **login()/logout()**: Session-based login/logout functions that handle authentication tokens and session data.
- **authenticate()**: Verifies credentials and returns the User object or None.
- **login_required**: Decorator that redirects unauthenticated users to the login page.
- **@user_passes_test**: Decorator for custom access checks (e.g., checking group membership).
- **Built-in Auth Views**: `LoginView`, `LogoutView`, `PasswordChangeView`, `PasswordResetView`, and more.
- **Custom User Model**: Extend `AbstractUser` or `AbstractBaseUser` to add custom fields or change authentication identifier (e.g., use email instead of username).

## 💻 Syntax
```python
# Creating users
from django.contrib.auth.models import User

user = User.objects.create_user('john', 'john@example.com', 'securepassword123')
superuser = User.objects.create_superuser('admin', 'admin@example.com', 'adminpass')
```

```python
# Login and logout
from django.contrib.auth import authenticate, login, logout

def login_view(request):
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return redirect('home')
    else:
        # Invalid credentials
        pass

def logout_view(request):
    logout(request)
    return redirect('home')
```

```python
# Decorators
from django.contrib.auth.decorators import login_required, user_passes_test

@login_required(login_url='/accounts/login/')
def dashboard(request):
    return render(request, 'dashboard.html')

def is_editor(user):
    return user.groups.filter(name='Editors').exists()

@user_passes_test(is_editor, login_url='/no-access/')
def editor_panel(request):
    return render(request, 'editor_panel.html')
```

```python
# Using built-in auth views (urls.py)
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('password-change/', auth_views.PasswordChangeView.as_view(), name='password_change'),
    path('password-reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
]
```

## ✅ Example 1 - Basic: User Registration and Login

**Problem:** Implement user registration and login functionality.

**Code:**
```python
# forms.py
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class RegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user
```

```python
# views.py
from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import RegistrationForm

def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # Auto-login after registration
            return redirect('home')
    else:
        form = RegistrationForm()
    return render(request, 'register.html', {'form': form})
```

```html
<!-- templates/register.html -->
<h2>Register</h2>
<form method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit">Register</button>
</form>
```

```python
# urls.py
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
]
```

**Output/Description:** Users can register with username, email, and password. After registration, they're automatically logged in. The login page uses Django's built-in `LoginView`. Protected views decorated with `@login_required` redirect unauthenticated users to the login page.

**Explanation:** `UserCreationForm` handles password validation and hashing. `UserCreationForm.save()` calls `create_user()` internally. `login()` creates a session and attaches it to the user. Django's auth views include form validation, error messages, and CSRF protection out of the box.

## 🚀 Example 2 - Intermediate: Custom User Model with Email Authentication

**Problem:** Replace the default username-based authentication with email-based authentication, adding a `bio` field.

**Code:**
```python
# models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    bio = models.TextField(max_length=500, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)

    USERNAME_FIELD = 'email'      # Use email for login
    REQUIRED_FIELDS = ['username'] # Still required for createsuperuser

    def __str__(self):
        return self.email
```

```python
# settings.py
AUTH_USER_MODEL = 'accounts.CustomUser'
```

```python
# admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('bio', 'date_of_birth')}),
    )
```

```python
# forms.py
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('email', 'username', 'bio')

class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = CustomUser
        fields = ('email', 'username', 'bio')
```

```bash
# IMPORTANT: Set AUTH_USER_MODEL BEFORE first migration
python manage.py makemigrations accounts
python manage.py migrate
```

**Output/Description:** Users now log in with their email address and password. The `CustomUser` model has the additional `bio` field. The admin interface shows all fields properly. Existing databases with the default User model cannot add a custom user model without migration complications.

**Explanation:** `AUTH_USER_MODEL` must be set before creating any migrations. `USERNAME_FIELD = 'email'` tells Django to use email as the unique login identifier. `AbstractUser` includes all default User fields plus permissions and groups. Replacing the user model mid-project is complex — best practice is to set it in every new project (even if using default fields now).

## 🏢 Real World Use Case
A SaaS platform uses a custom user model (`AUTH_USER_MODEL = 'users.User'`) with email authentication, company association, and role-based permissions. The login view authenticates via email/password. `@login_required` protects dashboard views. `@user_passes_test` checks subscription status. Django's `PasswordResetView` sends branded password reset emails. API tokens (via `django-rest-framework`'s TokenAuthentication) allow mobile app access. Users belong to groups mapped to subscription tiers.

## 🎯 Interview Questions

**Q1: Why should you set a custom user model in every new Django project?**
**A:** Once migrations are created, switching from the default User model to a custom one requires a complex database migration and is error-prone. Setting `AUTH_USER_MODEL = 'myapp.User'` from the start allows future flexibility (adding fields, changing authentication identifier) without migration difficulties.

**Q2: What is the difference between `login()` and `authenticate()` in Django?**
**A:** `authenticate()` verifies credentials (username/password) and returns the User object if valid, or None if invalid. It does NOT create a session. `login()` creates a session for the user in the current request. They are typically used together: authenticate first, then login.

**Q3: How does `@login_required` work?**
**A:** `@login_required` checks if the user is authenticated (`request.user.is_authenticated`). If not, it redirects to the login URL (defined by `LOGIN_URL` setting or `login_url` argument), appending the current path as a `next` parameter. After login, the user is redirected back to the original page.

**Q4: What is `AbstractUser` vs `AbstractBaseUser`?**
**A:** `AbstractUser` is a full implementation of Django's default User model (username, email, password, first/last name, groups, permissions, etc.). Extend it when you want to add fields but keep the default authentication. `AbstractBaseUser` is a bare-minimum base class with only password management — use only when you need radical changes like replacing username with phone number login.

**Q5: How do you handle password reset in Django?**
**A:** Use Django's built-in `PasswordResetView`, `PasswordResetDoneView`, `PasswordResetConfirmView`, and `PasswordResetCompleteView`. These handle: (1) user enters email, (2) Django sends a one-time-use link with a signed token, (3) user clicks link and sets new password, (4) confirmation page. Requires email backend configuration.

## ⚠ Common Errors / Mistakes
- **Adding a custom user model after migrations run**: Extremely difficult to migrate. Always set `AUTH_USER_MODEL` on day one.
- **Forgetting `AUTH_USER_MODEL` in settings**: Django uses the default User model. Your custom model won't be used for auth.
- **Storing passwords in plain text**: Never store passwords directly. Use `create_user()` or `set_password()` which hash passwords.
- **Missing `LOGIN_URL` setting**: `@login_required` redirects to `/accounts/login/` by default. Set `LOGIN_URL` to match your login URL.
- **Not using `login_required` on sensitive views**: Protected pages remain accessible without authentication.
- **Exposing user enumeration**: `PasswordResetView` by default reveals whether an email exists. Consider customizing to always show "reset link sent" message.

## 📝 Practice Exercises

**Beginner (3):**
1. Create a registration system using Django's `UserCreationForm` with email, username, and password. Auto-login the user after registration.
2. Implement login/logout using `LoginView` and `LogoutView`. Create a profile page accessible only to authenticated users.
3. Add `@login_required` to three views. Set `LOGIN_URL` in settings. Verify redirect to login when unauthenticated.

**Intermediate (3):**
1. Create a custom user model before any migrations. Add fields: `phone_number`, `profile_picture`, and `date_of_birth`. Set `USERNAME_FIELD = 'email'`.
2. Implement a password reset flow using Django's built-in password reset views. Configure email backend to print to console (`EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'`).
3. Create a group-based permission system: define an "Admin" and "Editor" group. Use `@user_passes_test` to restrict an editor dashboard to editors only. Provide a user management page in admin.

**Advanced (2):**
1. Implement social authentication (Google, GitHub login) using `django-allauth`. Configure it to work alongside your custom user model. Handle cases where the social provider's email matches an existing account.
2. Build a multi-factor authentication system: after password login, users must enter a TOTP code from an authenticator app (use `django-otp` or implement RFC 6238). Include backup codes and "remember this device" cookie functionality.
