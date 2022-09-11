require('dotenv').config()
const express = require('express')
const { apiRouter } = require('./routes/api.route')
const app = express()
const PORT = process.env.PORT || 8080
app.use(express.json())


app.use("/api/", apiRouter)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})