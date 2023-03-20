const { Server } = require("socket.io");
const { InMemorySessionStore } = require("../utils/session");
const { v4: uuidv4 } = require("uuid");
// const { NOTIFICATIONS } = require("../utils/consts");
const NotificationService = require("../services/notificationService");

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
      socket.on(
        "notification",
        async ({ from, to, type, message, data, path }) => {
          // console.log(from, to, type, message, data);
          const newNotification = await NotificationService.create({
            from: from,
            to: to,
            content: message,
            type: type,
            path,
            seen: false,
          });

          //   socket.to(to).emit("notification", {
          //     from: from,
          //     to: to,
          //     type: type,
          //     message: message,
          //     data: data,
          //   });
          socket
            .to(to)
            .emit("new notification", { ...newNotification.toObject(), data });

          socket
            .to(to)
            .emit("notifications", { ...newNotification.toObject(), data });
        }
      );
      //enviamos el nuevo chat a todas las instancias del usuario
      socket.on("join-chat", (room) => {
        // console.log(newChat._id);
        socket.join(room._id);
        // socket.to(newChat._id).emit("join-chat", newChat);
      });

      socket.on("switch-join", (data) => {
        const { prev, current } = data;
        if (prev) socket.leave(prev);
        if (current) socket.join(current);
      });

      socket.on("send-message", (newMessage) => {
        console.log(newMessage);
        socket.to(newMessage.chat).emit("new-message", newMessage);
      });

      socket // join the "userID" room
        .join(userID);

      socket.on("disconnect", (socket) => {
        if (socket.userID) {
          sessionStore.removeSession(socket.userID);
        }
      });
    });
    // this.io.on("disconnect", (socket) => {
    //   console.log(socket);
    // });
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
