class CreateLostPetCommentException extends Error{
    constructor(msg="No se pudo crear el comentario", status=400) {
        super(msg);
        this.name = "CreateLostPetCommentException";
        this.status = status;
    }
}

class NotFoundLostPetCommentException extends Error{
    constructor(msg="No se encontró comentarios para id especificado", status=404) {
        super(msg);
        this.name = "NotFoundLostPetCommentException";
        this.status = status;
    }
}

module.exports = {
    CreateLostPetCommentException,
    NotFoundLostPetCommentException
}