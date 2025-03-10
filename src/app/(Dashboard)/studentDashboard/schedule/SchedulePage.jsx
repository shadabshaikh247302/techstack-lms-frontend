"use client"
import { StudentLoginContext } from '@/app/context/StudentLoginContext';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'

export default function SchedulePage() {
    const { studentState } = useContext(StudentLoginContext);
    const router = useRouter();
  
    useEffect(() => {
  
      if (!studentState?.token) {
        router.push('/studentLogin');
        // toast.success("You are logged in!");
      }
    }, [studentState?.token, router]);

  return (
    <div>SchedulePage</div>
  )
}
