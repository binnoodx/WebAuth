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

                message:"No such User Found!",
                success:false,
                
            })
        }
        else{
            const searchUserPass = searchUser.userPassword

            //TODO : Decrypt the hashed Password


            if(searchUserPass === userPassword){
                
                return NextResponse.json({
                    status:true,
                    message:"successfully Login!"
                })
            }
            else{
                return NextResponse.json({
                    status:false,
                    message:"Invalid Password"
                })
            }
        }

        
  
    } catch (error) {

        return NextResponse.json({
            message:"Something Error in Signup.",
            success:false
        })     
    }    
}