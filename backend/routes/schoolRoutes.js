import express from "express"
const router = express.Router()
//import controllers
import {
    getSchoolsByProgramme,
    getSchoolsById,
    getAllSchools,
    createSchool,
    updateSchool,
    deleteCourse
} from "../controllers/schoolControllers.js"
import { protect, managers, admin } from "../middlewares/authMiddleware.js"

router.route("/").get(getAllSchools)
    .post(protect, managers, createSchool)

router.get('/programme/:programme', getSchoolsByProgramme)
router.route('/:id')
    .get(getSchoolsById)
    .put(protect, managers, updateSchool)
router.route('/:id/course').put(deleteCourse)
export default router