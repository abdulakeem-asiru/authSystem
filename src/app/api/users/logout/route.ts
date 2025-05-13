import { NextResponse } from "next/server";

export async function GET(){
 try {
    const response = NextResponse.json({message :"Logout sucessful",
        success : true
    })
    response.cookies.set("token", "", {
        httpOnly:true
    });
    return response
 }catch (error: unknown) {
  if (error instanceof Error)
    return NextResponse.json({error : error.message},
        {status : 500}
    )
 }
}