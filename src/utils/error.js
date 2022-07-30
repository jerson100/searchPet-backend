class ServerError extends Error {
    constructor(msg = "Ocurrió un error en el servidor", status = 500) {
        super(msg);
        this.status = status;
        this.name = "ServerError";
    }
}

class SchemaValidationError extends Error {
    constructor(
        msg = "Ocurrió un error en la solicitud, vuelva a intentarlo",
        status = 400
    ) {
        super(msg);;
        this.status = status;
        this.name = "SchemaValidationError";
    }
}


module.exports = {ServerError, SchemaValidationError}