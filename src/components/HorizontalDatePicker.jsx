import React from "react";
import moment from "moment";

const Date = ({ date, onSelectDate, selected, disabled }) => {
  // get the day name e.g. Monday
  const day = moment(date).format("MM/DD/YYYY") === moment().format("MM/DD/YYYY") ? "Today" : moment(date).format("ddd");

  // get the day number e.g 1, 2, 3, 4, 5, 6, 7
  const dayNumber = moment(date).format("D");

  // get the full date e.g 2021/01/01 - we'll use this to compare the date to the selected date
  const fullDate = moment(date).format("MM/DD/YYYY");

  const textColor = "text-teal-900";

  const isWeekend = moment(date).format("dddd") === "Saturday" || moment(date).format("dddd") === "Sunday";

  return (
    <button
      type="button"
      onClick={() => onSelectDate(fullDate)}
      disabled={disabled}
      className={[
        "btn btn-ghost mx-2 my-3 flex h-24 w-20 cursor-pointer flex-col items-start justify-between rounded-xl border border-secondary border-opacity-55 bg-cyan-100 bg-opacity-80 p-3 text-left brightness-110 transition-transform hover:brightness-100",
        textColor,
        disabled && "disabled",
        isWeekend && "scale-90",
        selected === fullDate && "background-svg scale-105 border-0 text-white hover:brightness-110",
      ].join(" ")}>
      <p className={[selected === fullDate && textColor, "text-xl font-bold", isWeekend && "opacity-60"].join(" ")}>{day}</p>

      <p className={["text-2xl font-bold", selected === fullDate && textColor, isWeekend && "opacity-60"].join(" ")}>{dayNumber}</p>
    </button>
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
        <Date key={index} date={date} onSelectDate={onSelectDate} selected={selected} disabled={date.isSame(moment(), "day")} />
      ))}
    </div>
  );
};
