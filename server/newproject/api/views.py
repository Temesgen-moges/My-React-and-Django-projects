from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import BookSerializer
from .models import Book
from rest_framework import status

@api_view (['GET'])
def get_books(request):
    books = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)
@api_view (['POST'])
def create_book(request):
    serializer = BookSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view (['DELETE'])
def delete_book(request, id):
        book = Book.objects.get(id=id)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
@api_view (['PUT'])
def update_book(request, id):
        book = Book.objects.get(id=id)
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
