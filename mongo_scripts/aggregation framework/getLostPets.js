db.lostpets.aggregate(
    [
        {
            $match: {
                status: 1
            }
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
            $skip: 0
        },
        {
            $limit: 10
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