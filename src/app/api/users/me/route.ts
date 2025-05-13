import { getUserToken } from "@/helpers/getUserToken";
import { Connect } from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server"; 


await Connect();

export async function GET(request : NextRequest) {
    try {
       const userId = await  getUserToken(request)
       const user = await User.findOne({_id : userId}).
       select("-password");
       return NextResponse.json({message : "User found",
        data : user
       })
    } catch (error: unknown) {
  if (error instanceof Error)
        return NextResponse.json({error : error.message},
            {status : 500}
        )
    }
}