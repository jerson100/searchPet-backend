class DepartamentCreationException extends Error{
    constructor(msg="No se pudo crear el departamento", status=400) {
        super(msg);
        this.status = status;
        this.name = "DepartamentCreationException"
    }
}

class DepartamentExistenceException extends Error{
    constructor(msg="Ya existe un departamento con el mismo nombre", status=400) {
        super(msg);
        this.status = status;
        this.name = "DepartamentExistenceException"
    }
}

class DepartamentNotFoundException extends Error{
    constructor(msg="No existe el departamento para el id especificado", status=404) {
        super(msg);
        this.status = status;
        this.name = "DepartamentNotFoundException"
    }
}

module.exports = {
    DepartamentCreationException,
    DepartamentExistenceException,
    DepartamentNotFoundException
}