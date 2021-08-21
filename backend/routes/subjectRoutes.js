import express from "express"
const router = express.Router()
//import controllers
import {
    getAllSubjects,
    createSubject,
} from "../controllers/subjectController.js"
import { protect, admin, managers } from "../middlewares/authMiddleware.js"

router.route("/").get(getAllSubjects)
    .post(protect, managers, createSubject)

export default router