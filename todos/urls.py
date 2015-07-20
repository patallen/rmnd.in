from django.conf.urls import url, include
from todos import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'lists', views.TodoListViewSet, 'lists')
router.register(r'users', views.UserViewSet, 'users')

urlpatterns = [
    url(r'^', include(router.urls)),
]
