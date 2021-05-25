const express = require("express");
const router = require("express-promise-router")();

const controllers = require("../controllers/job_controllers.js");

//CREATE
router.route("/").post(controllers.createNewJob); //Create new job

//READ
router.route("/").get(controllers.getAllAvailable); //Get available jobs
router.route("/job").get(controllers.getSingleJob); //Get single job
router.route("/all").get(controllers.getAll); //Get all jobs

//UPDATE
router.route("/").put(controllers.updateJob); //update existing job

//DELETE
router.route("/").delete(controllers.deleteJob); //update existing job

module.exports = router;