db.companies.aggregate([
    {$match: {"founded_year": 2004}},
    {
        $project: {
            _id: 0,
            name: 1,
            "funding_rounds.raised_amount": 1,
            size: {$size: "$funding_rounds"}
        }
    },
    {$match: {size: {$gte: 5}}},
    {$project: {name: 1, avg: {$avg: "$funding_rounds.raised_amount"}}},
    {$sort: {avg: 1}},

]);