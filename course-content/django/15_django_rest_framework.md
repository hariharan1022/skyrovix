# 15. Django REST Framework (DRF)

## 📘 Introduction
Django REST Framework (DRF) is a powerful and flexible toolkit for building Web APIs in Django. It provides serializers for data transformation, class-based views for API endpoints, authentication and permission classes, automatic URL routing, browsable API interface, and extensive documentation support. DRF is the most widely used library for building RESTful APIs with Django.

## 🧠 Key Concepts
- **Serializers**: Convert complex data types (querysets, model instances) to/from Python datatypes (JSON, XML). `Serializer` is the base class; `ModelSerializer` auto-generates fields from models. Includes validation.
- **APIView**: Base class for API views with HTTP method handlers (`get`, `post`, `put`, `patch`, `delete`).
- **ViewSet**: Groups related API actions (list, create, retrieve, update, partial_update, destroy) into a single class.
- **ModelViewSet**: ViewSet with default CRUD actions, automatically mapped from a model and serializer.
- **Routers**: `DefaultRouter` automatically generates URL patterns for ViewSets (including a root API view).
- **Authentication**: `TokenAuthentication`, `SessionAuthentication`, `BasicAuthentication`, `JWTAuthentication` (via `djangorestframework-simplejwt`).
- **Permissions**: `IsAuthenticated`, `IsAdminUser`, `IsAuthenticatedOrReadOnly`, `AllowAny`, `DjangoModelPermissions`, and custom permission classes.
- **Pagination**: `PageNumberPagination`, `LimitOffsetPagination`, `CursorPagination` for splitting large result sets.
- **API Documentation**: `drf-spectacular` (modern, OpenAPI 3) or `drf-yasg` (Swagger/OpenAPI) for auto-generated API docs.

## 💻 Syntax
```bash
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install drf-spectacular
```

```python
# settings.py
INSTALLED_APPS = [
    # ...
    'rest_framework',
    'rest_framework.authtoken',
    'drf_spectacular',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'My API',
    'VERSION': '1.0.0',
}
```

```python
# serializers.py
from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'price', 'published_date']
```

```python
# views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Book
from .serializers import BookSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
```

```python
# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet

router = DefaultRouter()
router.register(r'books', BookViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
```

## ✅ Example 1 - Basic: Building a Simple Book API

**Problem:** Create a REST API for books with CRUD operations, read-only access for unauthenticated users.

**Code:**
```python
# serializers.py
from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.name', read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'author_name', 'price', 'isbn', 'published_date']
```

```python
# views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Book
from .serializers import BookSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.select_related('author').all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
```

```python
# urls.py
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import BookViewSet

router = DefaultRouter()
router.register(r'books', BookViewSet, basename='book')

urlpatterns = [
    path('api/', include(router.urls)),
]
```

**Output/Description:** The API is accessible at `/api/books/`. GET requests (list and detail) work without authentication. POST, PUT, PATCH, DELETE require authentication (with token or session). The browsable API at `/api/books/` shows a web interface for testing.

**Explanation:** `ModelViewSet` provides `list`, `create`, `retrieve`, `update`, `partial_update`, and `destroy` actions automatically. `DefaultRouter` generates URL patterns: `/api/books/` (GET/POST), `/api/books/{id}/` (GET/PUT/PATCH/DELETE). `IsAuthenticatedOrReadOnly` allows anonymous GET requests but requires auth for modifications. `select_related` optimizes the author join.

## 🚀 Example 2 - Intermediate: Advanced API with Custom Actions, Filtering, and JWT Auth

**Problem:** Build a bookstore API with custom endpoints (search, top-selling), filtering, searching, ordering, and JWT authentication.

**Code:**
```python
# serializers.py
from rest_framework import serializers
from .models import Book, Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'rating', 'comment', 'created_at']
        read_only_fields = ['created_at']

class BookListSerializer(serializers.ModelSerializer):
    average_rating = serializers.FloatField(read_only=True)
    review_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'price', 'average_rating', 'review_count']

class BookDetailSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'price', 'isbn', 'description',
                  'published_date', 'average_rating', 'reviews']

    def get_average_rating(self, obj):
        ratings = [r.rating for r in obj.reviews.all()]
        return sum(ratings) / len(ratings) if ratings else None
```

```python
# views.py
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Book, Review
from .serializers import BookListSerializer, BookDetailSerializer, ReviewSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.prefetch_related('reviews').all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['author', 'published_date__year']
    search_fields = ['title', 'author__name', 'isbn']
    ordering_fields = ['price', 'published_date', 'title']
    ordering = ['-published_date']

    def get_serializer_class(self):
        if self.action == 'list':
            return BookListSerializer
        return BookDetailSerializer

    @action(detail=False, methods=['get'])
    def top_selling(self, request):
        books = self.get_queryset().order_by('-sales_count')[:10]
        serializer = BookListSerializer(books, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def add_review(self, request, pk=None):
        book = self.get_object()
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(book=book, reviewer=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def purchase(self, request, pk=None):
        book = self.get_object()
        if book.stock > 0:
            book.stock -= 1
            book.sales_count += 1
            book.save()
            return Response({'message': 'Purchase successful'})
        return Response(
            {'error': 'Out of stock'},
            status=status.HTTP_400_BAD_REQUEST
        )
```

```python
# urls.py
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import BookViewSet

router = DefaultRouter()
router.register(r'books', BookViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
```

```python
# settings.py — JWT configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
}
```

**Output/Description:** The API supports: listing with filters/search/ordering, detail with nested reviews, top-selling endpoint (`/api/books/top_selling/`), review creation (`POST /api/books/{id}/add_review/`), purchase action (`POST /api/books/{id}/purchase/`), and JWT authentication (`/api/token/`, `/api/token/refresh/`).

**Explanation:** `@action(detail=True)` creates custom endpoints under `/api/books/{pk}/action_name/`. `@action(detail=False)` creates collection-level endpoints. `get_serializer_class()` allows different serializers for different actions. Decorators can override view-level settings (permissions, auth classes). `DjangoFilterBackend` enables exact field filtering; `SearchFilter` enables text search with `^`, `=`, `@`, `$` prefixes.

## 🏢 Real World Use Case
An e-commerce API built with DRF serves a mobile app and a React frontend. Models include Product, Category, Order, Cart, User. ViewSets with ModelSerializer handle all CRUD. Custom `@action` endpoints handle checkout, add-to-cart, and order tracking. `TokenAuthentication` (via JWT) secures user-specific endpoints. `CustomPagination` returns page metadata alongside results. `drf-spectacular` generates OpenAPI 3.0 docs used by the frontend team. Custom permissions check user roles: `IsAdminUser` for product management, `IsOwner` for order access. `Throttling` prevents abuse on login and checkout endpoints.

## 🎯 Interview Questions

**Q1: What is the difference between APIView and ViewSet in DRF?**
**A:** `APIView` is the base class for building individual API endpoints. You define HTTP method handlers (`get`, `post`, etc.) manually. `ViewSet` groups related actions (list, create, retrieve, update, destroy) into one class. ViewSets work with routers to auto-generate URL patterns. Use APIView for simple or highly custom endpoints; use ViewSet for standard CRUD operations.

**Q2: How does DRF authentication work and what are the common auth classes?**
**A:** DRF authentication runs before any permission check. It identifies the user making the request. Common auth classes: `SessionAuthentication` (browable API, uses Django sessions), `TokenAuthentication` (simple token in Authorization header), `JWT` (`djangorestframework-simplejwt`, token-based with refresh), `BasicAuthentication` (HTTP Basic Auth). Multiple auth classes can be combined.

**Q3: What is the DRF request-response cycle?**
**A:** (1) Request hits URL dispatcher → (2) DRF's APIView wraps Django's HttpRequest into DRF's Request object (adds `request.data`, `request.query_params`, `request.user`) → (3) Authentication runs → (4) Permissions checked (raises 403 if denied) → (5) Throttling checked → (6) View method called (e.g., `get()`, `post()`) → (7) Response is rendered (JSON, browsable HTML, etc.) → (8) Response returned.

**Q4: Explain DRF permissions — built-in and custom.**
**A:** Built-in: `AllowAny` (no restriction), `IsAuthenticated` (logged-in only), `IsAdminUser` (staff users only), `IsAuthenticatedOrReadOnly` (anyone can read, auth required for write), `DjangoModelPermissions` (ties to Django's model permissions). Custom permissions extend `BasePermission` and implement `has_permission()` (view-level) and/or `has_object_permission()` (object-level). Return `True` for allow, `False` for deny.

**Q5: How do you handle API documentation in DRF projects?**
**A:** Most common approach is `drf-spectacular`, which generates OpenAPI 3.0 schema from your DRF code (serializers, views, routes). It auto-detects request/response schemas including nested serializers, custom actions, and method-level serializers. Alternative is `drf-yasg` (Swagger/OpenAPI 2.0). Both provide a browsable Swagger UI and ReDoc interface for testing endpoints.

## ⚠ Common Errors / Mistakes
- **Not using `get_serializer_class()` when different views need different serializers**: Causes over-fetching or missing fields in list/detail.
- **Exposing sensitive fields**: Forgetting to exclude password hashes, API keys, or internal fields from serializers.
- **Ignoring N+1 queries in serializer relations**: A serializer with nested serializers triggers a query per parent. Use `select_related`/`prefetch_related`.
- **Missing pagination**: Returning all records without pagination causes performance issues and slow responses.
- **Not handling validation errors properly**: Always return proper error responses with field-specific messages.
- **Using `APIView` when `ViewSet` would suffice**: More boilerplate than needed for standard CRUD.

## 📝 Practice Exercises

**Beginner (3):**
1. Install DRF and create a simple API for a `Task` model (title, description, completed, created_at) using `ModelViewSet` and `DefaultRouter`.
2. Add `IsAuthenticatedOrReadOnly` permission and token authentication. Generate a token for a user and use it with curl/Postman.
3. Create a custom `GET /api/tasks/today/` endpoint that returns tasks created today using `@action`.

**Intermediate (3):**
1. Implement nested serializers: Create `Category` and `Product` models. The `ProductSerializer` should include category details. Implement create/update for nested data.
2. Add filtering, searching, and ordering to the Task API. Users should be able to filter by `completed`, search by `title`, and order by `created_at` or `priority`.
3. Build a `UserRegisterView` using APIView that accepts username, email, and password, creates a user, and returns a JWT token pair (access + refresh).

**Advanced (2):**
1. Design a versioned API with two versions — v1 (flat responses) and v2 (nested responses). Use URL namespacing (`/api/v1/`, `/api/v2/`) and shared serializers with different `Meta.fields` or custom `to_representation` overrides. Implement middleware that reads `Accept-Version` header for version resolution.
2. Build a hypermedia-driven HATEOAS API using DRF. Each response should include `links` dict with `self`, `next`, `prev`, and action URLs. Implement a custom renderer that adds link objects to all responses. Use `HyperlinkedModelSerializer` for related model references.
