"use client"

import Image from "next/image";
import { useEffect } from "react";

export default function Home() {


  useEffect(() => {
    
  const getDetail = async()=>{

    const data = await fetch("/api/my_detail")
    const res = await data.json()
    console.log(res.userName)

  }
  getDetail()
    
  }, [])
  



  return (
    <h1>This is Protected Page.</h1>
  );
}
