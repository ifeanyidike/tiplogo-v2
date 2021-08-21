import express from "express"
const router = express.Router()

import {
    createContact,
    getContactById,
    getContactByEmail,
    getAllContacts,
    deleteContact,
} from "../controllers/contactControllers.js"

import { protect, admin, managers } from "../middlewares/authMiddleware.js"

router.route("/").post(createContact)
    .get(protect, managers, getAllContacts)

router.route("/:id")
    .get(protect, managers, getContactById)
    .delete(protect, admin, deleteContact)

router.route("/byemail/:email").get(protect, managers, getContactByEmail)

export default router