angular.module('app')
.directive('datePicker', function(){
	return {
		restrict: 'A',
		require: ngModel,
		link: function(scope, element, attrs, ngModelCtrl){
			$(function(){
				element.datepicker({
					dateFormat: 'mm/dd/yy',
					onSelect: function(date){
						ngModelCtrl.$setViewValue(date);
					}
				});
			});
		}
	}
})
