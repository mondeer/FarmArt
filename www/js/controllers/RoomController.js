(function(){
	angular.module('FarmArt')
	.controller('RoomController', ['$scope', '$state', 'localStorageService', 'SocketService', 'moment', '$ionicScrollDelegate', RoomController]);

	function RoomController($scope, $state, localStorageService, SocketService, moment, $ionicScrollDelegate){

		var me = this;

		me.messages = [];

		$scope.humanize = function(timestamp){
			return moment(timestamp).fromNow();
		};

		me.current_room = localStorageService.get('room');

		var current_user = localStorageService.get('username');

		$scope.isNotCurrentUser = function(user){

			if(current_user != user){
				return 'chat-bubble-left';
			}
			return 'chat-bubble-right';
		};


		$scope.sendTextMessage = function(){

			var msg = {
				'room': me.current_room,
				'user': current_user,
				'text': me.message,
				'time': moment()
			};


			me.messages.push(msg);
			$ionicScrollDelegate.scrollBottom();

			SocketService.emit('send:message', msg);
			me.message = '';
		};


		$scope.leaveRoom = function(){

			var msg = {
				'user': current_user,
				'room': me.current_room,
				'time': moment()
			};

			SocketService.emit('leave:room', msg);
			$state.go('rooms');

		};


		SocketService.on('message', function(msg){
			me.messages.push(msg);
			$ionicScrollDelegate.scrollBottom();
		});


	}

})();
