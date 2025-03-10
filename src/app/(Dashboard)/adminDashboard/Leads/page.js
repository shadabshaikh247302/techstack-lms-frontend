"use client"
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic';
import Loader from '@/app/components/common/Loader';

const LeadsPage = dynamic(() => import('./LeadsPage'), {
  loading: () => <Loader/>, // Optionally, show a loading state
  ssr: false, // Optional: Disable SSR if the component only works on the client side
});


export default function page() {
  return (
    <Suspense fallback={<Loader/>}>
      <LeadsPage/>
    </Suspense>
  )
}
