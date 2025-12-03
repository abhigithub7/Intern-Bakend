import createTokenAndSaveCookiee from '../jwt/AuthToken.js';
import {User} from '../Model/User.Model.js'
import bcrypt from 'bcrypt'

export const Register = async (req, res) => {

    try {

        const {firstName, lastName, email, password} = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All fileds ar required !" })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: "User Already registered !" })

        }
        
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            firstName,
            lastName,
            email,
            password:hashedPassword
        })

        await newUser.save()

        if (newUser) {
          const token = await createTokenAndSaveCookiee(newUser._id,res)
            return res.status(200).json({ message: "User Registered Succesfully !" ,newUser,token:token})

        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error !" })


    }


}


export const Login = async (req,res) =>{
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fileds ar required !" })
        }

        const user = await User.findOne({email}).select("+password")
        if(!user.password){
        return res.status(400).json({ message: "User password is missing !" })
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!user || !isMatch){
         return res.status(400).json({ message: "Invalid credientals !" })
   
        }

        const token = await createTokenAndSaveCookiee(user._id,res)

        res.status(200).json({message:"Login successfully.",user:{
            _id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
        },token:token})


    } catch (error) {
        console.log("Internal server error",error)

    return res.status(400).json({ message: "Internal server error !" })

    }
}



export const getUser = async (req,res) =>{
  try {
    const users = await User.find({})
    return res.status(200).json(users)
  } catch (error) {
    console.error(" user error:", error.message);
    return res.status(500).json({
      message: error.message || "Internal server error"
    });
    
    
  }
}