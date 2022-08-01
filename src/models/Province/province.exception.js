class ProvinceCreationException extends Error{
    constructor(msg="No se pudo crear la provincia", status=400) {
        super(msg);
        this.status = status;
        this.name = "ProvinceCreationException"
    }
}

class ProvinceExistenceException extends Error{
    constructor(msg="Ya existe una provincia con el mismo nombre", status=400) {
        super(msg);
        this.status = status;
        this.name = "ProvinceExistenceException"
    }
}

class ProvinceNotFoundException extends Error{
    constructor(msg="No existe la provincia para el id especificado", status=404) {
        super(msg);
        this.status = status;
        this.name = "ProvinceNotFoundException"
    }
}

class ProvinceUpdateException extends Error{
    constructor(msg="No se pudo actualizar la provincia ", status=400) {
        super(msg);
        this.status = status;
        this.name = "ProvinceUpdateException"
    }
}

module.exports = {
    ProvinceCreationException,
    ProvinceExistenceException,
    ProvinceNotFoundException,
    ProvinceUpdateException
}
