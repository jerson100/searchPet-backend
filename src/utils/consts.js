const User = {
  TYPES: {
    ADMIN: "administrator",
    USER: "user",
  },
  STATUS: {
    ACTIVE: 1,
    INACTIVE: 0,
    BLOQUEADO: 3,
  },
};

const FILES = {
  MIME_TYPE: {
    IMAGES: ["image/jpeg", "image/png", "image/gif", "image/svg+xml"],
    PDF: ["application/pdf"],
    WORD: [],
  },
};

const NOTIFICATIONS = {
  LOST_PET_COMMENT: "LOST_PET_COMMENT",
};

const CHATS = {
  PRIVATE: "PRIVATE",
  GROUP: "GROUP",
};

module.exports = {
  User,
  FILES,
  NOTIFICATIONS,
  CHATS,
};
