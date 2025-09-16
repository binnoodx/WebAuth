import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/connect/dbConnect";
import User from "@/app/model/userSchema";
// import { sendMail } from "@/app/helpers/mailer";

export async function POST(req: NextRequest) {
    await dbConnect()

    try {
        const body = await req.json()
        const userName = body.userName
        const userEmail = body.userEmail
        const userPassword = body.userPassword
        const userOTP = Math.floor(111111 + Math.random() * 999999)
        const searchUser = await User.findOne({ userEmail, userName })

        if (!searchUser) {
            const newUser = new User({
                userName: userName,
                userEmail: userEmail,
                userPassword: userPassword,
                userJoined:Date.now(),
                userOTP:userOTP,
                userOTPExpiry:Date.now() + 5*60*1000
            })

            await newUser.save()

            //TODO Send Mail to userVerification

            return NextResponse.json({
                message: "User Registered Successfully"
            })
        }
        else {
            return NextResponse.json({
                message: "User already Found"
            })
        }

    } catch (error) {

        console.log("Error in User Signup")

    }



}