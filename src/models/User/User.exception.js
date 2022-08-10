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

class ExistingUserException extends Error{
    constructor(msg="Ya existe un usuario con ese username", status=400) {
        super(msg);
        this.status = status;
        this.name = "ExistingUserException";
    }
}

class UserCreationException extends Error{
    constructor(msg="No se pudo crear el usuario", status=400) {
        super(msg);
        this.status = status;
        this.name = "UserCreationException";
    }
}

class NotFoundUserException extends Error{
    constructor(msg="No se encontró el usuario", status=404) {
        super(msg);
        this.status = status;
        this.name = "NotFoundUserException";
    }
}

class LoginUserException extends Error{
    constructor(msg="Email o contraseña incorrectos", status=400) {
        super(msg);
        this.status = status;
        this.name = "LoginUserException";
    }
}

module.exports = {
    TokenException,
    UnauthorizedUserException,
    ForbiddenUserException,
    ExistingUserException,
    NotFoundUserException,
    UserCreationException,
    LoginUserException
}
