from django.conf.urls import url, include
from rest_framework_extensions.routers import ExtendedSimpleRouter
from todos import views

router = ExtendedSimpleRouter()
(
    router.register(r'lists', views.TodoListViewSet, 'lists')
          .register(r'items',
                    views.TodoItemViewSet,
                    base_name='items',
                    parents_query_lookups=['todo_list_id'])
)
(
    router.register(r'users', views.UserViewSet, 'users')
)

urlpatterns = [
    url(r'^', include(router.urls)),
]
