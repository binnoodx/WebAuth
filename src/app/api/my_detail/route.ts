import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {


    const token = req.cookies.get("token")?.value || ""

    if (token == "") {
        return NextResponse.json({
            status: false,
            message: "Session Expires. PLease Login Again."
        })
    }
    else {
        const user: any = jwt.verify(token, process.env.TOKEN_SECRET!)
        const userID = user.id
        const userName = user.userName
        const userEmail = user.Email
        return NextResponse.json({
            status:true,
            message:"Token Successfully Found",
            userID,
            userName,
            userEmail

        })
    }




}