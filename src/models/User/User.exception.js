class TokenException extends Error{
    constructor(msg="El token no es válido", status=401) {
        super(msg);
        this.status = status;
        this.name = "TokenException"
    }
}

class UnauthorizedUserException extends Error{
    constructor(msg="No está autorizado", status=401) {
        super(msg);
        this.status = status;
        this.name = "UnauthorizedUserException";
    }
}

class ForbiddenUserException extends Error{
    constructor(msg="No tiene los permisos suficientes para solicitar el recurso", status=403) {
        super(msg);
        this.status = status;
        this.name = "ForbiddenUserException";
    }
}

module.exports = {
    TokenException,
    UnauthorizedUserException,
    ForbiddenUserException
}
