class CreateActivityException extends Error{
    constructor(msg="No se pudo crear la actividad", status = 400) {
        super(msg);
        this.status = status;
        this.name = "CreateActivityException";
    }
}

class DeleteActivityException extends Error{
    constructor(msg="No se pudo eliminar la actividad", status = 400) {
        super(msg);
        this.status = status;
        this.name = "CreateActivityException";
    }
}

module.exports = {
    CreateActivityException,
    DeleteActivityException
}