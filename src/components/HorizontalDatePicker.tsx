import React from "react";
import moment from "moment";

type DateProps = {
  date: moment.Moment;
  onSelectDate: (date: string) => void;
  selected: string;
  disabled: boolean;
  format: string;
};

const Date = ({ date, onSelectDate, selected, disabled, format }: DateProps) => {
  // get the day name e.g. Monday
  const day = moment(date).format("YYYY-MM-DD") === moment().format(format) ? "Today" : moment(date).format("ddd");

  // get the day number e.g 1, 2, 3, 4, 5, 6, 7
  const dayNumber = moment(date).format("D");

  // get the full date e.g 2021/01/01 - we'll use this to compare the date to the selected date
  const fullDate = moment(date).format(format);

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

type HorizontalDatePickerProps = {
  onSelectDate: (date: string) => void;
  selected: string;
  format?: string;
  disabledDays?: string[];
};

export const HorizontalDatePicker = ({ onSelectDate, selected, format = "YYYY-MM-DD", disabledDays = [] }: HorizontalDatePickerProps) => {
  const [dates, setDates] = React.useState<{ date: moment.Moment; disabled: boolean }[]>([]);

  React.useEffect(() => {
    getDates();
  }, [disabledDays]);

  // get the dates from today to 10 days from now, format them as strings and store them in state
  const getDates = () => {
    const _dates = [];
    for (let i = 0; i < 10; i++) {
      const date = moment().add(i, "days");
      _dates.push({ date, disabled: disabledDays.includes(date.format(format)) });
    }
    setDates(_dates);
  };

  return (
    <div className="flex flex-row items-center justify-center">
      {dates.map(({ date, disabled }, index) => (
        <div className={[disabled && "tooltip", "tooltip-secondary"].join(" ")} data-tip="This day is fully booked.">
          <Date
            key={date.toString()}
            date={date}
            onSelectDate={onSelectDate}
            format={format}
            selected={selected}
            disabled={disabled || date.isSame(moment(), "day")}
          />
        </div>
      ))}
    </div>
  );
};
