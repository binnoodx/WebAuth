import { NextRequest, NextResponse } from "next/server";
import User from "@/app/model/userSchema";
import { dbConnect } from "@/app/connect/dbConnect";

export async function POST(req:NextRequest) {

    await dbConnect()

    try {

        const data = await req.json()
        const userEmail = data.userEmail
        const userPassword = data.userPassword
        const searchUser = await User.findOne({userEmail})


        if(!searchUser){
            return NextResponse.json({
                message:"No such User Found!"
            })
        }
        else{
            const searchUserPass = searchUser.userPassword
            if(searchUserPass === userPassword){
                return NextResponse.json({
                    message:"successfully Login!"
                })
            }
            else{
                return NextResponse.json({
                    message:"Invalid Password"
                })
            }
        }

        
  
    } catch (error) {

        console.log("Error in User Login")       
    }    
}