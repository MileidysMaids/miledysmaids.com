import React from "react";
import { HorizontalDatePicker } from "../HorizontalDatePicker";
import moment from "moment";
import { useFormContext } from "react-hook-form";
import { BedFrontIcon, BuildingIcon, DropletIcon, HomeIcon, RuleIcon, UserIcon, BathIcon, DoorIcon } from "@/icons/Icons";
import { FormValues, Slot } from "@/types/bookingTypes";
import { CleaningCategory } from "@/types/cleaningTypes";

const times: string[] = ["8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM"];

export const Booking = () => {
  const { getValues, setValue } = useFormContext();
  const { contact, service, address } = React.useMemo(getValues as unknown as () => FormValues, []);

  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date(Date.now() + 1000 * 60 * 60 * 24)); // Default date is tomorrow
  const [selectedSlot, setSelectedSlot] = React.useState<Slot>();
  const [bookedSlots, setBookedSlots] = React.useState<string[]>([]);
  const [bookedDays, setBookedDays] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/booking/booked-days")
      .then((res) => res.json())
      .then(setBookedDays);
  }, []);

  React.useEffect(() => {
    // fetch(`/api/booking/slots?date=${selectedDate}`)
    //   .then((res) => res.json())
    //   .then(({ bookedSlots }) => setBookedSlots(bookedSlots));
  }, [selectedDate]);

  React.useEffect(() => {
    setValue("slot", selectedSlot);
  }, [selectedSlot]);

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
                      <p className="font-bold">{contact.full_name}</p>
                      <p>{contact.phone}</p>
                    </div>
                  </span>

                  <span className="flex flex-row items-center gap-2">
                    {service.cleaning_category === CleaningCategory.Residential ? (
                      <HomeIcon className="h-6 w-6" />
                    ) : (
                      <BuildingIcon className="h-6 w-6" />
                    )}
                    <div className="flex flex-col">
                      <span className="font-bold">{service.cleaning_category}</span>
                      <p>
                        {address.street} {address.unit} <br />
                        {address.city} {address.state} {address.zip}
                      </p>
                    </div>
                  </span>

                  <span className="flex flex-row items-center gap-2">
                    <RuleIcon className="h-6 w-6" />
                    <span className="font-bold">
                      {service.square_feet - 499} ~ {service.square_feet} /sqft
                    </span>
                  </span>
                  {service.bedroom_count && (
                    <span className="flex flex-row items-center gap-2">
                      <BedFrontIcon className="h-6 w-6" />
                      <span className="font-bold">
                        {service.bedroom_count} Bedroom{service.bedroom_count > 1 ? "s" : ""}
                      </span>
                    </span>
                  )}
                  <span className="flex flex-row items-center gap-2">
                    {service.cleaning_category === CleaningCategory.Residential && <BathIcon className="h-6 w-6" />}
                    {service.cleaning_category === CleaningCategory.Commercial && <DoorIcon className="h-6 w-6" />}
                    <span className="font-bold">
                      {service.bathroom_count} Bathroom{(service.bathroom_count ?? 0) > 1 ? "s" : ""}
                    </span>
                  </span>

                  {service.has_multiple_toilets && (
                    <span className="flex flex-row items-center gap-2">
                      <DropletIcon className="h-6 w-6" />
                      <span className="font-bold">
                        {service.toilet_count} Toilet{(service.toilet_count ?? 0) > 1 ? "s" : ""}
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
                  onClick={() => setSelectedSlot({ slot_number: index, time, date: selectedDate })}
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
                  <p className="font-bold">{contact.full_name}</p>
                  <p>{contact.phone}</p>
                </div>
              </span>

              <span className="flex flex-row items-center gap-2">
                {service.cleaning_category === CleaningCategory.Residential ? (
                  <HomeIcon className="h-6 w-6" />
                ) : (
                  <BuildingIcon className="h-6 w-6" />
                )}
                <div className="flex flex-col">
                  <span className="font-bold">{service.cleaning_category}</span>
                  <p>
                    {address.street} {address.unit} <br />
                    {address.city} {address.state} {address.zip}
                  </p>
                </div>
              </span>

              <span className="flex flex-row items-center gap-2">
                <RuleIcon className="h-6 w-6" />
                <span className="font-bold">
                  {service.square_feet - 499} ~ {service.square_feet} /sqft
                </span>
              </span>
              {service.bedroom_count && (
                <span className="flex flex-row items-center gap-2">
                  <BedFrontIcon className="h-6 w-6" />
                  <span className="font-bold">
                    {service.bedroom_count} Bedroom{service.bedroom_count > 1 ? "s" : ""}
                  </span>
                </span>
              )}
              <span className="flex flex-row items-center gap-2">
                {service.cleaning_category === CleaningCategory.Residential && <BathIcon className="h-6 w-6" />}
                {service.cleaning_category === CleaningCategory.Commercial && <DoorIcon className="h-6 w-6" />}
                <span className="font-bold">
                  {service.bathroom_count} Bathroom{(service.bathroom_count ?? 0) > 1 ? "s" : ""}
                </span>
              </span>

              {service.has_multiple_toilets && (
                <span className="flex flex-row items-center gap-2">
                  <DropletIcon className="h-6 w-6" />
                  <span className="font-bold">
                    {service.toilet_count} Toilet{(service.toilet_count ?? 0) > 1 ? "s" : ""}
                  </span>
                </span>
              )}
            </div>

            <div className="modal-action">
              <div className="flex flex-row gap-5">
                <label htmlFor="modal" className="btn btn-ghost">
                  Cancel
                </label>
                <button type="submit" className="btn btn-primary">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
