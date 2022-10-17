// DEPENDENCIES
// ... the rest of our other dependencies
const cors = require("cors")
const morgan = require("morgan")
const methodOverride = require('method-override');
// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();
// const port = process.env.PORT || 4000;
// const session = require("express-session");
// const MongoStore = require("connect-mongo");

    // server-side
    // const io = require("socket.io")(httpServer, {
    //     cors: {
    //       origin: "https://example.com",
    //       methods: ["GET", "POST"],
    //       allowedHeaders: ["my-custom-header"],
    //       credentials: true
    //     }
    //   });

// server.use(middlewares);
// server.use(router);
// server.listen(port);
// import user router

// initialize .env variables
require("dotenv").config();
const { PORT, MONGODB_URI } = process.env;
const http = require('http');
const express = require("express");
const {Server} = require('socket.io')

// create application object
const app = express();
const server = http.createServer(app)

const io = new Server(server, {cors:{origin: "*"}})

app.get("/", (req, res) => {
    //res.json let's us send a response as JSON data
    res.json({
        response: "Hello World"
    })
})

const userController = require('./controllers/user-controller')
const authController = require('./controllers/auth-controller')
const careerController = require('./controllers/career-controller')
	
// MIDDLEWARE
////////////////////////////////
app.use(express.json()); // parse json bodies - this will run before our request accesses the people router
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging for development
app.use(methodOverride('_method'));
app.use('/user', userController);
app.use('/career', careerController);
app.use('/auth', authController);


io.on('connection', (socket)=>{
    console.log('connected to socket')

    socket.join('chat')
    //socket.data.id = socket.id; 

    socket.on('typing', ({sender, username})=>{
        console.log(username)
        //socket.emit('typing-response', username)
        socket.broadcast.emit('typing-response', username)
        //socket.to(sender).emit('typing-response', username)
    })

    socket.on('message', (msgObj)=>{
        socket.broadcast.emit('display-mesage', msgObj)
    })

    socket.on('join-software-engineer-room', ()=>{
        socket.join('software-engineer')
        socket.emit('go-to-software-engineer-room')
    })

    socket.on('join-ui-ux-room', ()=>{
        socket.join('ui-ux')
        socket.emit('go-to-ui-ux-room')
    })

    socket.on('join-data-analyst-room', ()=>{
        socket.join('data-analyst')
        socket.emit('go-to-data-analyst-room')
    })

    socket.on('se-message', (msgObj)=>{
        console.log('SE Object', msgObj)
       // io.to("software-engineer").emit("se-display-message", msgObj);
        socket.broadcast.emit('se-display-message', msgObj)
    })

    socket.on('ui-message', (msgObj)=>{
        //io.to("ui-ux").emit("ui-display-message", msgObj);
        socket.broadcast.emit('se-display-message', msgObj)
    })

    socket.on('da-message', (msgObj)=>{
        //io.to("data-analyst").emit("da-display-message", msgObj);
        socket.broadcast.emit('se-display-message', msgObj)
    })


})



// LISTENER

//app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
server.listen(PORT, () => console.log(`listening on PORT ${PORT}`));