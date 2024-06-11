from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="Home"),
    path("creatorTools/", views.creatorlogin, name="creatorlogin"),
    path("creatorTools/datacreation/", views.dataCreation, name="datacreation"),
    path("request", views.request),
]