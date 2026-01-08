const express = require("express")
require("dotenv").config();
const { Server } =require("socket.io") 

const http=require("http");
const app = express();
const ClintRouter = require("./Router/ClientRouter")
const AdminRouter = require("./Router/AdminRouter");



require("./Cron")
const cors= require("cors");

app.use(cors())

app.use(express.json());
app.use(ClintRouter);


app.use(AdminRouter);


const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin: "*",
        methods:["POST","GET"]
    }
})
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.emit("notification", { message: "Connected to server" });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const port =process.env.PORT
server.listen(port, () => console.log(`Server running on http:localhost:${port}`))

