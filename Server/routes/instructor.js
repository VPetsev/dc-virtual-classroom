const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const models = require("../models")

const SALT_ROUNDS = 10

// implementing partials for each folder? Have to set mustachexpress engine route to include this folder's partials



router.get("/instructor-dash", async (req, res) => {
    const quiz = await models.Quiz.findAll()
    const quizValues = quiz.map((ele) => ele.dataValues)
    
    res.render("instructor/instructor-dash", { quizzes: quizValues })
})
router.get("/instructor-courses", (req, res) => {
    res.render("instructor/instructor-courses")
})

router.get("/instructor-quizzes", async (req, res) => {
    const quiz = await models.Quiz.findAll()
    const quizValues = quiz.map((ele) => ele.dataValues)

    res.render("instructor/instructor-quizzes", { quizzes: quizValues })
})

router.get("/instructor-quizzes/:id", async (req, res) => {
    const quizId = req.params.id
    const quiz = await models.Quiz.findOne({
        where: {
            id: quizId
        }
    })

    res.render("instructor/instructor-quiz", quiz.dataValues)
})

router.get("/instructor-edit-course", (req, res) => {
    res.render("instructor/instructor-edit-course")
})

// EDIT quiz functionality
router.get("/instructor-edit-quiz/:id", async (req, res) => {
    const quizId = req.params.id
    const quiz = await models.Quiz.findOne({
        where: {
            id: quizId
        }
    })

    res.render("instructor/instructor-edit-quiz", quiz.dataValues)
})

router.post("/update-quiz-answer/:id", async (req, res) => {
    const quizId = req.params.id
    const correctAnswer = req.body.correctAnswer
    
    const updatedQuiz = await models.Quiz.update({
        correct: correctAnswer
    }, {
        where: {
            id: quizId
        }
    })

    res.redirect(`/instructor/instructor-edit-quiz/${quizId}`)
})

router.post("/update-title-name/:id", async (req, res) => {
    const quizId = req.params.id
    const quizName = req.body.quizName
    const updatedQuizName = await models.Quiz.update({
        question: quizName
    }, {
        where: {
            id: quizId
        }
    })

    res.redirect(`/instructor/instructor-edit-quiz/${quizId}`)
})

// Create Quiz
router.get("/instructor-create-quiz", async (req, res) => {
    const myUsers = await models.User.findAll()
    const userIds = myUsers.map((ele) => ele.dataValues.username)
    res.render("instructor/instructor-create-quiz", userIds)
})

router.post("/instructor-create-quiz", async (req, res) => {
    // grab these once
    const quizTitle = req.body.quizTitle
    const sessionId = req.session.user
    const emailAdd = req.body.emailAdd
    const userObject = await models.User.findAll({
        where: {
            username: emailAdd
        }
    })

    const userId = userObject.dataValues

    // Question 1
    const questionField1 = req.body.questionField1
    const choiceA1 = req.body.choiceA1
    const choiceB1 = req.body.choiceB1
    const choiceC1 = req.body.choiceC1
    const choiceD1 = req.body.choiceD1
    const correctAnswer1 = req.body.correctAnswer1

    console.log(questionField1)

    models.Quiz.build({
        choice1: choiceA1,
        choice2: choiceB1,
        choice3: choiceC1,
        choice4: choiceD1,
        correct: correctAnswer1,
        question: questionField1,
        quizName: quizTitle,
        assignedTo: userId
    })

    // Question 2
    const questionField2 = req.body.questionField2
    const choiceA2 = req.body.choiceA2
    const choiceB2 = req.body.choiceB2
    const choiceC2 = req.body.choiceC2
    const choiceD2 = req.body.choiceD2
    const correctAnswer2 = req.body.correctAnswer2

    models.Quiz.build({
        choice1: choiceA2,
        choice2: choiceB2,
        choice3: choiceC2,
        choice4: choiceD2,
        correct: correctAnswer2,
        question: questionField2,
        quizName: quizTitle,
        assignedTo: userId
    })

    // Question 3
    const questionField3 = req.body.questionField3
    const choiceA3 = req.body.choiceA3
    const choiceB3 = req.body.choiceB3
    const choiceC3 = req.body.choiceC3
    const choiceD3 = req.body.choiceD3
    const correctAnswer3 = req.body.correctAnswer3

    models.Quiz.build({
        choice1: choiceA3,
        choice2: choiceB3,
        choice3: choiceC3,
        choice4: choiceD3,
        correct: correctAnswer3,
        quizName: quizTitle,
        question: questionField3,
        assignedTo: userId
    })

    // Question 4
    const questionField4 = req.body.questionField4
    const choiceA4 = req.body.choiceA4
    const choiceB4 = req.body.choiceB4
    const choiceC4 = req.body.choiceC4
    const choiceD4 = req.body.choiceD4
    const correctAnswer4 = req.body.correctAnswer4

    models.Quiz.build({
        choice1: choiceA4,
        choice2: choiceB4,
        choice3: choiceC4,
        choice4: choiceD4,
        correct: correctAnswer4,
        quizName: quizTitle,
        question: questionField4,
        assignedTo: userId
    })

    // Question 5
    const questionField5 = req.body.questionField5
    const choiceA5 = req.body.choiceA5
    const choiceB5 = req.body.choiceB5
    const choiceC5 = req.body.choiceC5
    const choiceD5 = req.body.choiceD5
    const correctAnswer5 = req.body.correctAnswer5

    models.Quiz.build({
        choice1: choiceA5,
        choice2: choiceB5,
        choice3: choiceC5,
        choice4: choiceD5,
        correct: correctAnswer5,
        question: questionField5,
        quizName: quizTitle,
        question: questionField5,
        assignedTo: userId
    })
    res.redirect("/instructor/instructor-dash")
})


module.exports = router