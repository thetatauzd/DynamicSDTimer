import express from "express";
import { createServer } from "http";
import socketIo from "socket.io";

const app = express();
const server = createServer(app);
const io = socketIo(server);

server.listen(8999);

app.get("/", (req: any, res: any) => {
    res.sendFile(__dirname + "/src/client/index.html");
});

let timeLeft: number = 120;
const interval: NodeJS.Timeout = setInterval(() => {
    io.emit("updateTime", {
        time: timeLeft
    });
    if (timeLeft-- === 0) { 
        timeLeft = 0;
        clearInterval(interval);
    }
}, 1000);

io.on("connection", (socket: socketIo.Socket) => {
    socket.emit("updateTime", {
        time: timeLeft.toString()
    });
});
