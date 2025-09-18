import { NextRequest, NextResponse } from "next/server";
import  jwt  from "jsonwebtoken";

export async function GET(req: NextRequest) {
    

    const token = req.cookies.get("token")?.value || ""
    const user: any = jwt.verify(token, process.env.TOKEN_SECRET!)
    const userID = user.userName

    console.log(userID)

    return NextResponse.json({
        userName: userID
    })



}