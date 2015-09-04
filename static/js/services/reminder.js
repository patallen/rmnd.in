(function(){
	"use strict";

	angular.module('app')
		.service('ReminderService', reminderService);

	reminderService.$inject = ['Reminder'];

	function reminderService (Reminder){
		var vm = this;
		vm.reminders = [];
		_setReminders();
		vm.setReminders = _setReminders;


		function _setReminders(){
			vm.reminders = Reminder.query();
		}

		vm.addReminder = function (newReminder){
			return Reminder.save(newReminder, function(res){
				vm.reminders.push(res);
				toastr.success('Successfully created reminder!');
			});
		};
		vm.updateReminder = function(updateReminder){
			return Reminder.update({id:updateReminder.id}, updateReminder, function(){
				angular.extend(_.find(vm.reminders, {'id': updateReminder.id}), updateReminder);
				toastr.success('Successfully saved reminder!');
			});
		};
		vm.deleteReminder = function(deleteReminder){
			Reminder.delete(deleteReminder, function(){
				_.remove(vm.reminders, deleteReminder);
			});
		};
		vm.getReminder = function(reminderId){
			return Reminder.get({id: reminderId});
		};
		vm.clear = function(){
			vm.reminders = [];
		};
		vm.init = function(){
			vm.setReminders();
		};
		return vm;
	}
})();
