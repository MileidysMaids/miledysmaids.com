#!/bin/bash

# lR8a52DfJhmdKLaY

# Set variables
IMAGE_NAME="postgres"
CONTAINER_NAME="postgres_container"
POSTGRES_PASSWORD="mysecretpassword"
POSTGRES_PORT="5432"
POSTGRES_DB="mileidysmaids" 
SQL_SCRIPT="create_tables.sql"

# Prompt for user input and assign to variables
read -p "Enter DB_URL: " DB_URL
read -p "Enter DIRECT_URL: " DIRECT_URL


# Color variables for nicer output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Pull the latest PostgreSQL image
echo -e "${BLUE}Pulling the latest PostgreSQL image...${NC}"
docker pull $IMAGE_NAME

# Check if the container already exists
if [ "$(docker ps -a -q -f name=$CONTAINER_NAME)" ]; then
    echo -e "${YELLOW}A container with the name ${CONTAINER_NAME} already exists.${NC}"
    echo -e "${YELLOW}Stopping and removing the existing container...${NC}"
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# Run the PostgreSQL container
echo -e "${BLUE}Running the PostgreSQL container...${NC}"
docker run --name $CONTAINER_NAME \
  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  -e POSTGRES_DB=$POSTGRES_DB \
  -e DB_URL=$DB_URL \
  -e DIRECT_URL=$DIRECT_URL \
  -p $POSTGRES_PORT:5432 \
  -d $IMAGE_NAME

# Check if the container is running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo -e "${GREEN}PostgreSQL container is running.${NC}"
else
    echo -e "${RED}Failed to start the PostgreSQL container.${NC}"
    exit 1
fi

# Wait for PostgreSQL to be ready
echo -e "${BLUE}Waiting for PostgreSQL to be ready...${NC}"
until docker exec -it $CONTAINER_NAME pg_isready -U postgres; do
  echo -e "${YELLOW}PostgreSQL is not ready yet. Waiting...${NC}"
  sleep 2
done

# PostgreSQL is ready
echo -e "${GREEN}PostgreSQL is ready!${NC}"

# # Create tables
# echo -e "${BLUE}Creating tables in the database...${NC}"

# # Create the 'days' table and echo a message if successful
# docker exec -i $CONTAINER_NAME psql -U postgres -d $POSTGRES_DB <<EOF
# CREATE TABLE days (
#   id SERIAL PRIMARY KEY,
#   day DATE NOT NULL UNIQUE,
#   booked_slots INT NOT NULL DEFAULT 0
# );
# EOF

# if [ $? -eq 0 ]; then
#   echo -e "${GREEN}Table 'days' has been created successfully.${NC}"
# else
#   echo -e "${RED}Failed to create table 'days'.${NC}"
# fi

# # Create the 'slots' table and echo a message if successful
# docker exec -i $CONTAINER_NAME psql -U postgres -d $POSTGRES_DB <<EOF
# CREATE TYPE address_type AS (
#   street VARCHAR(255),
#   city VARCHAR(255),
#   state VARCHAR(255),
#   zip VARCHAR(255),
#   unit VARCHAR(255)
# );

# CREATE TYPE cleaning_service_type AS (
#   window_count INT,
#   microwave_count INT,
#   oven_count INT,d
#   refrigerator_count INT,
#   instructions VARCHAR(255)
# );


# CREATE TYPE contact_type AS (
#   full_name VARCHAR(255),
#   phone VARCHAR(15),
#   email VARCHAR(255),
#   address address_type
# );

# CREATE TABLE slots (
#   id SERIAL PRIMARY KEY,
#   day DATE NOT NULL,
#   slot_number INT NOT NULL,
#   contact contact_type NOT NULL,
#   cleaning_service cleaning_service_type NOT NULL,
#   FOREIGN KEY (day) REFERENCES days(day)
# );
# EOF

# if [ $? -eq 0 ]; then
#   echo -e "${GREEN}Table 'slots' has been created successfully.${NC}"
# else
#   echo -e "${RED}Failed to create table 'slots'.${NC}"
# fi

# # Confirm table creation
# echo -e "${GREEN}All necessary tables have been created in the database '${POSTGRES_DB}'.${NC}"

