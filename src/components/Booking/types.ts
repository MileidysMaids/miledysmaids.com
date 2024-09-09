import { CleaningItems } from "@/utils/calculateEstimate";

type Contact = {
  full_name: string;
  phone: string;
  email?: string;
  company_name?: string;
};

type Slot = {
  date: string;
  slot_number: number;
};

type Extras = {
  instructions?: string;
};

type Address = {
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
