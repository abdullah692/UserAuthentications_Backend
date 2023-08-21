const express = require("express");
const connectDB = require("./config/dbConnection");
const app = express();

const dotenv = require("dotenv").config();
connectDB();
const port = process.env.PORT || 5001;

app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoute"));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
