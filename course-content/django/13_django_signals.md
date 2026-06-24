# 13. Django Signals

## 📘 Introduction
Django's signal dispatcher allows decoupled applications to get notified when certain actions occur elsewhere in the framework. Signals follow the observer pattern — when a "sender" performs an action, registered "receivers" are notified. Signals are commonly used for triggering side effects (sending emails, updating caches, logging) without tightly coupling components.

## 🧠 Key Concepts
- **Signal Dispatcher**: The mechanism (`django.dispatch.Signal`) that allows senders to notify receivers about events.
- **Built-in Signals**: Django provides signals for model lifecycle: `pre_save`, `post_save`, `pre_delete`, `post_delete`, `m2m_changed`, `class_prepared`, and request signals: `request_started`, `request_finished`, `got_request_exception`.
- **`@receiver` Decorator**: The modern way to connect signals to receiver functions.
- **`ready()` Method**: Method in `apps.py`'s AppConfig where signals should be imported/connected to avoid import side effects.
- **Signal Arguments**: Depending on the signal, receivers get: `sender` (model class), `instance` (actual object), `created` (for post_save), `**kwargs`.
- **Duplicate Signals**: Connecting signals multiple times causes receivers to fire multiple times. Use `dispatch_uid` or ensure proper connection patterns.
- **Disconnecting Signals**: `post_save.disconnect(receiver)` for cleanup in tests.

## 💻 Syntax
```python
# Using @receiver decorator (recommended)
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
```

```python
# signals.py — Separate signals module
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from .models import Article

@receiver(post_save, sender=Article)
def article_published_notification(sender, instance, created, **kwargs):
    if created and instance.status == 'published':
        # Send notifications to subscribers
        notify_subscribers(instance)

@receiver(pre_delete, sender=Article)
def cleanup_article_files(sender, instance, **kwargs):
    # Delete associated media files
    if instance.featured_image:
        instance.featured_image.delete(save=False)
```

```python
# apps.py — Connect signals in ready()
from django.apps import AppConfig

class BlogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'blog'

    def ready(self):
        import blog.signals  # Ensures signals are connected
```

## ✅ Example 1 - Basic: Auto-Create Profile on User Registration

**Problem:** Automatically create a `Profile` instance whenever a new `User` registers.

**Code:**
```python
# models.py
from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=100, blank=True)
```

```python
# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
```

```python
# apps.py
from django.apps import AppConfig

class AccountsConfig(AppConfig):
    name = 'accounts'

    def ready(self):
        import accounts.signals
```

```python
# accounts/__init__.py — Ensure AppConfig is used
default_app_config = 'accounts.apps.AccountsConfig'
```

**Output/Description:** Every time a new User is saved with `created=True` (i.e., first save), a corresponding Profile is created automatically. The `Profile.objects.get_or_create(user=request.user)` pattern can be avoided since profiles always exist.

**Explanation:** `post_save` fires after the model's `save()` method completes. The `created` boolean is True only for newly created instances. The `sender` restricts the signal to User model saves only. Signals must be connected when Django starts — the `ready()` method is the correct place to import them.

## 🚀 Example 2 - Intermediate: Logging Changes and Sending Notifications

**Problem:** Log all changes to an `Order` model and send email notification when status changes.

**Code:**
```python
# models.py
from django.db import models

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.CharField(max_length=200)
    quantity = models.IntegerField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

```python
# signals.py
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Order

@receiver(pre_save, sender=Order)
def track_status_changes(sender, instance, **kwargs):
    if instance.pk:
        try:
            old = sender.objects.get(pk=instance.pk)
            if old.status != instance.status:
                # Store old status so post_save can use it
                instance._old_status = old.status
        except sender.DoesNotExist:
            pass

@receiver(post_save, sender=Order)
def order_status_notification(sender, instance, created, **kwargs):
    if created:
        # New order confirmation
        subject = f"Order #{instance.pk} Confirmed"
        message = f"Your order for {instance.product} has been received."
    else:
        # Status change notification
        old_status = getattr(instance, '_old_status', None)
        if old_status and old_status != instance.status:
            subject = f"Order #{instance.pk} Status Updated: {instance.status}"
            message = f"Your order status changed from {old_status} to {instance.status}."

    if created or (old_status and old_status != instance.status):
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [instance.user.email],
            fail_silently=True,
        )
```

```python
# signals.py — Custom signal for additional decoupling
from django.dispatch import Signal

# Define custom signal
order_cancelled = Signal()

@receiver(post_save, sender=Order)
def detect_cancellation(sender, instance, **kwargs):
    if not kwargs.get('created') and instance.status == 'cancelled':
        old_status = getattr(instance, '_old_status', None)
        if old_status and old_status != 'cancelled':
            order_cancelled.send(sender=Order, order=instance)

@receiver(order_cancalled)
def refund_order(sender, order, **kwargs):
    # Process refund when order is cancelled
    print(f"Processing refund for order #{order.pk}")

@receiver(order_cancalled)
def restock_inventory(sender, order, **kwargs):
    # Restock items
    print(f"Restocking {order.quantity} units of {order.product}")
```

**Output/Description:** When an order is created, the customer receives an email confirmation. When the status changes to "shipped" or "cancelled", another notification is sent. Cancellations trigger additional processes (refund, restock) via custom signals.

**Explanation:** `pre_save` captures the old state before the save. Custom signals (`order_cancelled = Signal()`) allow complete decoupling — the `Order` model doesn't need to know about refund processing or inventory management. Multiple receivers can listen to the same custom signal for different side effects.

## 🏢 Real World Use Case
An e-commerce platform uses signals extensively: `post_save` on User creates a customer profile and sends a welcome email. `post_save` on Order sends order confirmation to customer and notification to admin. `m2m_changed` on Product.categories updates search indexes. `post_save` on Product sends webhook to inventory management system. A custom `low_stock` signal triggers reorder notifications to suppliers. All signal connections live in each app's `signals.py`, imported in `ready()`.

## 🎯 Interview Questions

**Q1: What is the difference between pre_save and post_save signals?**
**A:** `pre_save` fires before the database save operation — useful for modifying the instance before it's saved or capturing the pre-save state. `post_save` fires after the save completes — useful for triggering side effects like notifications, cache invalidation, or creating related objects.

**Q2: Why should signals be connected in the `ready()` method of AppConfig rather than at the module level?**
**A:** Connecting signals at the module level (in `models.py` or `signals.py` directly) can cause import side effects and duplicate connections. The `ready()` method is called once when Django starts and provides a clean lifecycle hook for connecting signals. Importing the signals module inside `ready()` ensures connections happen at the right time.

**Q3: What is `dispatch_uid` and when would you use it?**
**A:** `dispatch_uid` is a string identifier for a signal connection that prevents duplicate connections. If `ready()` can be called multiple times (e.g., during testing), the same receiver might be connected multiple times, causing it to fire multiple times per event. `dispatch_uid` ensures idempotent connections.

**Q4: What are some performance considerations with signals?**
**A:** Signals are synchronous — long-running operations (email sending, image processing) in signal handlers block the request-response cycle. Use asynchronous task queues (Celery, Huey, or Django's `async` support) for heavy operations. Disconnect signals in tests to isolate behavior and improve test speed.

**Q5: What is the `m2m_changed` signal and its typical use cases?**
**A:** `m2m_changed` fires when a ManyToManyField relationship changes (add, remove, clear). It provides `action` (pre_add, post_add, pre_remove, post_remove, pre_clear, post_clear), `pk_set` (primary keys being added/removed), and `reverse` (whether the reverse relation is being modified). Use cases: updating search indexes when tags change, invalidating caches, or triggering webhooks.

## ⚠ Common Errors / Mistakes
- **Forgetting to import signals in `ready()`**: Signals are defined but never connected — nothing happens.
- **Creating infinite loops**: A `post_save` that saves the model again triggers another `post_save`. Use `update()` or guards (`if not kwargs.get('raw')`).
- **Signal handler crashes causing request failure**: Exceptions in signal handlers propagate to the request handler. Wrap signal logic in try/except or use async tasks.
- **Duplicate signal execution in tests**: Test runner may reload AppConfig, causing duplicate connections. Use `dispatch_uid` or disconnect in `tearDown`.
- **Heavy operations in signal handlers**: Synchronous email sending or image processing blocks the user's request. Offload to Celery.
- **Relying on signal execution order**: Django doesn't guarantee receiver execution order. Design signals to be order-independent.

## 📝 Practice Exercises

**Beginner (3):**
1. Create a `UserProfile` model with a OneToOneField to User. Use `post_save` signal to create a profile whenever a new user is created.
2. Use `pre_delete` signal to log the deletion of a `Product` instance (print the product name to console). Then prevent deletion if the product is in an active order.
3. Create a `post_save` signal on a `Comment` model that prints "New comment added by [user] on [article]" whenever a comment is created.

**Intermediate (3):**
1. Implement a "last seen" feature: use a custom signal `user_activity` that fires when users visit any page. Connect it to update the user's `last_seen` timestamp (through middleware). This avoids coupling middleware to models.
2. Use `m2m_changed` signal on a `Post.tags` ManyToManyField. When tags are updated, trigger a cache invalidation for the post's detail page. Implement the cache clearing logic.
3. Build an audit logging system using signals on all models in an app. Create an `AuditLog` model that records `action` (created/updated/deleted), `model_name`, `object_id`, `changed_fields` (JSON), and `timestamp`. Connect signals to all models and log changes.

**Advanced (2):**
1. Implement a custom signal-based event sourcing system. Each model save creates an `Event` record. Implement event replay: the ability to replay all events from a given timestamp to rebuild the current state. Discuss consistency guarantees and ordering.
2. Build a signal-based webhook system where users can configure URL endpoints that receive POST notifications when specific model events occur. Use signals to detect events, serialize the data, and dispatch to configured webhook URLs asynchronously. Include retry logic with exponential backoff.
