const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const {Server}= require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 3700;

//middleware
app.use(express.json());
app.use(cors());
 
io.on("connection", (socket) => {
    console.log(socket.id, "has joined");

    socket.on("driver", (data) => {
        var presentRide_ID = JSON.parse(data).presentRideID;
        console.log(presentRide_ID);

        io.emit(presentRide_ID, data);
    });

    socket.on("disconnect", ()=> {

    });
});

app.route("/check").get((req, res)=>{
    return res.json("Your App is working fine");
});

server.listen(PORT, "0.0.0.0", () => {
    console.log("listening on "+PORT);
});