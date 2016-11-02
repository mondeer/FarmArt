(function(){
	angular.module('FarmArt')
	.controller('HomeController', ['$scope', '$state', 'localStorageService', 'SocketService', HomeController]);

	function HomeController($scope, $state, localStorageService, SocketService){

		var me = this;

		me.current_room = localStorageService.get('room');
		// me.rooms = ['Dairy', 'Crop Farming', 'Poultry', 'Horticulture', 'Fish Farming', 'Soko'];
		me.rooms = [{
			room: "Dairy",
			pic: "img/farm.jpg"
		},
		{
			room: "Crop farming",
			pic: "img/farm1.jpeg"
		},
		{
			room: "Poultry",
			pic: "img/splash.png"
		}];

		$scope.login = function(username){
			localStorageService.set('username', username);
			$state.go('app.rooms');
		};


		$scope.enterRoom = function(room_name){

			me.current_room = room_name;
			localStorageService.set('room', room_name);

			var room = {
				'room_name': room_name
			};

			SocketService.emit('join:room', room);

			$state.go('app.room');
		};

	}

})();
