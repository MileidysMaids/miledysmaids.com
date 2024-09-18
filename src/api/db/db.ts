import { PrismaClient } from "@prisma/client";
// const { createClient } = require("@supabase/supabase-js");

export const prisma = new PrismaClient();

// const service_role_key =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kenp1amZ1b3ZhZ2V0bHRtaHJzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTU2MzMwMiwiZXhwIjoyMDQxMTM5MzAyfQ.uRGOfJOqHo_0acV2K4rmdlTQr_JMC4_0x-OvoA_Zs_8";
// const api_key =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kenp1amZ1b3ZhZ2V0bHRtaHJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU1NjMzMDIsImV4cCI6MjA0MTEzOTMwMn0.sKOm19vNhi0TlNi_m0G33JcrM4txLXkPmZmWfAIHfNQ";

// // Create a single supabase client for interacting with your database
// module.exports = { db: createClient("https://mdzzujfuovagetltmhrs.supabase.co", api_key) };
