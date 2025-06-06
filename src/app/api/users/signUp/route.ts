import { Connect } from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


await Connect()

export async function POST(request : NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email,password} = reqBody;

        //Check if user already exist
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json(
                {error : "User Already exist"}, 
                {status : 400})
        }
        
        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        //save user to db

        const newuser = new User({
            username : username,
            email : email,
            password : hashedPassword
        })

        const savedUser = await newuser.save();
        console.log(savedUser);
        return NextResponse.json({message : "User Created Successfully",
                success : true,
                savedUser
        },
            {status : 201}
        )

    }catch (error: unknown) {
  if (error instanceof Error)
        return NextResponse.json(
            {error : error.message },
            {status : 500}
        )
    }
}
