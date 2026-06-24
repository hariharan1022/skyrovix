# 10. Django Forms

## 📘 Introduction
Django forms handle HTML form creation, validation, and processing. They can generate form HTML, validate submitted data, and convert it to Python types. Django provides two form base classes: `forms.Form` for custom forms and `forms.ModelForm` for forms tied to model instances. Forms dramatically reduce the boilerplate of handling user input.

## 🧠 Key Concepts
- **forms.Form**: Base class for creating forms not directly tied to a model.
- **Form Fields**: `CharField`, `EmailField`, `IntegerField`, `ChoiceField`, `BooleanField`, `DateField`, `FileField`, `DecimalField`, and many more.
- **Validation**: Three levels — built-in field validators (e.g., email format), custom `validators` list, `clean_<fieldname>()` methods for single-field validation, and `clean()` for cross-field validation.
- **is_valid()**: Triggers validation and returns True/False. Populates `cleaned_data` on success, `errors` on failure.
- **cleaned_data**: Dictionary of validated form data (converted to Python types).
- **Form Rendering**: `form.as_p`, `form.as_table`, `form.as_ul`, or manual field-by-field rendering.
- **ModelForm**: Generates form fields automatically from a model's fields, handles save to database.
- **Widgets**: Control the HTML input rendering (TextInput, Textarea, Select, CheckboxInput, etc.).

## 💻 Syntax
```python
# forms.py — Regular Form
from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100, label="Your Name")
    email = forms.EmailField(label="Email Address")
    subject = forms.CharField(max_length=200)
    message = forms.CharField(widget=forms.Textarea, max_length=2000)
    cc_self = forms.BooleanField(required=False, label="Send copy to yourself")
```

```python
# forms.py — ModelForm
from django import forms
from .models import Article

class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ['title', 'content', 'status', 'category']
        widgets = {
            'content': forms.Textarea(attrs={'rows': 10}),
        }
```

```python
# views.py — Handling form submission
from django.shortcuts import render, redirect
from .forms import ContactForm

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            # Process data (send email, save to DB...)
            return redirect('success')
    else:
        form = ContactForm()
    return render(request, 'contact.html', {'form': form})
```

```html
<!-- Template rendering -->
<form method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit">Submit</button>
</form>
```

## ✅ Example 1 - Basic: Contact Form with Validation

**Problem:** Create a contact form with validation for name, email, and message fields.

**Code:**
```python
# forms.py
from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100, label="Full Name")
    email = forms.EmailField(label="Email")
    message = forms.CharField(
        widget=forms.Textarea(attrs={'placeholder': 'Your message...'}),
        max_length=2000,
        min_length=10,
        label="Message"
    )

    def clean_name(self):
        name = self.cleaned_data['name']
        if not name.strip():
            raise forms.ValidationError("Name cannot be only spaces")
        return name.strip()

    def clean_message(self):
        message = self.cleaned_data['message']
        if 'http://' in message or 'https://' in message:
            raise forms.ValidationError("No URLs allowed in messages")
        return message
```

```python
# views.py
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ContactForm

def contact_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Simulate sending email
            print(f"From: {form.cleaned_data['name']} <{form.cleaned_data['email']}>")
            print(f"Message: {form.cleaned_data['message']}")
            messages.success(request, "Thank you for your message!")
            return redirect('contact')
    else:
        form = ContactForm()
    return render(request, 'contact.html', {'form': form})
```

```html
<!-- contact.html -->
<form method="post" novalidate>
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit">Send Message</button>
</form>
{% if form.errors %}
    <div class="errors">
        {{ form.errors }}
    </div>
{% endif %}
```

**Output/Description:** When valid data is submitted, the form processes and redirects with a success message. Invalid submissions re-render the form with error messages. The `clean_name()` method trims whitespace; `clean_message()` rejects URLs.

**Explanation:** `is_valid()` runs all validation (built-in + custom). Individual field validators run first, then `clean_<field>()`, then `clean()`. `cleaned_data` contains validated/corrected data. `widget` attributes customize HTML rendering. The `novalidate` attribute disables browser-side validation for server-side testing.

## 🚀 Example 2 - Intermediate: ModelForm with Custom Validation and Widgets

**Problem:** Create a ModelForm for `Article` with custom validation, widgets, and conditional field display.

**Code:**
```python
# models.py
from django.db import models

class Article(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('review', 'In Review'),
        ('published', 'Published'),
    ]
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    published_date = models.DateTimeField(null=True, blank=True)
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True)

class Category(models.Model):
    name = models.CharField(max_length=100)
```

```python
# forms.py
from django import forms
from django.utils.text import slugify
from .models import Article

class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ['title', 'slug', 'content', 'status', 'published_date', 'category']
        widgets = {
            'content': forms.Textarea(attrs={
                'rows': 15,
                'class': 'rich-editor',
                'placeholder': 'Write your article content...'
            }),
            'published_date': forms.DateTimeInput(attrs={
                'type': 'datetime-local',
            }),
        }
        labels = {
            'title': 'Article Title',
            'slug': 'URL Slug',
        }
        help_texts = {
            'slug': 'Leave empty to auto-generate from title',
            'status': 'Select "Published" only after final review',
        }

    def clean_slug(self):
        slug = self.cleaned_data['slug']
        if not slug:
            slug = slugify(self.cleaned_data.get('title', ''))
        if Article.objects.filter(slug=slug).exclude(pk=self.instance.pk).exists():
            raise forms.ValidationError("This slug is already in use.")
        return slug

    def clean(self):
        cleaned_data = super().clean()
        status = cleaned_data.get('status')
        pub_date = cleaned_data.get('published_date')

        if status == 'published' and not pub_date:
            raise forms.ValidationError(
                "Published date is required when status is 'Published'."
            )
        if pub_date and status != 'published':
            cleaned_data['published_date'] = None

        return cleaned_data
```

```python
# views.py
from django.shortcuts import render, redirect, get_object_or_404
from .forms import ArticleForm
from .models import Article

def article_create(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            article = form.save()
            return redirect('article_detail', pk=article.pk)
    else:
        form = ArticleForm()
    return render(request, 'article_form.html', {'form': form})

def article_update(request, pk):
    article = get_object_or_404(Article, pk=pk)
    if request.method == 'POST':
        form = ArticleForm(request.POST, instance=article)
        if form.is_valid():
            article = form.save()
            return redirect('article_detail', pk=article.pk)
    else:
        form = ArticleForm(instance=article)
    return render(request, 'article_form.html', {'form': form})
```

**Output/Description:** The form auto-generates fields from the model. The slug auto-populates from title when empty. Custom validation ensures published status requires a date. The `instance` parameter pre-populates the form for editing. `form.save()` creates or updates the database record.

**Explanation:** `ModelForm` derives field types and validation from the model. Passing `instance` to the form binds it to an existing object (for updates). `form.save()` either creates or updates based on whether `instance` was provided. Custom `clean()` handles cross-field rules. Widget attrs map to HTML attributes for styling and JavaScript integration.

## 🏢 Real World Use Case
A job board platform uses ModelForms extensively. `JobForm` (ModelForm for `Job`) includes fields like title, description, salary range, location, job type, and skills. Custom validation ensures salary_min < salary_max. The description field uses a rich text widget (TinyMCE/CKEditor). `CompanyForm` handles company profile with image upload. Application forms use regular `Form` class with file upload for resumes and cover letters. Each form's `clean()` method implements business rules like "minimum salary must be above minimum wage."

## 🎯 Interview Questions

**Q1: What is the difference between `forms.Form` and `forms.ModelForm`?**
**A:** `forms.Form` is a generic form not tied to any model — you define all fields manually and handle data processing yourself. `forms.ModelForm` auto-generates fields from a model, includes model validation, provides `save()` to persist to database, and pre-populates from existing instances. Use Form for non-model data (search, contact, login), ModelForm for CRUD operations.

**Q2: How does Django form validation work step by step?**
**A:** When `is_valid()` is called: (1) field-specific validation runs (built-in validators, `validators` list, custom clean_<field>), (2) `clean()` method runs for cross-field validation, (3) if all pass, `cleaned_data` is populated with Python types; if any fail, `errors` dict is populated. The form re-renders with error messages.

**Q3: What is the purpose of `clean_<fieldname>()` vs `clean()`?**
**A:** `clean_<fieldname>()` validates a single field. It accesses that field's value via `self.cleaned_data`, performs validation, and returns the cleaned value. `clean()` validates across multiple fields and can modify/validate multiple `cleaned_data` values at once. Single-field methods run first, then the full clean.

**Q4: How do you handle file uploads in Django forms?**
**A:** Use `forms.FileField()` or `forms.ImageField()` in the form. In the view, pass `request.FILES` to the form: `form = FormClass(request.POST, request.FILES)`. The template form must include `enctype="multipart/form-data"`. For ModelForms, FileField/ImageField in the model automatically handle this.

**Q5: What are widgets in Django forms and how do you customize them?**
**A:** Widgets control the HTML rendering of form fields (e.g., TextInput, Textarea, Select, CheckboxInput, DateInput). Customize via the `widget` argument in field definition or the `widgets` dict in ModelForm.Meta. Widget attrs (HTML attributes) are passed as dict: `forms.Textarea(attrs={'class': 'editor', 'rows': 10})`.

## ⚠ Common Errors / Mistakes
- **Forgetting `request.FILES` in forms with file uploads**: The file data never reaches the form, `is_valid()` fails silently.
- **Missing `{% csrf_token %}` in template form**: Django rejects POST requests with a 403 Forbidden error.
- **Using `POST` for GET forms**: Search forms should use GET method so results are bookmarkable.
- **Not handling `instance` for ModelForm updates**: Passing `instance=obj` is required for updates; without it, `save()` creates a new record.
- **Calling `form.save(commit=False)` without calling `save()`**: `commit=False` returns an unsaved instance — you must eventually call `save()`.
- **Exposing all model fields in Meta.fields**: Using `fields = '__all__'` may expose sensitive fields. Always whitelist explicitly.

## 📝 Practice Exercises

**Beginner (3):**
1. Create a `RegistrationForm` using `forms.Form` with fields: `username`, `email`, `password`, `confirm_password`. Add validation that passwords match.
2. Build a `SearchForm` with a `CharField` and a `ChoiceField` for search category. Use GET method in the view. Display search results on the same page.
3. Create a simple ModelForm for a `Task` model (title, description, due_date, completed). Implement create and update views.

**Intermediate (3):**
1. Add custom validation to the `RegistrationForm`: username must be at least 3 characters, password must contain a number and uppercase letter, email must not already exist.
2. Create a `ProductForm` (ModelForm for `Product`) that dynamically filters category choices based on the user's permissions. Include a custom widget for price (dollar prefix).
3. Implement a multi-step form wizard using Django's `formtools` library or session-based storage for a multi-page checkout process (Cart → Shipping → Payment → Confirmation).

**Advanced (2):**
1. Build a dynamic form system where the form fields change based on a "type" selector (e.g., selecting "Article" shows different fields than "Video"). Use JavaScript and clean Django forms to validate the appropriate fields server-side based on the type.
2. Implement a formset-based system for a "Quiz Builder" where users can add/remove questions and answers dynamically. Use Django's `formset_factory` with JavaScript for adding/removing forms, and implement custom validation ensuring at least one correct answer per question.
