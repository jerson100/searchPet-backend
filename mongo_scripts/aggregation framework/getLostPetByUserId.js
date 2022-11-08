db.getCollection("lostpets").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $match: {
                status: 1
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
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", "$$idUser"]
                            },
                            status: 1
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
            $match: {
                "user._id": ObjectId("62f5bfd224081df2c4f05a0d")
            }
        },

        // Stage 5
        {
            $lookup: {
                from: "pets",
                localField: "pets",
                foreignField: "_id",
                as: "pets"
            }
        },

        // Stage 6
        {
            $project: {
                "user": {
                    _id: "$user._id",
                    name: "$user.name",
                    paternalSurname: "$user.paternalSurname",
                    maternalSurname: "$user.maternalSurname",
                    username: "$user.username",
                    email:"$user.email",
                    status: "$user.status",
                    typeUser:"$user.typeUser",
                    urlImageProfile: "$user.urlImageProfile"
                },
                pets: {
                    $filter: {
                        input: "$pets",
                        as: "pet",
                        cond: {
                            $eq: ["$$pet.status", 1]
                        }
                    }
                },
                images: 1,
                description: 1,
                located: 1,
                createdAt: 1
            }
        },

        // Stage 7
        {
            $match: {
                $expr: {
                    $gte: [
                        {
                            $size: "$pets"
                        }, 
                        1
                    ]
                }
            }
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);