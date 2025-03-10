"use client";
import React, { useState, useEffect, useContext, Suspense } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { getAllStd } from "@/app/api/studentApi"; 
import { getAllPayment } from "@/app/api/paymentApi";

import { PaymentContext } from "@/app/context/PaymentContext";
import { MainAdminContext } from "@/app/context/AdminContext";
import { StudentContext } from "../../../context/studentContext";
import { UserContext } from "@/app/context/UserContext";

import Loader from "@/app/components/common/Loader";
import NotificationButton from "@/app/components/Button/NotificationButton";

const StudentTable = dynamic(() => import("@/app/components/table/StudentTable"), {
  loading: () => {<Loader/>},  // You can display a loading message or spinner here
  ssr: false,
});

const StudentPaymentVerificationTable = dynamic(() => import("@/app/components/table/StudentPaymentVerifcationTable"), {
  loading: () => {<Loader/>},  // You can display a loading message or spinner here
  ssr: false,
});

export default function NewAdmission() {
  const { state } = useContext(UserContext);
  const { adminState } = useContext(MainAdminContext);
  const{studentDispatch} = useContext(StudentContext);
  const { paymentData,paymentDispatch } = useContext(PaymentContext);
  const [PaymentToggler, setPaymentToggler] = useState(false);
  const [notVerifiedCount, setNotVerifiedCount] = useState(0);
  const router = useRouter();

async function fetchStudent() {
    try {
      let studentResponse = adminState.token == "undefined" ? 
      await getAllStd(state) : await getAllStd(adminState);

      let paymentResponse = adminState.token == "undefined" ? 
      await getAllPayment(state) : await getAllPayment(adminState);


      if(studentResponse){
          studentDispatch({
            type:"GET_STUDENT",
            payload:studentResponse
          })
      }

      if (paymentResponse) {
        paymentDispatch({
          type: "GET_PAYMENT",
          payload: paymentResponse,
        });
      }

    } catch (error) {
      console.log(error); 
    }
}

  // Memoize the calculation functions
  const countNotVerifiedLeads = React.useCallback(() => {
    if (!paymentData) return 0;

    return paymentData.filter(payment => {
      const isNotVerified = payment.isVerified === "Not Verified";
      return isNotVerified;
    }).length;
  }, [paymentData]);

useEffect(()=>{
  fetchStudent();
  setNotVerifiedCount(countNotVerifiedLeads());
},[countNotVerifiedLeads])

useEffect(() => {

  if (!adminState?.token) {
    router.push('/administratorLogin');
    // toast.success("You are logged in!");
  }
}, [adminState?.token, router]);


  return (
    <Suspense fallback={<Loader/>}>

        <div className="d-flex justify-content-start">
            <NotificationButton
            Label = {PaymentToggler ? "All Students" : "Payment Verification"}
            onClick={() => setPaymentToggler(!PaymentToggler)}
            NotificationCount={PaymentToggler ? 0 : notVerifiedCount}
            />
        </div>

        <div className="mt-3">
        {PaymentToggler ? (
          <StudentPaymentVerificationTable/>
        ):(
            <StudentTable 
              // StdData={students} 
              // fetchStudent={fetchStudent}
              // setStudents={setStudents}
              // updateStdData={updateStdData}
              // handleCourseSelectionChange={handleCourseSelectionChange}
            />
        )}
        </div>

    </Suspense>           
  )
}
