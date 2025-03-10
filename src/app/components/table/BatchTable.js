"use client"
import { GetAllBatches } from '@/app/api/batchApi';
import { getStudentByBatchId } from '@/app/api/studentApi';
import { MainAdminContext } from '@/app/context/AdminContext';
import React, { useContext, useEffect, useState } from 'react';

export default function BatchTable() {
  const { adminState } = useContext(MainAdminContext);
  const [batchData, setBatchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [StudentDataBybatchId, setStudentDataBybatchId] = useState([]);
  const [openBatchId, setOpenBatchId] = useState(null); // Track which batch's details are open

  async function getAllBatches() {
    const data = await GetAllBatches(adminState);
    setBatchData([...data.data.batches]);
    console.log(data)
  }

  async function getStudentById(id) {
    try {
      if (openBatchId === id) {
        // If already open, close it
        setOpenBatchId(null);
      } else {
        setStudentDataBybatchId([]); // Clear previous student data
        setOpenBatchId(id); // Set current batch ID as open
        const data = await getStudentByBatchId(adminState, id);
        if (data !== undefined) {
          setStudentDataBybatchId([...data]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllBatches();
  }, []);

  return (

    <div className="container">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search batches..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "10px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#007bff",
              color: "white",
              textAlign: "left",
              fontSize: "16px",
            }}
          >
            <th style={{ border: "1px solid #ddd", padding: "12px", backgroundColor: "#007bff", minWidth: "150px" }}>
              Timing
            </th>
            <th style={{ border: "1px solid #ddd", padding: "12px 12px 12px 15px", minWidth: "150px" }}>
              Course
            </th>
            <th style={{ border: "1px solid #ddd", padding: "12px", minWidth: "150px" }}>
              Trainer
            </th>
            <th style={{ border: "1px solid #ddd", padding: "12px", minWidth: "130px" }}>
              Batch Type
            </th>
            <th style={{ border: "1px solid #ddd", padding: "12px", minWidth: "100px" }}>
              Students
            </th>
          </tr>
        </thead>
      </table>


      {/* Batch List */}
      {batchData
        .filter((batch) => {
          const searchValue = searchTerm.toLowerCase();
          const matchName = (batch?.name?.toLowerCase() || '').includes(searchValue);
          const matchStartTime = (batch?.timings?.startTime?.toLowerCase() || '').includes(searchValue);
          const matchEndTime = (batch?.timings?.endTime?.toLowerCase() || '').includes(searchValue);
          const matchCourse = (batch?.course?.name?.toLowerCase() || '').includes(searchValue);
          const matchTrainer = (batch?.trainer?.email?.toLowerCase() || '').includes(searchValue);
          const matchBatchType = (batch?.batchType?.toLowerCase() || '').includes(searchValue);
          return matchName || matchStartTime || matchEndTime || matchCourse || matchTrainer || matchBatchType;
        })
        .map((batch) => (
          <div key={batch._id} className="card border-primary mb-3">
            <div className="card-header fw-bold d-flex justify-content-between">
              <div>{batch.timings.startTime} - {batch.timings.endTime}</div>
              <div>{batch.courseId.Abbreviation}</div>
              <div>{batch.trainerid.Email}</div>
              <div>{batch.batchType}</div>
              <div>12 Students

                <button
                  type="button"
                  className="mx-2 btn btn-link p-0 m-0"
                  title={openBatchId === batch._id ? "Hide Students" : "Show Students"}
                  onClick={() => getStudentById(batch._id)}
                >

                  <i className={`bi ${openBatchId === batch._id ? "bi bi-chevron-compact-up" : "bi bi-chevron-compact-down"} fs-5`}></i>
                </button>
              </div>


            </div>

            {/* Curtain Drop-Down Student List */}
            <div className={`curtain-modal p-0 m-0 ${openBatchId === batch._id ? 'open' : ''}`}>
              <div className="curtain-content">
                <h5 className="curtain-title">Students</h5>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Sr</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {openBatchId === batch._id && StudentDataBybatchId.length > 0 ? (
                      StudentDataBybatchId.map((ele, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{ele.Name}</td>
                          <td>{ele.Phone}</td>
                          <td>{ele['Email id']}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">No students found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        ))}
    </div>
  );
}
