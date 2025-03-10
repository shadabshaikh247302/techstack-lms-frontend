"use client"
import dynamic from 'next/dynamic';
// "use client"
import React, { useContext, useEffect } from 'react'
// import NewAdmission from './NewAdmission'
const NewAdmission = dynamic(() => import("./NewAdmission"), {
  ssr: false,
});
import { MainAdminContext } from '@/app/context/AdminContext'
import { useRouter } from 'next/navigation'
// import NewAdmission from './NewAdmission'

export default function Page(){
  const {adminState} = useContext(MainAdminContext)
  const router = useRouter();

  useEffect(()=>{
    if(!adminState?.token){
      router.push("/administratorLogin")
    }
  },[adminState?.token])

  return (
      <NewAdmission/>
  )
}

