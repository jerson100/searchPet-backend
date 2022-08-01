const User = require("../models/User/user.model");
const {NotFoundUserException} = require("../models/User/User.exception");
// const {verifyAccessToken} = require("./verifyAccessToken");
// const {isMyAccount} = require("./isMyAccount");

const isUserExists = async (req, res, next) => {
    const us = await User.findOne({_id: req.params.idUser});
    console.log(us)
    if (us && us.status) {
        next();
    } else {
        next(new NotFoundUserException());
    }
};

module.exports = {
    isUserExists
}
