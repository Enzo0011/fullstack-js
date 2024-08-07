import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { Server } from "socket.io";
import { fileURLToPath } from 'url';
import { config } from "./config.js";
import ChatRoute from "./routes/ChatRoute.js";
import RoomRoute from "./routes/RoomRoute.js";
import UserRoute from "./routes/UserRoute.js";
import { CHAT_BOT } from "./utils/Constants.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
dotenv.config();


const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const users = new Map();

const getUserNames = (room) => {
  const userlist = users.get(room);
  let namesOnly = [];
  userlist.forEach((_user) => {
    namesOnly.push(_user.username);
  });
  return namesOnly;
};

io.on("connection", (socket) => {
  if(socket.handshake.query.username) {
    socket.join(socket.handshake.query.room);
    const _room = users.get(socket.handshake.query.room) || [];
    const _updatedRoom = _room.map((_obj) => {
      if(_obj.username === socket.handshake.query.username) {
        _obj.id = socket.id;
      }
      return _obj;
    });
    users.set(socket.handshake.query.room, _updatedRoom);
    io.in(socket.handshake.query.room).emit("new_user", { users: getUserNames(socket.handshake.query.room) });
  }
  socket.on("join_room", (data) => {
    const { username, room } = data;
    socket.join(room);
    if(!users.get(room)) users.set(room, [{ username, id: socket.id }]);
    else users.get(room).push({ username, id: socket.id });
    io.in(room).emit("new_user", { users: getUserNames(room) });
    io.in(room).emit("receive_message", { message: `${username} à rejoint la room`, timeCreated: Date.now(), sender: { username: CHAT_BOT } });
  });

  socket.on("send_message", (data) => {
    const { username, msg, timeCreated, room } = data;
    const _data = { message: msg, timecreated: timeCreated, sender: { username }};
    io.in(room).emit('receive_message', _data);
  });

  socket.on("leave_room", (data) => {
    const { username, room } = data;
    socket.leave(room);
    let _users = users.get(room);
    _users = _users ? _users.filter(u => u.username !== username) : [];
    users.set(room, _users);
    io.in(room).emit("new_user", { users: getUserNames(room) });
    io.in(room).emit("receive_message", { message: `${username} à rejoint la room`, timeCreated: Date.now(), sender: { username: CHAT_BOT } });
  });

  socket.on("disconnect", (d) => { 
    console.log(`socket disconnected with ${d}`);
    // const clients = io.sockets.adapter.rooms.get("63ede513dcc52465c40609bf");
    // console.log(clients);
  });
});

mongoose.set("strictQuery", false);
mongoose.connect(config.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () => console.log("connected to mongoDB")
);

app.use("/api/v1/users", UserRoute);
app.use("/api/v1/rooms", RoomRoute);
app.use("/api/v1/chats", ChatRoute);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if(process.env.NODE_ENV === "development") {
  app.get("/", (req, res) => res.send("Hello World"));
} else {
  app.use(express.static(path.join(__dirname, "./client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

server.listen(config.PORT, () => console.log(`Server started running on port ${config.PORT}`));
