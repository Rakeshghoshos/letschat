const  express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 9090 || process.env.PORT;

app.use(cors(
    {
        origin: '*',
        credentials:true
    }
));

const server = http.createServer(app);
const io = require("socket.io")(server);


// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------


let users = {};
io.on("connect",(socket)=>{
    console.log("socket connected");

    socket.on("joined",({user})=>{
        users[socket.id] = user;
        console.log(`${user}has joined`);
        socket.broadcast.emit("new user",`${users[socket.id]}  has joined`);
        socket.emit("welcome",{message :`welcome to the chat!! ${users[socket.id]}`})
    });

    socket.on("message",({message,id})=>{
        io.emit("sendMessage",({user:users[id],message,id}));
    })

    socket.on("disconnect",()=>{
        socket.broadcast.emit("leave",`${users[socket.id]} has leave`);
        console.log("user left");
    });
});

server.listen(port,()=>{
    console.log("server started");
});
