from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from todos import views

router = DefaultRouter()
router.register(r'lists', views.TodoListViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    # url(r'^users/$', views.UserListCreate.as_view()),
    # url(r'^users/(?P<username>[\w]+)/$',
    #    views.UserDetail.as_view()),

    url(r'^', include(router.urls)),
    # url(r'^lists/$', views.TodoListListCreate.as_view()),
    # url(r'^lists/(?P<id>[0-9]+)/$', views.TodoListDetail.as_view()),
    url(r'^lists/(?P<tlid>[0-9]+)/items/$',
        views.TodoItemListCreate.as_view()),

    url(r'^lists/(?P<tlid>[0-9]+)/items/(?P<id>[0-9]+)/$',
        views.TodoItemDetail.as_view()),
]
