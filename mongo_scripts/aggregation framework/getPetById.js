db.getCollection("pets").aggregate(
    [
        {
            $match: {
                "_id" : ObjectId("630851f92e55d925487b22f8"),
                "status": 1
            }
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
        }
    ],
    {

    }
);