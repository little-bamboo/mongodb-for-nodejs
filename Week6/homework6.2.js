/*
Your task is to calculate the class with the best average student performance. This involves calculating an average for
each student in each class of all non-quiz assessments and then averaging those numbers to get a class average. To be
clear, each student's average should include only exams and homework grades. Don't include their quiz scores in the
 calculation.

What is the class_id which has the highest average student performance? Choose the correct class_id below.


project student homework and exams
build avg per class
sort by avg desc

{
    "_id" : ObjectId("50b59cd75bed76f46522c392"),
    "student_id" : 10,
    "class_id" : 5,
    "scores" : [
        {
            "type" : "exam",
            "score" : 69.17634380939022
        },
        {
            "type" : "quiz",
            "score" : 61.20182926719762
        },
        {
            "type" : "homework",
            "score" : 73.3293624199466
        }

*/

db.grades.aggregate([
    {$project: {student_id:1, class_id:1, scores:1}},
    {$unwind: "$scores"},
    {$match: {"scores.type": { $ne: "quiz"}}},
    {$group: {
        _id: "$class_id",
            avg: {$avg: "$scores.score"}
        }}
])

