const {ForbiddenUserException, NotFoundUserException} = require("../models/User/User.exception");
const User = require("../models/User/user.model");

const accessUserCrud = (typeUsers) => async (req, res, next) => {
    const {_id, typeUser} = req.user;
    const {idUser} = req.params;
    const us = await User.findOne({_id: idUser});

    if (!us || !us.status) {
        next(new NotFoundUserException());
        return;
    }

    if(typeUsers?.includes(typeUser)){
        next();
        return;
    }

    if(_id != idUser) {
        next(new ForbiddenUserException());
        return;
    }

    next();

}

module.exports = {
    accessUserCrud
}