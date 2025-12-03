import jwt from 'jsonwebtoken'
import { User } from '../Model/User.Model.js'


const createTokenAndSaveCookiee = async (userId,res) =>{

    const token = jwt.sign({userId},process.env.SECRET_KEY,{
        expiresIn:"7d"
    })

    res.cookie("jwt",token,{
        httpOnly:true,
        secure:true,
        samesite:"strict"
    })

    await User.findByIdAndUpdate(userId,{token})
    return token;

}


export default createTokenAndSaveCookiee