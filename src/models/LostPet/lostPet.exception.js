class CreateLostPetException extends Error{
    constructor(msg="No se pudo crear la soliticud de pérdida de mascota", status= 400) {
        super(msg);
        this.status = status;
        this.name = "CreatePetException";
    }
}

class UpdateLostPetException extends Error{
    constructor(msg="No se pudo actualizar la soliticud de pérdida de mascota", status= 400) {
        super(msg);
        this.status = status;
        this.name = "UpdatePetException";
    }
}

class NotFoundLostPetException extends Error{
    constructor(msg="La solicitud de pérdida con el id especificado no existe", status= 404) {
        super(msg);
        this.status = status;
        this.name = "NotFoundTypePetException";
    }
}

module.exports = {
    CreateLostPetException,
    NotFoundLostPetException,
    UpdateLostPetException
}