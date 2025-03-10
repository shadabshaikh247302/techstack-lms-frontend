// "use client"
// import React, { Suspense, useState } from 'react'
// import ModalButton from '@/app/components/Button/CustomModalBtn';
// import CreateBatchForm from '@/app/components/Form/CreateBatchForm';
// import Loader from '@/app/components/common/Loader';
// import dynamic from 'next/dynamic';
// import CustomModal from '@/app/components/modal/CustomModal';

// const BatchTable = dynamic(() => import('@/app/components/table/BatchTable'), {
//   loading: () => <Loader />,  // This is the fallback loading component
//   ssr: false,                 // Disable server-side rendering (optional)
// });

// export default function BatchPage() {
//     const [isModalOpen, setModalOpen] = useState({
//       addBatch: false,
//       viewDetails: false,
//     });

//   const handleOpenModal = (modalId) =>
//     setModalOpen((prev) => ({ ...prev, [modalId]: true }));
//   const handleCloseModal = (modalId) =>
//     setModalOpen((prev) => ({ ...prev, [modalId]: false }));


//   return (
//     <Suspense fallback={<Loader/>}>
//       <div className="d-flex justify-content-start">
//         <ModalButton handleClick={() => handleOpenModal("addBatch")}>
//           <i className="bi bi-file-earmark-spreadsheet-fill"></i> New Batch
//         </ModalButton>

//       </div>

//       <div className="mt-3">
//         <BatchTable/>        
//       </div>

//       {/* Modal component */}
//       <CustomModal
//         id="addBatch"
//         isVisible={isModalOpen.addBatch}
//         onClose={() => handleCloseModal("addBatch")}
//         title="Add New Batch"
//       >
//         <CreateBatchForm/>
//       </CustomModal>
//     </Suspense>
//   )
// }


import UnderConstruction from '@/app/components/common/UnderConstruction'
import React from 'react'

export default function BatchPage() {
  return (
    <UnderConstruction/>
  )
}
