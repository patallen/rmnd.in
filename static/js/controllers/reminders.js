(function(){
	"use strict";

	angular
		.module('app')
		.controller('Reminder', Reminder);

	Reminder.$inject = ['$interval', 'ReminderService', 'rtReminders'];

	function Reminder($interval, ReminderService, rtReminders) {
    var vm = this;
		var _menuActive = null;

    // Controller Variables
    vm.sortType = ['-complete', '-created_at'];
	vm.sortReverse = true;
	vm.filterStr = 'all';

    // Set Reminders
    // Reminders are set in router's resolve
    vm.reminders = rtReminders;

    vm.deleteReminder =  deleteReminder;
    vm.isActiveFilter =  isActiveFilter;
    vm.getMenuActive = getMenuActive;
	vm.getPauseButtonClass = getPauseButtonClass;
    vm.getPriority = getPriority;
    vm.getStatusClass = getStatusClass;
    vm.setFilter =  setFilter;
	vm.setMenuActive = setMenuActive;
    vm.toggleHold = toggleHold;


    function deleteReminder(reminder) {
		ReminderService.deleteReminder(reminder);
	}

    function isActiveFilter(filter){
		if(filter == vm.filterStr){
			return true;
		}
		return false;
	}

    function getMenuActive(){
		return _menuActive;
	}

    function getPauseButtonClass(reminder) {
		if (reminder.on_hold){
			return "fa fa-play";
		} else {
			return "fa fa-pause";
		}
	}

	function getPriority(reminder){
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
	}

    function getStatusClass(reminder) {
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

	function setFilter(filter){
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
	}

	function setMenuActive(reminder){
		if (reminder == _menuActive){
			_menuActive = null;
		} else {
			_menuActive = reminder;
		}
	}

    function toggleHold(reminder){
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


    // Currently Unused Functions
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
	}
})();
