import React from "react";
import moment from "moment";

const Date = ({ date, onSelectDate, selected }) => {
  // get the day name e.g. Monday
  const day = moment(date).format("MM/DD/YYYY") === moment().format("MM/DD/YYYY") ? "Today" : moment(date).format("ddd");

  // get the day number e.g 1, 2, 3, 4, 5, 6, 7
  const dayNumber = moment(date).format("D");

  // get the full date e.g 2021/01/01 - we'll use this to compare the date to the selected date
  const fullDate = moment(date).format("MM/DD/YYYY");

  return (
    <div
      onClick={() => onSelectDate(fullDate)}
      className={[
        "mx-2 my-3 h-24 w-20 cursor-pointer items-center rounded-xl border-white bg-white p-3",
        selected === fullDate && "background-svg text-white",
      ].join(" ")}>
      <p className={[selected === fullDate && "text-white", "text-xl font-bold"].join(" ")}>{day}</p>

      <div className="h-3" />

      <p className={["text-2xl font-bold", selected === fullDate && "text-white"].join(" ")}>{dayNumber}</p>
    </div>
  );
};

export const HorizontalDatePicker = ({ onSelectDate, selected }) => {
  const [dates, setDates] = React.useState([]);

  React.useEffect(() => {
    getDates();
  }, []);

  // get the dates from today to 10 days from now, format them as strings and store them in state
  const getDates = () => {
    const _dates = [];
    for (let i = 0; i < 10; i++) {
      const date = moment().add(i, "days");
      _dates.push(date);
    }
    setDates(_dates);
  };

  return (
    <div className="flex flex-row items-center justify-center">
      {dates.map((date, index) => (
        <Date key={index} date={date} onSelectDate={onSelectDate} selected={selected} />
      ))}
    </div>
  );
};
