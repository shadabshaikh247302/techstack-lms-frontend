"use client"
import { UserContext } from '@/app/context/UserContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

export default function Adminpage() {
   const router = useRouter()
  const {state} = useContext(UserContext)
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!state.token) {
        router.push("/"); // Redirect to dashboard if logged in        
      }
    }
  }, [state]);

  return (
    <div>
        Faculty Dashboard
    </div>   
  )
}
