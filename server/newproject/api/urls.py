from django.urls import path
from .views import get_books
from .views import create_book

urlpatterns = [
    path('books/', get_books, name='get_books'),
    path('books/create/', create_book, name='create_book'),
]