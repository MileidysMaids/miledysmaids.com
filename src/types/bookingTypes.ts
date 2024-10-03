import { CleaningItems } from "@/types/cleaningTypes";

export type Contact = {
  full_name: string;
  phone: string;
  email?: string;
  company_name?: string;
};

export type Slot = {
  time: string;
  date: Date;
  slot_number: number;
};

export type Extras = {
  instructions?: string;
};

export type Address = {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zip: string;
};

export type FormValues = {
  slot: Slot;
  contact: Contact;
  service: CleaningItems;
  address: Address;
  extras?: Extras;
};
