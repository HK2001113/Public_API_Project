// import ejs from "ejs";
// import express from "express";
// import axios from "axios";
import express from "express";
import apiRoutes from "./routes/api.js"; // Adjust path if necessary

const app = express();
const port = 3000;

// Middleware
app.use(express.static("public"));
app.set("view engine", "ejs");

// Use the API routes
app.use("/", apiRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
