"use client"

import Link from "next/link"
import React from "react"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"

interface Inputs {
  username: string
  password: string
  email:string
}

const Page = () => {
  const showPass = false
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center bg-slate-600">
     <h1>SignUp Here</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-white">
        <input  
          {...register("username")} 
          className="border p-2 m-2 rounded"
          placeholder="Enter Username"
        />
        <input  
          {...register("email")} 
          className="border p-2 m-2 rounded"
          placeholder="Enter Email"
        />

        <input 
          {...register("password", { required: true })} 
          className="border p-2 m-2 rounded"
          placeholder="Enter Password"
          type={showPass ? "password" : "text"}
        />

        {errors.username && <span className="text-red-500">This field is required</span>}

        <input type="submit" className="bg-blue-500 text-white p-2 m-2 rounded cursor-pointer" />
        <Link className="underline" href={"/login"}>or Login to continue</Link>
        <button className="px-5 py-2 bg-slate-500 mt-5 cursor-pointer rounded-lg text-white">Continue with Google</button>

      </form>
    </div>
  )
}

export default Page
