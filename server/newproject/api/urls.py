from django.urls import path
from .views import get_books
from .views import create_book
from .views import delete_book
from .views import update_book

urlpatterns = [
    path('books/', get_books, name='get_books'),
    path('books/create/', create_book, name='create_book'),
    path('books/<int:id>/delete/', delete_book, name='delete_book'),
    path('books/<int:id>/update/', update_book, name='update_book'),
]