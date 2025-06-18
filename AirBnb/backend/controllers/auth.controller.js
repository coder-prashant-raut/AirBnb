import getToken from '../config/token.js'
import User from '../model/user.model.js'
import bcrypt from 'bcryptjs'

export const signUp = async (req,res) =>{
    try { 
        let {name, email, password} = req.body
        let existUser =  await User.findOne({email})
        if(existUser){
            return res.status(400).json({message: "User is already exist"})
        }
        let hashPassword = await bcrypt.hash(password, 10)
        let user = await User.create({name, email, password:hashPassword})

        let token = await getToken(user._id)
        res.cookie("token", token,{
            httpOnly: true,
            secure:process.env.NODE_ENVIRONMENT = "production",
            sameSite : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000

        })

        return res.status(201).json(user)


    } catch (error) {
        return res.status(500).json({message:`signUp error ${error}`})
    }
}
 
export const login = async (req,res) => {
  try {
    let {email, password} = req.body
    let user = await User.findOne({email})
    if(!user){
        return res.status(400).json({message : 'user not exist'})
    }
    let isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(400).json({message:"incorrect Password"})
    }
    let token = await getToken(user._id)
    res.cookie("token", token,{
        httpOnly:true,
        secure:process.env.NODE_ENVIRONMENT = "production",
        sameSite: 'strict',
        mazAge: 7 * 24 * 60 * 60 * 1000
    })
     
    return res.status(200).json(user)

  } catch (error) {
    return res.status(500).json({message: `login error ${error}`})
  }
}
 export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,        // Set to true in production (HTTPS)
      sameSite: "None",    // "None" if using cross-origin requests (e.g. frontend at :5173, backend at :5000)
    });

    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Logout error: ${error.message}` });
  }
}
