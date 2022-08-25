class CreateBreedException extends Error{
    constructor(msg="No se pudo crear la raza de la mascota", status= 400) {
        super(msg);
        this.status = status;
        this.name = "CreateBreedException";
    }
}

class ExistsBreedException extends Error{
    constructor(msg="La raza de la mascota ya está asociado al tipo de mascota especificado", status= 400) {
        super(msg);
        this.status = status;
        this.name = "ExistsBreedException";
    }
}

class NotFoundBreedException extends Error{
    constructor(msg="La raza de la mascota no existe", status= 404) {
        super(msg);
        this.status = status;
        this.name = "NotFoundBreedException";
    }
}

module.exports = {
    CreateBreedException,
    ExistsBreedException,
    NotFoundBreedException
}