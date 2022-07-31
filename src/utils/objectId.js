const validateObjectId = (id) => {
    return typeof id === "string" && id.match(/^[a-fA-F0-9]{24}$/);
};

module.exports = validateObjectId;