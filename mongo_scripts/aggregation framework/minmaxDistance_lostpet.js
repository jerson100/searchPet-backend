db.lostpets.createIndex( { "location" : "2dsphere" } )

db.lostpets.getIndexes()

db.getCollection("lostpets").find();

db.getCollection("lostpets").find({
    located: true,
    location: {
        $near: {
           $geometry: {
              type: "Point" ,
              coordinates: [-77.2425888894319, -11.14638776538067]
           },
            $maxDistance: 7500
         }
     }
})
