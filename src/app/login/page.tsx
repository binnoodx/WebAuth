"use client"

import React from "react"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"

interface Inputs {
  username: string
  password: string
  email:string
}

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center bg-slate-600">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-white">
        <input  
          {...register("username")} 
          className="border p-2 m-2 rounded"
          placeholder="Enter Name"
        />
        <input  
          {...register("email")} 
          className="border p-2 m-2 rounded"
          placeholder="Enter Name"
        />

        <input 
          {...register("password", { required: true })} 
          className="border p-2 m-2 rounded"
          placeholder="Enter Password"
        />

        {errors.username && <span className="text-red-500">This field is required</span>}

        <input type="submit" className="bg-blue-500 text-white p-2 m-2 rounded cursor-pointer" />
      </form>
    </div>
  )
}

export default Page
