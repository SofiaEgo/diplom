import React, { useState } from 'react';
import { format } from 'date-fns';

const FocusCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysInMonth = Array.from(
    { length: endOfMonth.getDate() },
    (_, i) => new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
  );

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() =>
            setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))
          }
          className="text-red-600 hover:text-red-900"
        >
          &lt;
        </button>
        <h2 className="text-lg font-bold">{format(currentDate, 'MMMM yyyy')}</h2>
        <button
          onClick={() =>
            setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))
          }
          className="text-red-600 hover:text-red-900"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 text-center mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-xs text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center gap-1">
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(day)}
            className={`p-2 rounded-full cursor-pointer hover:bg-red-100 ${
              selectedDate && format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                ? 'bg-red-500 text-white'
                : 'text-gray-700'
            }`}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FocusCalendar;
