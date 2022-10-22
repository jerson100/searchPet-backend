const UserActivity = require("../models/UserActivity/UserActivity.model");

const create = async ({  user,userResource, doc, model, action} ) => {
    const newActivity = await new UserActivity({
         user, userResource, doc, model, action
     })
    await newActivity.save();
    return newActivity;
}

const getActivitiesByIdUser = async (idUser) => {
    const activities = await UserActivity.find({user: idUser, status: 1},{__v:0, updatedAt: 0, user: 0}).populate({
        path: "doc",
        select: "-__v -updatedAt -user -characteristics -urlImageProfile -images -dateOfBirth",
        strictPopulate: false,
        populate: {
            path: "lostPet",
            select: "-location -pets -images -updatedAt -__v",
            strictPopulate: false,
            populate: {
                path: "user",
                select: "-password -createdAt -updatedAt -__v -location -birthday  -typeUser -urlImageProfile -district",
                strictPopulate: false,
            }
        }
    }).sort({createdAt: -1})
    return activities;
}

module.exports = {
    create,
    getActivitiesByIdUser
}