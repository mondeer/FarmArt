(function(){

	angular.module('FarmArt')
	.service('SocketService', ['socketFactory', SocketService]);

	function SocketService(socketFactory){
		return socketFactory({

			ioSocket: io.connect('http://192.168.0.190:3000')

		});
	}
})();
