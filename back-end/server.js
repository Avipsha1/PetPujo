const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors");

dotenv.config()

const app = express()
const port = 3000

app.use(express.json())

app.use(cors({
  origin: "http://localhost:5173", // only your React frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const userauthRoutes = require("./routes/userauth")
app.use("/api/users", userauthRoutes)

app.get('/', (req, res) => {
    return res.send("API working")
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})