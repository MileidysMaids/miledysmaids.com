const fs = require("fs");
const path = require("path");
const { supabase } = require("../src/api/db/db.js");
const { blue, green, red, white } = require("chalk");

const print = (type, ...rest) => {
  const colors = {
    info: blue,
    success: green,
    error: red,
  };
  const color = colors[type] ?? white;

  const message = [];
  if (!rest.length) message.push(color(type));
  else message.push(color(`[${type.toUpperCase()}]`), ...rest);

  console.log(...message);
};

const runSQL = async () => {
  // Define SQL commands
  const sql = `
    CREATE TABLE days (
      id SERIAL PRIMARY KEY,
      day DATE NOT NULL UNIQUE,
      booked_slots INT NOT NULL DEFAULT 0
    );

    CREATE TYPE address_type AS (
      street VARCHAR(255),
      city VARCHAR(255),
      state VARCHAR(255),
      zip VARCHAR(255),
      unit VARCHAR(255)
    );

    CREATE TYPE cleaning_service_type AS (
      window_count INT,
      microwave_count INT,
      oven_count INT,
      refrigerator_count INT,
      instructions VARCHAR(255)
    );

    CREATE TYPE contact_type AS (
      full_name VARCHAR(255),
      phone VARCHAR(15),
      email VARCHAR(255),
      address address_type
    );

    CREATE TABLE slots (
      id SERIAL PRIMARY KEY,
      day DATE NOT NULL,
      slot_number INT NOT NULL,
      contact contact_type NOT NULL,
      cleaning_service cleaning_service_type NOT NULL,
      FOREIGN KEY (day) REFERENCES days(day)
    );
  `;

  // Execute SQL commands
  try {
    const { data, error } = await supabase.rpc("execute_sql", { sql });

    if (error) {
      console.error("Error creating tables:", error.message);
    } else {
      console.log("Tables created successfully.");
    }
  } catch (error) {
    console.error("Error executing SQL:", error.message);
  }
};

runSQL();
