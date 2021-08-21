import asyncHandler from "express-async-handler"
import Subject from "../models/subjectModels.js"

// @desc    Fetch all subjects
// @route   GET /api/subjects/
// @access  Public

export const getAllSubjects = asyncHandler(async (req, res) => {
    const subjects = await Subject.find({})
    res.send(subjects)
})


// @desc    Create a subject
// @route   POST /api/subject
// @access  Private/Admin

export const createSubject = asyncHandler(async (req, res) => {
    const { newSubject } = req.body
    const subject = new Subject({
        name: newSubject
    })
    const createdSubject = await subject.save()
    res.status(201).json(createdSubject)
})