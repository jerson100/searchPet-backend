db.getCollection("users").aggregate(
    [
        {
            $match: {
                status: 1,
                _id: ObjectId("62e73ad6476259f059f71cf1")
            }
        },
        {
            $lookup:
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
        {
            $unwind: {
                path: "$idDistrict",
                preserveNullAndEmptyArrays: true
            }
        }
    ],
    {

    }
);