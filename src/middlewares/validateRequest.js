const validateRequest = (cb) => {
    return async (req, res, next) => {
        try{
            await cb(req, res);
            next();
        }catch(e){
            console.log(e)
            next(e);
        }
    }
};

module.exports = {validateRequest}