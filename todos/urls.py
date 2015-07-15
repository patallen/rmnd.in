from django.conf.urls import url
from todos import views

urlpatterns = [
    url(r'^users/$', views.UserListCreate.as_view()),
    url(r'^users/(?P<username>[\w]+)/$',
        views.UserDetail.as_view()),

    url(r'^lists/$', views.TodoListListCreate.as_view()),
]
