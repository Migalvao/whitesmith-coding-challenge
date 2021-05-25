const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const os = require("os");
var hostname = os.hostname();

const app = express();

//SETUP DATABASE
mongoose.Promisse = global.Promisse;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ws-coding-challenge", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//MIDLEWARES
app.use(morgan("dev"));
app.use(bodyParser.json());

//ROUTES
const jobRoutes = require("./routes/job_routes.js");

app.use("/jobs", jobRoutes);

//  404 ERROR
app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

//CATCH OTHER ERRORS
app.use((err, req, res, next) => {
    const message = err;
    const status = err.status || 500;

    res.status(status).json({
        error: {
            message,
        },
    });
});

//START SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server listening at port ", port);
});