db.getCollection("users").aggregate(

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
                from: "districts",
                let: {
                    idDistrict: "$idDistrict"
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
                            "idProvince":1
                        }
                    }
                ],
                as: "idDistrict"
            }

        },

        // Stage 3
        {
            $unwind: {
                path: "$idDistrict",
                preserveNullAndEmptyArrays: true
            }
        }
    ],

    // Options
    {

    }

);