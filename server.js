const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json()); // This is new
app.use(express.urlencoded({ extended: true })); // This is new

require('./server/config/mongoose.config'); // This is new
require('./server/routes/project.routes')(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
