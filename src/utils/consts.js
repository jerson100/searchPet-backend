const User = {
    TYPES: {
        ADMIN: "administrator",
        USER: "user"
    }
}

const FILES = {
    MIME_TYPE : {
        IMAGES : [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/svg+xml"
        ],
        PDF : [ "application/pdf" ],
        WORD : []
    }
}

module.exports = {
    User,
    FILES
}