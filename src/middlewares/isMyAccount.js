const {ForbiddenUserException} = require("../models/User/User.exception");
const isMyAccount = (typeUsers) => (req, res, next) => {
    const {_id, typeUser} = req.user;
    const {idUser} = req.params;
    if(_id === idUser || typeUsers?.includes(typeUser)){
        next();
    }else{
        next(new ForbiddenUserException())
    }
}

module.exports = {
    isMyAccount
}