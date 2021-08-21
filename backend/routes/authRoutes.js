import express from "express"
const router = express.Router()
//import controllers
import {
    registerUsers,
    loginUsers,
    activateAccount,
    forgotPassword,
    resetPassword,
    resendEmail,
} from "../controllers/localAuthControllers.js"

import {
    updateUserProfile,
    debitWallet,
    creditWallet,
    getAllUsers,
    getUser,
    deleteUser,
    makeAdmin,
    makeEditor,
    emailAUser,
    emailAllUsers,
    addProfilePhoto,
    emailAUserByEmail,
    getWalletAmount
} from "../controllers/userControllers.js"
import { facebooklogin } from "../controllers/facebookAuthControllers.js"
import { protect, admin, managers } from "../middlewares/authMiddleware.js"
import { profilePhotoMemoryUpload } from "../controllers/uploadControllers.js"

router.post('/register', registerUsers)
router.post('/login', loginUsers)
router.post('/facebooklogin', facebooklogin)
router.route('/emailconfirmation/').put(activateAccount)
router.route('/forgotpassword/').put(forgotPassword)
router.route('/resetpassword/').put(resetPassword)
router.route('/resendemail/').patch(resendEmail)
router.route('/profile/update').put(protect, updateUserProfile)
router.route('/wallet/amount').get(protect, getWalletAmount)
router.route('/wallet/credit/').put(protect, creditWallet)
router.route('/wallet/debit/').put(protect, debitWallet)
router.route('/').get(protect, managers, getAllUsers)
router.route('/:id').get(getUser).delete(protect, admin, deleteUser)
router.route('/makeadmin/:id').put(protect, admin, makeAdmin)
router.route('/makeeditor/:id').put(protect, admin, makeEditor)
router.route('/:id/email').post(protect, managers, emailAUser)
router.route('/email').post(protect, managers, emailAllUsers)
router.route('/email/:email').post(protect, managers, emailAUserByEmail)

router.route('/:id/profilephoto')
    .put(protect, profilePhotoMemoryUpload.single('image'),
        addProfilePhoto)



export default router