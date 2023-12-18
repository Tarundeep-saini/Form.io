import react from "@vitejs/plugin-react";

// Import dotenv to load environment variables from a .env file
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export default {
  plugins: [react()],
 
};
