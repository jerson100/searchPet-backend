class CreateTypePetException extends Error{
    constructor(msg="No se pudo crear el Tipo de mascota", status= 400) {
        super(msg);
        this.status = status;
        this.name = "CreateTypePetException";
    }
}

class ExistsTypePetException extends Error{
    constructor(msg="El tipo de mascota ya existe", status= 400) {
        super(msg);
        this.status = status;
        this.name = "ExistsTypePetException";
    }
}

class NotFoundTypePetException extends Error{
    constructor(msg="El tipo de mascota no existe", status= 404) {
        super(msg);
        this.status = status;
        this.name = "NotFoundTypePetException";
    }
}

module.exports = {
    CreateTypePetException,
    ExistsTypePetException,
    NotFoundTypePetException
}