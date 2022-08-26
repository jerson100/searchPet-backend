class CreatePetException extends Error{
    constructor(msg="No se pudo crear la mascota", status= 400) {
        super(msg);
        this.status = status;
        this.name = "CreatePetException";
    }
}

class UpdatePetException extends Error{
    constructor(msg="No se pudo actualizar la mascota", status= 400) {
        super(msg);
        this.status = status;
        this.name = "UpdatePetException";
    }
}

class NotFoundPetException extends Error{
    constructor(msg="La mascota no existe", status= 404) {
        super(msg);
        this.status = status;
        this.name = "NotFoundTypePetException";
    }
}

module.exports = {
    CreatePetException,
    NotFoundPetException,
    UpdatePetException
}