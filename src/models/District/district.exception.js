class DistrictCreationException extends Error{
    constructor(msg="No se pudo crear el distrito", status=400) {
        super(msg);
        this.status = status;
        this.name = "DistrictCreationException"
    }
}

class DistrictExistenceException extends Error{
    constructor(msg="Ya existe un distrito con el mismo nombre", status=400) {
        super(msg);
        this.status = status;
        this.name = "DistrictExistenceException"
    }
}

class DistrictNotFoundException extends Error{
    constructor(msg="No existe el distrito para el id especificado", status=404) {
        super(msg);
        this.status = status;
        this.name = "DistrictNotFoundException"
    }
}

class DistrictUpdateException extends Error{
    constructor(msg="No se pudo actualizar el distrito ", status=400) {
        super(msg);
        this.status = status;
        this.name = "DistrictUpdateException"
    }
}

module.exports = {
    DistrictCreationException,
    DistrictExistenceException,
    DistrictNotFoundException,
    DistrictUpdateException
}
