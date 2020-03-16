from django.urls import path

from . import views

app_name = 'posts'
urlpatterns = [
    # ex: /posts/
    path('', views.index, name='index'),
    # ex: /posts/5/
    path('<int:post_id>/', views.detail, name='detail'),
    # ex: /posts/5/results/
]

