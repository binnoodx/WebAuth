"use client"
import { useState } from "react"
import Link from "next/link"
import React from "react"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"

interface Inputs {
  username: string
  password: string
  email: string,
  conPass: string
}

const Page = () => {
  const showPass = false
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const [show, setShow] = useState(false)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    const response = await fetch("/api/forSignup", {
      method: "POST",
      body: JSON.stringify({
        userName: data.username,
        userEmail: data.email,
        userPassword: data.password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const check = await response.json()

    console.log(check)



  }

  const handleShow = ()=>{
    setShow(!show)
  }

  return (
    <div className="flex flex-col h-screen  w-screen justify-center items-center bg-[#ECEFF1] bg-cover ">




      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  px-15 py-10 rounded-lg  bg-white text-white">

        <div className="img w-full justify-center items-center h-[5vh] flex">
          <img src="https://cdn-icons-png.flaticon.com/512/891/891399.png" className="w-8 h-8" alt="" />
          <h1 className="text-black font-bold text-xl mt-1">WebAuth</h1>

        </div>

        <input
          {...register("username")}
          className=" px-10 py-2 text-black border-1 border-slate-400 text-sm mt-4 rounded-sm"
          placeholder="Username"
        />
        {errors.username && <span className="text-red-500">This field is required</span>}


        <input
          {...register("email")}
          className="px-10 py-2 text-black border-1 border-slate-400 text-sm mt-4 rounded"
          placeholder="Email"
        />

        <input
          {...register("password", { required: true })}
          className="px-10 py-2 text-black border-1 border-slate-400 text-sm mt-4 rounded"
          placeholder="Password"
          type={show ? "text" : "password"}
        />
        <input
          {...register("conPass", { required: true })}
          className="px-10 py-2 text-black border-1 border-slate-400 text-sm mt-4 rounded"
          placeholder="Confirm Password"
          type={show ? "text" : "password"}
        />

          <div className="check flex flex-row w-full justify-start gap-2 mt-2">
            <input type="checkbox" onClick={handleShow} id="check" name=""  />
            <h1 className="text-sm text-slate-400 ">Show Password</h1>
          </div>

        <input type="submit" className="bg-green-500 text-white px-2 py-1 mt-7 rounded cursor-pointer" />

          

        <Link className=" w-full text-center text-slate-400 text-xs mt-5" href={"/login"}>or, Login to continue</Link>
        <div className="buttons flex flex-row justify-center gap-5 items-center w-full">
          <button className="px-5 py-2 text-sm bg-blue-500 mt-5 cursor-pointer rounded-lg text-white">Google</button>

          <button className="px-5 py-2 text-sm bg-blue-500 mt-5 cursor-pointer rounded-lg text-white">Facebook</button>


        </div>
      </form>
    </div>
  )
}

export default Page
