(function(){
	"use strict";

	angular
		.module('app')
		.controller('Reminder', Reminder);

	Reminder.$inject = ['$interval', 'ReminderService'];

	function Reminder($interval, ReminderService) {
    var vm = this;
		var _menuActive = null;
		vm.setMenuActive = _setMenuActive;
		vm.getMenuActive = _getMenuActive;

		vm.getStatusClass = _getStatusClass;
		vm.getPauseButtonClass = _getPauseButtonClass;

		vm.toggleHold = _toggleHold;

		vm.sortType = ['-complete', '-created_at'];
		vm.sortReverse = true;
		vm.filterStr = 'all';

		function _setMenuActive(reminder){
			if (reminder == _menuActive){
				_menuActive = null;
			} else {
				_menuActive = reminder;
			}
		}
		function _getMenuActive(){
			return _menuActive;
		}
		vm.getPriority = function(reminder){
			switch(reminder.priority){
				case 'L':
					return 'Low';
				case 'M':
					return 'Medium';
				case 'H':
					return 'High';
				default:
					return 'Low';
			}
		};
		vm.setFilter = function (filter){
			if (filter =='upcoming'){
				vm.filterStr = 'upcoming';
				vm.sortType = 'remind_date';
			}
			else if (filter=='sent'){
				vm.filterStr = 'sent';
			}
			else{
				vm.filterStr = 'all';
				vm.sortType = ['-complete', '-created_at'];
			}
		};

		function _getStatusClass(reminder) {
			var now = new Date().getTime();
			var rt = new Date(reminder.remind_date).getTime();
			if (reminder.on_hold){
				return "fa fa-pause fa-pink";
			} else if (rt > now){
				return "fa fa-clock-o fa-blue";
			} else {
				return "fa fa-check fa-green";
			}
		}

		function _getPauseButtonClass(reminder) {
			if (reminder.on_hold){
				return "fa fa-play";
			} else {
				return "fa fa-pause";
			}
		}

		vm.isActiveFilter = function (filter){
			if(filter == vm.filterStr){
				return true;
			}
			return false;
		};
		vm.toggleReverse = function() {
			vm.sortReverse = !vm.sortReverse;
		};

		vm.setSortType = function(sortType){
			vm.sortType = sortType;
		};
	 vm.getDirectionClass = function(){
			if(vm.sortReverse === true){
				return 'glyphicon-arrow-up';
			}else{
				return 'glyphicon-arrow-down';
			}
		};

		vm.reminders = ReminderService.reminders;

		vm.delete = function(reminder) {
			ReminderService.deleteReminder(reminder);
		};

		function _toggleHold(reminder){
			var on_hold = reminder.on_hold;
			var msg = '';

			if (on_hold){
				reminder.on_hold = false;
				msg = "Reminder has been reinstated.";
			} else {
				reminder.on_hold = true;
				msg = "Reminder put on hold.";
			}
			ReminderService.updateReminder(reminder)
				.$promise.then(function(){
					toastr.success(msg);
				}).catch(function(){
					toastr.error("Could not toggle hold.");
				});
		}
	}
})();
