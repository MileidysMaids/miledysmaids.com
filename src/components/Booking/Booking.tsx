import React from "react";
import { HorizontalDatePicker } from "../HorizontalDatePicker";
import moment from "moment";
import { useFormContext } from "react-hook-form";
import { BedFrontIcon, BuildingIcon, DropletIcon, HomeIcon, RuleIcon, UserIcon, BathIcon, DoorIcon } from "@/icons/Icons";

const times: string[] = ["8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM"];

export const Booking = () => {
  const { getValues } = useFormContext();
  const data = React.useMemo<any>(getValues, []);

  const [selectedDate, setSelectedDate] = React.useState(moment().add(1, "days").format("MM/DD/YYYY")); // Default date is tomorrow
  const [selectedSlot, setSelectedSlot] = React.useState();
  const [bookedSlots, setBookedSlots] = React.useState([]);
  const [bookedDays, setBookedDays] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/booking/booked-days")
      .then((res) => res.json())
      .then(setBookedDays);
  }, []);

  React.useEffect(() => {
    fetch(`/api/booking/slots?date=${selectedDate}`)
      .then((res) => res.json())
      .then(bookedSlots);
  }, [selectedDate]);

  return (
    <div className="flex flex-col items-center justify-center gap-14 pt-10">
      <div className="container flex flex-col gap-14">
        <HorizontalDatePicker onSelectDate={setSelectedDate} selected={selectedDate} />

        <div className="flex flex-row items-center justify-center gap-10">
          <div className="card border bg-base-100 shadow-xl">
            <div className="card-body">
              <div>
                <div className="flex flex-col gap-5">
                  <p className="text-xl font-bold uppercase">Performing services</p>
                  <span className="flex flex-row items-center gap-2">
                    <UserIcon className="h-6 w-6" />
                    <div>
                      <p className="font-bold">{data.full_name}</p>
                      <p>{data.phone}</p>
                    </div>
                  </span>

                  <span className="flex flex-row items-center gap-2">
                    {data.cleaning_type === "Home Cleaning" ? <HomeIcon className="h-6 w-6" /> : <BuildingIcon className="h-6 w-6" />}
                    <div className="flex flex-col">
                      <span className="font-bold">{data.cleaning_type}</span>
                      <p>
                        {data.address} {data.unit} <br />
                        {data.city} {data.state} {data.zip}
                      </p>
                    </div>
                  </span>

                  <span className="flex flex-row items-center gap-2">
                    <RuleIcon className="h-6 w-6" />
                    <span className="font-bold">
                      {data.square_feet - 499} ~ {data.square_feet} /sqft
                    </span>
                  </span>
                  {data.bedroom_count && (
                    <span className="flex flex-row items-center gap-2">
                      <BedFrontIcon className="h-6 w-6" />
                      <span className="font-bold">
                        {data.bedroom_count} Bedroom{data.bedroom_count > 1 ? "s" : ""}
                      </span>
                    </span>
                  )}
                  <span className="flex flex-row items-center gap-2">
                    {data.cleaning_type === "Home" && <BathIcon className="h-6 w-6" />}
                    {data.cleaning_type === "Office" && <DoorIcon className="h-6 w-6" />}
                    <span className="font-bold">
                      {data.bathroom_count} Bathroom{data.bathroom_count > 1 ? "s" : ""}
                    </span>
                  </span>

                  {data.has_multiple_toilets && (
                    <span className="flex flex-row items-center gap-2">
                      <DropletIcon className="h-6 w-6" />
                      <span className="font-bold">
                        {data.toilet_count} Toilet{data.toilet_count > 1 ? "s" : ""}
                      </span>
                    </span>
                  )}
                </div>

                <span className="divider" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {times
              .filter((time) => !bookedSlots.includes(time))
              .map((time, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedSlot({ index, time })}
                  className={["btn btn-outline btn-wide text-lg", selectedSlot?.time === time && "btn-active scale-105"].join(" ")}>
                  {time}
                </button>
              ))}
          </div>
        </div>

        <label htmlFor="modal" className="btn btn-wide mt-10 self-center">
          Confirm Schedule
        </label>

        <input type="checkbox" id="modal" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box flex flex-col gap-5">
            <h3 className="text-lg font-bold">Are you sure you want to schedule this time?</h3>

            <div className="flex flex-col gap-5">
              <span className="flex flex-row items-center gap-2">
                <UserIcon className="h-6 w-6" />
                <div>
                  <p className="font-bold">{data.full_name}</p>
                  <p>{data.phone}</p>
                </div>
              </span>

              <span className="flex flex-row items-center gap-2">
                {data.cleaning_type === "Home Cleaning" ? <HomeIcon className="h-6 w-6" /> : <BuildingIcon className="h-6 w-6" />}
                <div className="flex flex-col">
                  <span className="font-bold">{data.cleaning_type}</span>
                  <p>
                    {data.address} {data.unit} <br />
                    {data.city} {data.state} {data.zip}
                  </p>
                </div>
              </span>

              <span className="flex flex-row items-center gap-2">
                <RuleIcon className="h-6 w-6" />
                <span className="font-bold">
                  {data.square_feet - 499} ~ {data.square_feet} /sqft
                </span>
              </span>
              {data.bedroom_count && (
                <span className="flex flex-row items-center gap-2">
                  <BedFrontIcon className="h-6 w-6" />
                  <span className="font-bold">
                    {data.bedroom_count} Bedroom{data.bedroom_count > 1 ? "s" : ""}
                  </span>
                </span>
              )}
              <span className="flex flex-row items-center gap-2">
                {data.cleaning_type === "Home" && <BathIcon className="h-6 w-6" />}
                {data.cleaning_type === "Office" && <DoorIcon className="h-6 w-6" />}
                <span className="font-bold">
                  {data.bathroom_count} Bathroom{data.bathroom_count > 1 ? "s" : ""}
                </span>
              </span>

              {data.has_multiple_toilets && (
                <span className="flex flex-row items-center gap-2">
                  <DropletIcon className="h-6 w-6" />
                  <span className="font-bold">
                    {data.toilet_count} Toilet{data.toilet_count > 1 ? "s" : ""}
                  </span>
                </span>
              )}
            </div>

            <div className="modal-action">
              <div className="flex flex-row gap-5">
                <label htmlFor="modal" className="btn btn-ghost">
                  Cancel
                </label>
                <button className="btn btn-primary">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
