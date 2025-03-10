"use client"
import React, { Suspense, useState } from 'react'

import ModalButton from '@/app/components/Button/CustomModalBtn'
import CustomModal from '@/app/components/modal/CustomModal'
import Loader from '@/app/components/common/Loader';
import dynamic from 'next/dynamic';


const CreateBatchForm = dynamic(() => import('@/app/components/table/BatchTable'), {
  loading: () => <Loader />,
  ssr: false,
})

const BatchTable = dynamic(() => import('@/app/components/table/BatchTable'), {
  loading: () => <Loader />,
  ssr: false,
})


export default function BatchPage() {
  const [isModalOpen, setModalOpen] = useState({
    addBatch: false,
    viewDetails: false,
  });

  const handleOpenModal = (modalId) =>
    setModalOpen((prev) => ({ ...prev, [modalId]: true }));
  const handleCloseModal = (modalId) =>
    setModalOpen((prev) => ({ ...prev, [modalId]: false }));

  return (
    <Suspense fallback={<Loader />}>
      <div className="d-flex justify-content-start">
        <ModalButton handleClick={() => handleOpenModal("addBatch")}>
          <i className="bi bi-file-earmark-spreadsheet-fill"></i> New Batch
        </ModalButton>

      </div>

      <div className="mt-3">

        <BatchTable />
      </div>

      {/* Modal component */}
      <CustomModal
        id="addBatch"
        isVisible={isModalOpen.addBatch}
        onClose={() => handleCloseModal("addBatch")}
        title="Add New Batch"
      >
        <CreateBatchForm />

      </CustomModal>
    </Suspense>

  )
}
