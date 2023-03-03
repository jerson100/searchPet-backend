const {
  LostPetComment,
} = require("../models/LostPetComent/LostPetComent.model");
const { LostPet } = require("../models/LostPet/lostPet.model");
const {
  NotFoundLostPetException,
} = require("../models/LostPet/lostPet.exception");
const { Types } = require("mongoose");
const {
  NotFoundLostPetCommentException,
} = require("../models/LostPetComent/LostPetComment.exception");
// const NotificationService = require("./notificationService");
// const { NOTIFICATIONS } = require("../utils/consts");

const create = async (
  idUser,
  username,
  { lostPet: lostPetId, locations, ...rest }
) => {
  const lostPet = await LostPet.findLostPets({ _id: lostPetId });
  if (!lostPet)
    throw new NotFoundLostPetException(
      "El registro de la mascota perdida con el id especificado(lostPet) no existe."
    );
  const newLostPetComment = await new LostPetComment({
    lostPet: lostPetId,
    user: idUser,
    locations: locations?.map((l) => ({
      type: "Point",
      coordinates: [l[1], l[0]],
    })),
    ...rest,
  });
  await newLostPetComment.save();
  //   await NotificationService.create({
  //     from: idUser,
  //     to: lostPet.user,
  //     type: NOTIFICATIONS.LOST_PET_COMMENT,
  //     content: `${username} comentó tu publicación: "${newLostPetComment.description}"`,
  //     path: `/pets/lost/${lostPetId}`,
  //     seen: false,
  //   });
  delete newLostPetComment._doc.status;
  return newLostPetComment;
};

const getAll = async () => {
  const lostPetComments = await LostPetComment.find({
    status: 1,
  });
  return lostPetComments;
};

const getById = async (idLostPetComment) => {
  const lostPetComment = await LostPetComment.findOne({
    _id: Types.ObjectId(idLostPetComment),
    status: 1,
  });
  if (!lostPetComment) {
    throw new NotFoundLostPetCommentException();
  }
  return lostPetComment;
};

const deleteOne = async (idComment, comment) => {
  if (!comment)
    throw new NotFoundLostPetCommentException("El comentario no existe");
  const lostPet = await LostPet.findLostPets({
    _id: comment.lostPet,
    status: 1,
  });
  if (!lostPet)
    throw new NotFoundLostPetCommentException("El comentario no existe");
  await LostPetComment.findOneAndUpdate(
    {
      _id: idComment,
    },
    {
      $set: {
        status: 0,
      },
    }
  );
};

module.exports = {
  create,
  getAll,
  getById,
  deleteOne,
};
