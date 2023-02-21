const { Server } = require("socket.io");
const { InMemorySessionStore } = require("../utils/session");
const { v4: uuidv4 } = require("uuid");
// const { NOTIFICATIONS } = require("../utils/consts");

const sessionStore = new InMemorySessionStore();

class Socket {
  constructor(server, options) {
    this.io = new Server(server, options);
    this.middlewares();
    this.addEvents();
  }
  addEvents() {
    this.io.on("connection", (socket) => {
      const { sessionID, userID } = socket;
      // console.log(sessionID, userID);
      // persist session
      sessionStore.saveSession(sessionID, {
        userID: userID,
        connected: true,
      });
      // emit session details
      socket.emit("session", { sessionID, userID, connected: true });
      socket.on("notification", ({ from, to, type, message, data }) => {
        // console.log(from, to, type, message, data);
        socket.to(to).emit("notification", {
          from: from,
          to: to,
          type: type,
          message: message,
          data: data,
        });
      });
      // join the "userID" room
      socket.join(userID);
    });
    this.io.on("disconnect", () => {
      console.log("usuario desconectado.");
    });
  }
  middlewares() {
    this.io.use((socket, next) => {
      //sessión previa del cleinte - localstorage
      const sessionId = socket.handshake.auth.sessionID;
      if (sessionId) {
        const session = sessionStore.findSession(sessionId);
        if (session) {
          socket.sessionID = sessionId;
          socket.userID = session.userID;
          //   socket.user = socket.handshake.auth.user;
          return next();
        }
      }
      socket.sessionID = uuidv4();
      socket.userID = socket.handshake.auth.userID;
      return next();
    });
  }
}

module.exports = {
  Socket,
};

// module.exports = {
//   init: (server, options) => {
//     io = new Server(server, options);

//     io.use((socket, next) => {
//       const sessionId = socket.handshake.auth.sessionID; //sessión previa del cleinte - localstorage
//       if (sessionId) {
//         const session = sessionStore.findSession(sessionId);
//         if (session) {
//           socket.sessionID = sessionId;
//           socket.userId = session.userID;
//           //   socket.user = socket.handshake.auth.user;
//           return next();
//         }
//       }
//       socket.sessionID = uuidv4();
//       socket.userId = socket.handshake.auth.userID;
//       return next();
//     });

//     io.on("connection", (socket) => {
//       console.log(socket.handshake.auth);
//       sessionStore.saveSession(socket.sessionID, {
//         userID: socket.userID,
//         username: socket.username,
//         connected: true,
//       });
//       io.emmit("connected-user", "usuario conectado");
//     });
//     io.on("disconnect", () => {
//       console.log("usuario desconectado.");
//     });
//   },
// };
