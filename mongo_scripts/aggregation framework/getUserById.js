db.getCollection("users").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $match: {
                status: 1,
                _id: ObjectId("62e915377cd264f35dee6048")
            }
        },

        // Stage 2
        {
            $lookup: // Equality Match
            {
                from: "districts",
                let: {
                    idDistrict: "$district"
                },
                pipeline: [
                    {
                        $match: {
                           $expr: {
                                $eq: ["$_id","$$idDistrict"],
                           },
                           status: 1 
                        },
                    },
                    {
                        $project: {
                            "name": 1,
                            "province":1
                        }
                    }
                ],
                as: "district"
            }

        },

        // Stage 3
        {
            $unwind: {
                path: "$district",
                preserveNullAndEmptyArrays: true // optional
            }
        },

        // Stage 4
        {
            $project: {
                password:0,
                status: 0
            }
        }
    ],

    // Options
    {

    }

);