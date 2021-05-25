const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpress = require('@admin-bro/express')
AdminBro.registerAdapter(AdminBroMongoose)

const app = express();

const run = async() => {

    //SETUP DATABASE
    mongoose.Promisse = global.Promisse;
    const mongooseDB = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ws-coding-challenge", {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    //SETUP ADMIN INTERFACE
    const adminBro = new AdminBro({
        databases: [mongooseDB],
        rootPath: '/admin',
    })

    const router = AdminBroExpress.buildRouter(adminBro)



    //MIDLEWARES
    app.use(morgan("dev"));
    app.use(bodyParser.json());
    app.use(adminBro.options.rootPath, router)

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

}

run()