"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = __importDefault(require("socket.io"));
const app = express_1.default();
const server = http_1.createServer(app);
const io = socket_io_1.default(server);
server.listen(8999);
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/src/client/index.html");
});
let timeLeft = 120;
const interval = setInterval(() => {
    io.emit("updateTime", {
        time: timeLeft
    });
    if (timeLeft-- === 0) {
        timeLeft = 0;
        clearInterval(interval);
    }
}, 1000);
io.on("connection", (socket) => {
    socket.emit("updateTime", {
        time: timeLeft.toString()
    });
});
