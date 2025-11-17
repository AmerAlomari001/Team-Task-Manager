const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { testConnection } = require("./db");

const app = express();

app.use(express.json());
app.use(cors());

testConnection();

const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
//const taskRoutes = require("./routes/tasks");//not use 

app.use("/api/user", userRoutes);   
app.use("/api/admin", adminRoutes); 
//app.use("/api/tasks", taskRoutes); //not use


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
