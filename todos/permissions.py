from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user
        
class IsOwnerOfList(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        return obj.todo_list.owner == request.user