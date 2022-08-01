const User = require("../models/User/user.model");
const {verifyToken} = require("../utils/token");
const { UnauthorizedUserException, TokenException, ForbiddenUserException} = require("../models/User/User.exception");

const verifyAccessToken = (typeuser) => {
    return async (req, res, next) => {
        const {authorization} = req.headers;
        if(!authorization){
            next(new UnauthorizedUserException("La solicitud no tiene el header 'Authorization'"));
            return;
        }
        if(!authorization.match(/^[B|b]earer .+$/)){
            next(new UnauthorizedUserException("El token no tiene el formato correcto"));
            return;
        }
        try{
            const token = verifyToken(authorization.slice(7));
            const us = await User.findById(token._id);
            if(us.status !== 1) {
                next(new UnauthorizedUserException());
                return;
            }
            if(typeUser && token.typeUser !== typeuser){
                next(new ForbiddenUserException());
                return;
            }
            req.user = token;
            next()
        }catch(e){
            next(new TokenException());
        }
    }
}

module.exports = {
    verifyAccessToken
}