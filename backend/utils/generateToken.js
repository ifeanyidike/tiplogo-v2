import jwt from 'jsonwebtoken'

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '7d'})
}

export const generateShortToken = (id, key, time) =>{
    return jwt.sign({id}, key, {expiresIn: time})
}


export default generateToken