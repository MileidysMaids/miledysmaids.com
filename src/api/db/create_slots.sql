DO $$ BEGIN
CREATE TYPE address_type AS (
  street VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  zip VARCHAR(255),
  unit VARCHAR(255)
);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
CREATE TYPE cleaning_service_type AS (
  window_count INT,
  microwave_count INT,
  oven_count INT,
  refrigerator_count INT,
  instructions VARCHAR(255)
);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
CREATE TYPE contact_type AS (
  full_name VARCHAR(255),
  phone VARCHAR(15),
  email VARCHAR(255),
  address address_type
);
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS slots (
  id SERIAL PRIMARY KEY,
  day DATE NOT NULL,
  time TIME NOT NULL,
  slot_number INT NOT NULL,
  contact contact_type NOT NULL,
  cleaning_service cleaning_service_type NOT NULL,
  FOREIGN KEY (day) REFERENCES days(day)
);
