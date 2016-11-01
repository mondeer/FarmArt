// var mongoose = require('mongoose'),
var io = require('socket.io')(3000);

// mongoose.connect("mongodb://192.168.0.190/chat", function(err){
// 	if (err){
// 		throw err
// 	}
// 	else {
// 		console.log('worked')
// 	}
// });
//
// var msgSchema = mongoose.Schema ({
// 	msgi: String,
// 	time: {type: Date, default: Date.now}
// });

// var Chat = mongoose.model("Message", msgSchema);

io.on('connection', function(socket){

	socket.on('join:room', function(data){
		var room_name = data.room_name;
		socket.join(room_name);
	});


	socket.on('leave:room', function(msg){
		msg.text = msg.user + ' was pissed off';
		socket.leave(msg.room);
		socket.in(msg.room).emit('message', msg);
	});


	socket.on('send:message', function(msg){
		// var newMsg = new Chat({msgi: msg});
		// newMsg.save(function(err){
			// if (err) {
				// throw err
			// }
			// else {
				socket.in(msg.room).emit('message', msg);
			// }
		// });

	});


});
