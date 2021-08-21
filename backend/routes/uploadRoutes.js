import express from "express"
import {profilePhotoUpload, documentsUpload} from "../controllers/uploadControllers.js"

const router = express.Router()

router.post('/profilephoto', profilePhotoUpload.single('image'), (req, res)=>{
    res.send(`/${req.file.path}`)
})

router.post('/', documentsUpload.single('document'), (req, res)=>{
    res.send(`/${req.file.path}`)
})

export default router