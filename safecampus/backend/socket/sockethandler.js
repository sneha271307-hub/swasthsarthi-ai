const jwt = require("jsonwebtoken");

module.exports = (io) => {
  const jwt = require("jsonwebtoken");

module.exports = (io) => {
  // Authenticate each Socket.IO connection
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error("Authentication required"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      socket.user = {
        id: decoded.id,
        role: decoded.role
      };

      next();
    } catch (error) {
      next(new Error("Invalid or expired token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("Authenticated client connected:", socket.user.id);

    // Join the user's own private room
    socket.join(`user_${socket.user.id}`);

    // Join an incident room
    socket.on("joinIncident", (incidentId) => {
      if (typeof incidentId !== "string") return;

      socket.join(`incident_${incidentId}`);
      console.log(`Client joined incident_${incidentId}`);
    });

    socket.on("leaveIncident", (incidentId) => {
      if (typeof incidentId !== "string") return;

      socket.leave(`incident_${incidentId}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.user.id);
    });
  });
};
};