import { Connect } from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


await Connect();

export async function POST(request : NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;

        //check if user is registered
        const user = await User.findOne({email})
        const validPassword = await bcryptjs.compare(password, user.password) 
        if(user && validPassword){
            console.log("Login")
        }else{
            return NextResponse.json({message : "Email not registered"},
                {status : 400}
            )
        }
    }catch (error : any){
        return NextResponse.json({error : error.message},
            {status : 500}
        )
    }
}