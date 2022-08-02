db.getCollection("users").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $match: {
                status: 1,
                
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
                as: "idDistrict"
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
                path: "$idDistrict",
                preserveNullAndEmptyArrays: true // optional
            }
        },

        // Stage 4
        {
            $project: {
                "password":0
            }
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);