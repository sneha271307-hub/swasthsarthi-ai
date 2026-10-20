require("dotenv").config();

const express = require("express");
const incidentroutes = require("./routes/incidentroutes");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const socketHandler = require("./socket/sockethandler");

const connectDB = require("./config/db");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
cors: {
origin: process.env.CLIENT_URL,
methods: ["GET", "POST", "PATCH", "DELETE"]
}
});
socketHandler(io);
app.set("io", io);
app.use(cors({
origin: process.env.CLIENT_URL
}));

app.use(express.json());
const authroutes = require("./routes/authroutes");

app.use("/api/auth", authroutes);
app.use("/api/incidents", incidentroutes);
app.get("/api/health", (req, res) => {
res.status(200).json({
success: true,
message: "SafeCampus backend is running"
});
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
await connectDB();

server.listen(PORT, () => {
console.log(`🚀 SafeCampus server running on port ${PORT}`);
});
};

startServer();
