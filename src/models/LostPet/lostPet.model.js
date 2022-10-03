const {Schema, model, Types} = require("mongoose");

const LostPetSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    pets: [
        {
            type: Schema.Types.ObjectId,
            ref: "Pet"
        }
    ],
    images: [String],
    location: {
        latitude: Number,
        longitude : Number
    },
    description: String,
    located: {
      type: Boolean,
      default: false
    },
    status: {
        type: Number,
        default: 1
    }
}, {timestamps:true})

LostPetSchema.statics.findLostPets = async ({_id, ...query}, pagination={page:1, length:1}) => {
    if(_id){ query._id = Types.ObjectId(_id); }
    const lostPets = await LostPet.aggregate(
      [
          {
              $match: query
          },
          {
              $lookup: {
                  from: "users",
                  let: {
                      idUser: "$user"
                  },
                  pipeline: [
                      {
                          $match: {
                              status: 1,
                              $expr: {
                                  $eq:  ["$_id", "$$idUser"]
                              }
                          }
                      }
                  ],
                  as: "user"
              }
          },
          {
              $unwind: {
                  path: "$user",
                  preserveNullAndEmptyArrays: false
              }
          },
          {
              $lookup: {
                  from: "pets",
                  let: {
                      idPets: "$pets",
                  },
                  pipeline: [
                      {
                          $match: {
                              status: 1,
                              $expr: {
                                  $in: ["$_id", "$$idPets"]
                              }
                          }
                      }
                  ],
                  as:"pets"
              }
          },
          {
              $skip: pagination.page > 0 ? (pagination.page - 1) * pagination.length : 0
          },
          {
              $limit: pagination.length
          },
          {
              $sort: {
                  createdAt: -1
              }
          },
          {
              $project: {
                  _id: 1,
                  createdAt: 1,
                  description: 1,
                  images: 1,
                  location: 1,
                  located: 1,
                  "pets._id": 1,
                  "pets.name": 1,
                  "pets.description": 1,
                  "pets.urlImageProfile": 1,
                  user: {
                      _id: 1,
                      name: 1,
                      username: 1,
                      email: 1,
                      location: 1
                  }
              }
          }
      ]
    )
    return pagination.length === 1 ? (lostPets.length === 1 ? lostPets[0] : lostPets) : lostPets;
};

const LostPet = model("LostPet", LostPetSchema);

module.exports = {
    LostPet
}