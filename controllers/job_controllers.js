const express = require("express");
const job = require("../models/job_position.js");

module.exports = {
    getAll: async(req, res, next) => {
        //Get all jobs, regardless whether they are available or not

        const allJobs = await job.find({});
        res.status(200).json({ jobs: allJobs });
    },

    getAllAvailable: async(req, res, next) => {
        //Get all available jobs

        const availableJobs = await job.find({ is_available: true });
        res.status(200).json({ jobs: availableJobs });
    },

    getSingleJob: async(req, res, next) => {
        // Updates given job position
        const id = req.query.id;

        try {
            const existingJob = await job.findOne({ _id: id });

            if (!existingJob) {
                res.status(404).json({ message: "Job not found" });
                return;
            }

            res.status(200).json({ job: existingJob });
        } catch (err) {
            console.log(err);
            res.status(200).json({ err });
        }
    },

    createNewJob: async(req, res, next) => {
        // Add a new job position
        const { title, description, regime, duration, deparment, is_available } = req.body;

        try {
            const newJob = new job({
                title,
                description,
                regime,
                duration,
                deparment,
                is_available
            });

            await newJob.save();

            res.status(200).json({ message: "Job created successfully!" });
        } catch (err) {
            console.log(err);
            res.status(200).json({ err });
        }
    },

    updateJob: async(req, res, next) => {
        // Updates given job position
        const { id, title, description, regime, duration, deparment, is_available } = req.body;

        try {
            const existingJob = await job.findOne({ _id: id });

            if (!existingJob) {
                res.status(404).json({ message: "Job not found" });
                return;
            }

            await existingJob.updateOne({
                title,
                description,
                regime,
                duration,
                deparment,
                is_available
            }, { omitUndefined: true });

            res.status(200).json({ message: "Job updated successfully!" });
        } catch (err) {
            console.log(err);
            res.status(200).json({ err });
        }
    },

    deleteJob: async(req, res, next) => {
        // Updates given job position
        const id = req.query.id;

        try {
            const existingJob = await job.findOne({ _id: id });

            if (!existingJob) {
                res.status(404).json({ message: "Job not found" });
                return;
            }

            await existingJob.delete();

            res.status(200).json({ message: "Job deleted successfully!" });
        } catch (err) {
            console.log(err);
            res.status(200).json({ err });
        }
    },
};