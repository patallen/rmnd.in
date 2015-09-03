(function(){
	"use strict";

	angular.module('app')
		.filter('statusFilter', statusFilter);

	statusFilter.$inject = [];

	function statusFilter(){
		function returnFunction(items, status){
			var today = new Date();
			var itemsToReturn = [];
			angular.forEach(items, function(item){
				var date = new Date(item.remind_date);
				if(status == 'upcoming'){
					if(date > today){
						itemsToReturn.push(item);
					}
				} else if (status == 'sent'){
					if (date < today){
						itemsToReturn.push(item);
					}
				} else {
					return itemsToReturn.push(item);
				}
			});
			return itemsToReturn;
		}
		return returnFunction;
	}
})();
