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

    socket.on('chat-room', (name)=>{
        console.log(name)
        socket.emit('chat-room', `${name} the boss`)
    })
})



// LISTENER

//app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
server.listen(PORT, () => console.log(`listening on PORT ${PORT}`));