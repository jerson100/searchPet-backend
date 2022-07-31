const {
    SchemaValidationError,
} = require("../utils/error");

const validateSchema = (schema, property = "body", errorCallback) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], {
            abortEarly: false,
            convert: true,
        });
        if (!error) {
            req[property] = { ...req[property], ...value };
            next();
        } else {
            const { details } = error;
            const message = details
                .map((i) => i.message)
                .join(", ")
                .trim();
            errorCallback && errorCallback(req);
            next(new SchemaValidationError(message));
        }
    };
};

module.exports = {validateSchema};