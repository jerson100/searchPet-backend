db.getCollection("lostpets").aggregate(
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
);