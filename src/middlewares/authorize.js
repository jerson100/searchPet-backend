const {ForbiddenUserException, MyResourceNoTFoundException} = require("../models/User/User.exception");

const authorizeTypeUser = (typeUsers) => async (req, res, next) => {
    const {typeUser} = req.user;
    if(!typeUsers) {
        next();
        return;
    }
    if(typeUsers?.includes(typeUser)){
        next();
    }else{
        next(new ForbiddenUserException());
    }
}

const authorizeMyResource = (Schema, paramName, exceptTypeUsers, queryName="_id", path = "params", newRequestPropertyName) => async (req, res, next) => {
    const value = req[path][paramName];
    const { _id : idUser, typeUser } = req.user;
    const data = await Schema.findOne({_id: value, status: 1});
    if(data) {
        if( exceptTypeUsers?.includes(typeUser) || (data[queryName] && data[queryName]?.toString() === idUser)){
            if(newRequestPropertyName){
                req[newRequestPropertyName] = data;
            }
            next();
        }else{
            next(new ForbiddenUserException());
        }
    }else{
        next(new MyResourceNoTFoundException());
    }
}

module.exports = {
    authorizeTypeUser,
    authorizeMyResource
}