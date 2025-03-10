"use client"

import dynamic from 'next/dynamic';
import React, { useState } from 'react'

import Loader from '@/app/components/common/Loader';
import CustomModal from '@/app/components/modal/CustomModal'
import ModalButton from '@/app/components/Button/CustomModalBtn'
// import CreateSession from '@/app/components/Form/CreateSession';
const CreateSession = dynamic(() => import("@/app/components/Form/CreateSession"), { ssr: false })

const Session = dynamic(() => import('@/app/components/table/Session'), {
  loading: () => <Loader />,
  ssr: false,
})

export default function SessionPage() {
  const [isModalOpen, setModalOpen] = useState({
    addBatch: false,
    viewDetails: false,
  });


  const handleOpenModal = (modalId) =>
    setModalOpen((prev) => ({ ...prev, [modalId]: true }));
  const handleCloseModal = (modalId) =>
    setModalOpen((prev) => ({ ...prev, [modalId]: false }));

  return (
    <>
      <div className="d-flex justify-content-start">
        <ModalButton handleClick={() => handleOpenModal("addSession")}>
          <i className="bi bi-file-earmark-spreadsheet-fill"></i>New Session
        </ModalButton>

      </div>

      <div className="mt-3">
        <Session />
      </div>

      <CustomModal
        id="addBatch"
        isVisible={isModalOpen.addSession}
        onClose={() => handleCloseModal("addSession")}
        title="Add New Session"
      >
        <CreateSession />

      </CustomModal>
    </>
  )
}
