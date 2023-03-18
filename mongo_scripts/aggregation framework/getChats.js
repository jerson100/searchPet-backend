db.getCollection("chats").aggregate(
    [
        { 
            $match: { users:{ $all: [ ObjectId('631e76c95621e98cd9458906') ] }}
        },
        {
            $lookup: {
                from: "users",
                localField: "users",
                foreignField: "_id",
                as:"users"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "admin",
                foreignField: "_id",
                as:"admin"
            }
        },
        {
            $unwind: {
                path: "$admin"
            }
        },
        {
            $project: {
                "users.password":0,
                "users.password":0,
                "users.birthday":0,
                "users.accountType":0,
                "users.district":0,
                "users.location":0,
                "users.address":0,
                "users.status":0,
                "admin.password":0,
                "admin.password":0,
                "admin.birthday":0,
                "admin.accountType":0,
                "admin.district":0,
                "admin.location":0,
                "admin.address":0,
                "admin.status":0
            }
        },
        {
            $addFields: {
                urlImageProfile: {
                    $cond: {
                        if: {
                           $eq: ["$type", "private"]
                        },
                        then: {
                            $reduce: {
                                input: "$users",
                                initialValue: "",
                                in: {
                                    $cond: {
                                        if: {
                                            $ne: ["$$this._id", ObjectId('631e76c95621e98cd9458906')]
                                        },
                                        then: "$$this.urlImageProfile", 
                                        else: "$$value"
                                    }
                                }
                            }
                        },
                        else: "$urlImageProfile"
                    }
                },
                name: {
                    $cond: {
                        if: {
                            $eq: ["$type", "private"]
                        },
                        then: {
                            $reduce: {
                               input: "$users",
                               initialValue: "",
                               in: { 
                                   $cond: {
                                       if: {
                                           $ne: ["$$this._id", ObjectId('631e76c95621e98cd9458906')]
                                       },
                                       then: "$$this.username",
                                       else: "$$value"
                                   }
                               }
                             }
                        },
                        else: "$name"
                    }
                }
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $skip: 0
        },
        {
            $limit: 5
        }
    ]
)
