from django.urls import path

from . import views

app_name = 'works'
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:work_id>/', views.detail, name='detail'),
]
