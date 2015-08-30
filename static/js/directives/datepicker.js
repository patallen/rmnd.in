(function (){
	angular.module('app')
		.directive('datePicker', datePicker);

	datePicker.$inject = ['$filter'];

	function datePicker($filter){
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ngModelCtrl){
				ngModelCtrl.$parsers.push(function(data){
					return data;
				});
				ngModelCtrl.$formatters.push(function(data){
					return $filter('date')(data, 'MM/dd/yyyy');
				});
				$(function(){
					element.datepicker({
						onSelect: function(date){
							ngModelCtrl.$setViewValue(new Date(date));
							scope.$apply();
						}
					});
				});
			}
		};
	}
})();
