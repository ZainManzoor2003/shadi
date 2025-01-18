import { Server } from 'socket.io';
// import { LocalStorage } from "node-localstorage";
// let localStorage = new LocalStorage('./scratch')

const io = new Server(9000, {
    cors: {
        origin: 'http://localhost:5173',
    },
})

let users = [];

const removeUser = (id) => {
    users = users.filter(user => user.id !== id);
}

const checkUser = (userData) => {
    // console.log('before', users);
    users = users.filter(function (user) {
        return user.id !== userData.id;
    });
    // console.log('after', users);
    return true
}
const addUser = (userData, socketId) => {
    if (checkUser(userData)) {
        users.push({ ...userData, socketId })
    }
}
const getUser = (userId) => {
    // console.log(users);
    return users.find(user => user.id === userId);
}


io.on('connection', (socket) => {
    console.log(`User connected with id ${socket.id}`)

    // connect
    socket.on('addUser', userData => {
        // console.log(userData);
        addUser(userData, socket.id);
        // console.log('all users are ',users);
        io.emit("getUsers", users);
    })

    //send message
    socket.on('sendMessage', (data) => {
        
        const userOnline = users?.find(user => user.id === data.reciever);
        if (userOnline) {
            const user = getUser(data.reciever)
            // console.log(user.socketId);
            // console.log(users);
            io.to(user.socketId).emit('getMessage', data)
            // console.log(data);
            // console.log(user);
        }
        else{
            // const user=getUser(data.sender);
            // io.emit('changeNonSeenedMessagesOnNotOnline',data);
        }
    })

    // //disconnect
    socket.on('disconnected', (id) => {
        console.log('user disconnected');
        removeUser(id);
        console.log(socket.id);
        io.emit('getUsers', users);
    })
})