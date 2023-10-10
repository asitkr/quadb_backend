const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/mysql');
const userRouter = require('./router/userRouter')

// configure env
dotenv.config();

// rest object
const app = express();

// port
const PORT = process.env.PORT || 8000;

// middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

// routes
app.use("/api/v1/", userRouter);

// database manage query commands
sequelize.sync()
    .then((result) => {
        // console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });

// PORT listen
app.listen(PORT);