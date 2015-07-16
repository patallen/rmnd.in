from django.conf.urls import url, include
from todos import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'lists', views.TodoListViewSet)

urlpatterns = [
    url(r'^users/$', views.UserListCreate.as_view()),
    url(r'^users/(?P<username>[\w]+)/$',
        views.UserDetail.as_view()),

    url(r'^', include(router.urls)),
#    url(r'^lists/$', views.TodoListListCreate.as_view()),
#    url(r'^lists/(?P<id>[0-9]+)/$', views.TodoListDetail.as_view()),
    url(r'^lists/(?P<tlid>[0-9]+)/items/$', views.TodoItemListCreate.as_view()),
    
    url(r'^lists/(?P<tlid>[0-9]+)/items/(?P<id>[0-9]+)/$', views.TodoItemDetail.as_view()),
]
