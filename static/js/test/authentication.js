describe('ReminderCtrl', function(){
	beforeEach(module('app'));
	var createController;
	var scope;
	beforeEach(inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		createController = function(){
			return $controller('reminder', {$scope: scope});
		};
	}));

	it('Filter should be set to \'all\'', function(){
		var ctrl = createController();
		expect(scope).toBeDefined();
		expect(scope.filterStr).toBe('all');
	});
});
