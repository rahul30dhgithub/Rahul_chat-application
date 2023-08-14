const io = require('socket.io')(8000,{
    cors:{
        origin:"http://127.0.0.1:5500",
        method : ["GET","POST"] 
    }
})

const users = {};

io.on ('connection',socket => {
    socket.on('new-user-joined',names => {
        // console.log("new user",names);
        users[socket.id] = names;
        socket.broadcast.emit('user-joined',names); 
    });

    socket.on('send',message => {
        socket.broadcast.emit('receive',{message:message, names: users[socket.id]});
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})