import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Store selected date
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate]);

  const generateCalendar = (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

    let days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null); // Empty slots before the 1st day of the month
    }

    for (let i = 1; i <= daysInCurrentMonth; i++) {
      days.push(i);
    }

    setDaysInMonth(days);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const getMonthName = () => {
    return currentDate.toLocaleString('default', { month: 'long' });
  };

  const isCurrentDate = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const handleDateClick = (day) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(selectedDate.toDateString()); // Store the selected date
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-dark btn-sm" onClick={goToPreviousMonth}>
          Previous
        </button>
        <h5>{getMonthName()} {currentDate.getFullYear()}</h5>
        <button className="btn btn-dark btn-sm" onClick={goToNextMonth}>
          Next
        </button>
      </div>

      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day}>{day}</div>
        ))}
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${day && isCurrentDate(day) ? 'current-day' : ''}`}
            onClick={() => day && handleDateClick(day)} // Handle date click
          >
            {day}
          </div>
        ))}
      </div>

      {/* Bootstrap Modal */}
      <div
        className={`modal fade ${isModalOpen ? 'show' : ''}`} // Use 'show' to control visibility
        tabIndex="-1"
        aria-labelledby="dateModalLabel"
        aria-hidden={!isModalOpen} // Hide modal when it's not open
        style={{ display: isModalOpen ? 'block' : 'none',background:"#00000090" }} // Ensures the modal is displayed correctly
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="dateModalLabel">
              {selectedDate}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedDate ? (
                <h5>Hello World</h5>
              ) : (
                <p>No date selected</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
