const User = require("../models/User/user.model");
const {verifyToken} = require("../utils/token");
const { UnauthorizedUserException, TokenException, ForbiddenUserException} = require("../models/User/User.exception");

const verifyAccessToken = (typeUser, codeStatus) => {
    return async (req, res, next) => {
        const {authorization} = req.headers;
        if(!authorization){
            next(new TokenException("La solicitud no tiene el header 'Authorization'", 400));
            return;
        }
        if(!authorization.match(/^[B|b]earer .+$/)){
            next(new TokenException("El token no tiene el formato correcto", 400));
            return;
        }
        try{
            const token = verifyToken(authorization.slice(7));
            const us = await User.findById(token._id);
            if(us.status !== 1) {
                next(new UnauthorizedUserException("El usuario no se encuentra activo o no existe"));
                return;
            }
            if( typeUser && token.typeUser !== typeUser){
                next(new ForbiddenUserException());
                return;
            }
            req.user = token;
            next()
        }catch(e){
            next(new TokenException("El token no es válido",codeStatus || 401));
        }
    }
}

module.exports = {
    verifyAccessToken
}