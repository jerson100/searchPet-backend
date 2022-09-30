db.getCollection("pets").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $match: {
                status: 1,
                user: ObjectId("62f5bfd224081df2c4f05a0d"),
                breed: {
                    $in: [
                        ObjectId("6306e1313fa15b30ce15eff9"),
                        ObjectId("631e71c58390f37c8b9e617a"),
                        ObjectId("631e71c58390f37c8b9e616a")
                    ]
                }
            }
        },

        // Stage 2
        {
            $lookup: // Equality Match
            {
                from: "users",
                let: {
                    idUser: "$user"
                },
                pipeline:  [
                    {
                        $match: {
                            $expr: {
                                $eq: [
                                    "$_id",
                                    "$$idUser"
                                ]
                            },
                            status: 1
                        }
                    },
                    {
                        $project: {
                            "_id": 1,
                            "name": 1,
                            "paternalSurname" : 1,
                            "maternalSurname" : 1,
                            "username":1,
                            "email":1,
                            "location":1,
                            "typeUser":1
                        }
                    }
                ],
                as: "user"
            }
            
            // Uncorrelated Subqueries
            // (supported as of MongoDB 3.6)
            // {
            //    from: "<collection to join>",
            //    let: { <var_1>: <expression>, …, <var_n>: <expression> },
            //    pipeline: [ <pipeline to execute on the collection to join> ],
            //    as: "<output array field>"
            // }
        },

        // Stage 3
        {
            $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: false
            }
        },

        // Stage 4
        {
            $lookup: // Equality Match
            {
                from: "breeds",
                let: {
                    breed: "$breed",
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: [
                                    "$$breed", 
                                    "$_id"
                                ],
            
                            },
                           "status": 1
                        }
                    },
                    {
                        $lookup: {
                            from: "typepets",
                            let: {
                                typePet: "$typePet"
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: [
                                                "$_id",
                                                "$$typePet"
                                            ]
                                        },
                                        status: 1
                                    }
                                }
                            ],
                            as: "typePet"
                        }
                    },
                    {
                        $unwind: {
                            path: "$typePet",
                            preserveNullAndEmptyArrays: false
                        }
                    }
                ],
                as: "breed"
            }
            
            // Uncorrelated Subqueries
            // (supported as of MongoDB 3.6)
            // {
            //    from: "<collection to join>",
            //    let: { <var_1>: <expression>, …, <var_n>: <expression> },
            //    pipeline: [ <pipeline to execute on the collection to join> ],
            //    as: "<output array field>"
            // }
        },

        // Stage 5
        {
            $unwind: {
                
                path: "$breed",
                preserveNullAndEmptyArrays: true
            }
        },

        // Stage 6
        {
            $project: {
               "_id": 1,
               "name": 1,
               "user":1,
               "breed": {
                   "_id": "$breed._id",
                   "name": "$breed.name",
                   "descripion": "$breed.description"
               },
               "description":1,
               "createdAt":1,
               "updatedAt":1,
               "urlImageProfile":1
            }
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);