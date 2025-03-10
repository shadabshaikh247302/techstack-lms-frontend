import React, { useContext, useRef, useState } from 'react';
import CourseDropdown from '../Dropdown/CourseDropdown';
// import EmployeeDropdown from '../Dropdown/EmployeeDropdown';
import TrainerDropdown from '../Dropdown/SelectEmployee';
import toast from 'react-hot-toast';
import { createBatches } from '@/app/api/batchApi';
import { UserContext } from '@/app/context/UserContext';
import { MainAdminContext } from '@/app/context/AdminContext';

export default function CreateBatchForm() {
  const{state}=useContext(UserContext)
  const {adminState} = useContext(MainAdminContext)  
  const [batchData, setBatchData] = useState({
    trainerid: "",
    courseId:"",
    timings: {
      startTime: "",
      endTime: ""
    },
    batchType: ""
  });


  function handleSelection(selectedCourses) {
    setBatchData((prev) => ({
      ...prev,
      "courseId": selectedCourses.map((course) => course.Abbreviation)
    }))
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (batchData.trainerid_by_mail || batchData.courseId || batchData.timings.endTime || batchData.timings.startTime || batchData.batchType) {
      let data =  !adminState.token ? await createBatches(state,batchData) : await createBatches(adminState,batchData)       
      if(data){
          toast.success("Batch created successfully!")   
        }else{
          toast.error("Please try again")
        }
    } else {
      toast.error("All fields are required!")
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className="col-12 col-md-6 mb-3">
            <p htmlFor="startTime" className="form-label">Course</p>

            <CourseDropdown studentCourses={batchData["courseId"]}
              onSelectionChange={handleSelection}
            />
          </div>

          <div className="col-12 col-md-6 mb-3">
            <p htmlFor="trainer" className="form-label">Trainer</p>
            <TrainerDropdown
              onTrainerSelect={(email) => setBatchData(prev => ({ ...prev, trainerid: email }))}
            />
          </div>


          <div className="col-12 col-md-4 mb-3">
            <label htmlFor="startTime" className="form-label">Start Time</label>
            <input
              type="time"
              id="startTime"
              className="form-control"
              // value={startTime}
              onChange={(e) => setBatchData((prev) => ({ ...prev, timings: { ...prev.timings, startTime: e.target.value } }))}
            // required
            />
          </div>

          <div className="col-12 col-md-4 mb-3">
            <label htmlFor="endTime" className="form-label">End Time</label>
            <input
              type="time"
              id="endTime"
              className="form-control"
              // value={endTime}
              onChange={(e) => setBatchData((prev) => ({ ...prev, timings: { ...prev.timings, endTime: e.target.value } }))}
            // required
            />
          </div>

          <div className="col-12 col-md-4 mb-3">
            <label htmlFor="schedule" className="form-label">Schedule</label>
            <select
              id="schedule"
              className="form-select"
              // value={schedule}
              onChange={(e) => setBatchData((prev) => ({ ...prev, batchType: e.target.value }))}
            // require
            >
              <option value="">Select Schedule</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Create Batch</button>
      </form>
    </div>
  );
}
