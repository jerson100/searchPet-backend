const {Schema, model} = require("mongoose");

const PetSchema  = new Schema({
   name: String,
   user: {
      type: Schema.Types.ObjectId,
      ref:"User",
   },
   breed: {
      type: Schema.Types.ObjectId,
      ref: "Breed",
   },
   urlImageProfile: String,
   description: String,
   images: [String],
   dateOfBirth: Date,
   characteristics: {
      size:  String,
      eyeColor: String,
      hairColor: String
   },
   status: {
      type: Number,
      default: 1
   },
},{timestamps: true});

PetSchema.statics.findPets = async function ({ query={}, typepet, length = 1, page = 1} ){
   const stages = [
      {
         $match: query
      },
      {
         $lookup:
             {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
             }
      },
      {
         $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true
         }
      },
      {
         $match: {
            "user.status": 1
         }
      },
      {
         $lookup:
             {
                from: "breeds",
                let: {
                   idBreed: "$breed"
                },
                pipeline: [
                   {
                      $match: {
                         $expr:  {
                            $eq: ["$_id", "$$idBreed"]
                         },
                         status: 1
                      },
                   },
                   {
                      $lookup:{
                         from: "typepets",
                         let: {
                            idTypePet: "$typePet"
                         },
                         pipeline: [
                            {
                               $match: {
                                  $expr: {
                                     $eq: ["$_id","$$idTypePet"]
                                  },
                                  status:1
                               }
                            }
                         ],
                         as: "typePet"
                      }
                   },
                   {
                      $unwind: {
                         path: "$typePet",
                         preserveNullAndEmptyArrays: false,
                      }
                   }
                ],
                as: "breed"
             }
      },
      {
         $unwind: {
            path: "$breed",
            preserveNullAndEmptyArrays: true,
         }
      },
      {
         $skip: ((page > 0) ? page - 1 : 0) * length
      },
      {
         $limit: length
      },
      {
         $project: {
            status: 0,
            "breed.status": 0,
            "breed.typePet.status": 0,
            "user.status": 0,
            "user.password": 0,
            "user.birthday": 0,
            "user.location": 0,
            "user.district": 0,
            "user.typeUser": 0,
            "user.createdAt": 0,
            "user.updatedAt": 0
         }
      },

   ];
   if(typepet){
      stages.splice(6, 0, {
         $match: {
            "breed.typePet.type": typepet
         }
      })
   }
   const pets = await Pet.aggregate(stages);
   return pets;
}

const Pet = model("Pet", PetSchema);

module.exports = {
   Pet
}