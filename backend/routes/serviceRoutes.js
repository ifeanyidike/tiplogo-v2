import express from "express"
const router = express.Router()
//import controllers
import {
    getAllServices,
    getServicesByName,
    getServicesById,
    createService,
    updateService,
} from "../controllers/serviceControllers.js"
import { protect, admin, managers } from "../middlewares/authMiddleware.js"

router.route("/").get(getAllServices)
    .post(protect, managers, createService)

router.get('/name/:name', getServicesByName)
router.route("/:id")
    .get(getServicesById)
    .put(protect, managers, updateService)

export default router