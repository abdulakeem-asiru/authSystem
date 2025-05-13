import { Connect } from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"


await Connect();

export async function POST(request : NextRequest) {
interface TokenData {
  id: string;
  username: string;
  email: string;
}

    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;

        //check if user is registered
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message : "Email not registered"},
                {status : 400})
            }
        //Check Password    
        const validPassword = await bcryptjs.compare(password, user.password) 
        if (!validPassword){
            return NextResponse.json({message : "Invalid credentials"},
                {status : 400});
        }
        // Create Token Data
        const tokenData : TokenData  = {
            id : user._id,
            username : user.username,
            email : user.email
        }

        //Create Token
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY as string, {expiresIn : "1h"})
        console.log(token)

        const response = NextResponse.json({
            message : "Login Successful",
            success : true
        })
        response.cookies.set("token", token,
            {httpOnly : true }
        )
        return response

    }catch (error: unknown) {
  if (error instanceof Error)
        return NextResponse.json({error : error.message},
            {status : 500}
        )
    }
}