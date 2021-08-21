import User from "../models/userModels.js"
import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"
import fetch from "node-fetch"




export const facebooklogin = asyncHandler(async (req, res) => {
    const { userID, accessToken } = req.body

    let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email,picture.type(large)&access_token=${accessToken}`

    fetch(urlGraphFacebook, { method: 'GET' })
        .then(response => response.json())
        .then(response => {
            const { name, email, picture } = response
            const image = picture.data.url
            const profile = { picture: image }

            User.findOne({ email }).exec((err, user) => {

                if (err) {
                    res.status(400)
                    throw new Error("Something went wrong")
                }

                if (user) {
                    //if user exists, login user
                    loginFacebookUser(res, user)
                } else {
                    //if user does not exist, add it to database

                    registerFacebookUser(res, name, email, profile)

                }

            })
        })

})


const registerFacebookUser = async (res, name, email, profile) => {
    let password = email + process.env.JWT_SECRET;
    const type = 'facebook'
    const confirmed = true
    let newUser = await User.create({ name, email, password, type, confirmed, profile })

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            type: newUser.type,
            confirmed: newUser.confirmed,
            isAdmin: newUser.isAdmin,
            isEditor: newUser.isEditor,
            token: generateToken(newUser._id),
            wallet: newUser.wallet,
            profile: newUser.profile
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
}

const loginFacebookUser = (res, user) => {
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
        isAdmin: user.isAdmin,
        isEditor: user.isEditor,
        token: generateToken(user._id),
        wallet: user.wallet,
        profile: user.profile
    })
}









