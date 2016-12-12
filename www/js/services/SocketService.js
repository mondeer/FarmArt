(function(){

	angular.module('FarmArt')
	.service('SocketService', ['socketFactory', SocketService]);

	function SocketService(socketFactory){
		return socketFactory({

			ioSocket: io.connect('localhost:3000')

		});
	}
})();
