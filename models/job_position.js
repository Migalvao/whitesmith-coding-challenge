const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobPositionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    regime: {
        type: String,
        enum: ["Full-Time", "Part-Time", "Summer internship", "Curricular internship"],
        required: true,
        default: "Full-Time",
    },

    duration: {
        type: Number,
        required: false,
    },

    deparment: {
        type: String,
        enum: ["Technology", "Human Resources", "Marketing", "Management"],
        required: true,
        default: "Technology",
    },

    is_available: {
        type: Boolean,
        required: false,
        default: true,
    },
});

const jeKer = mongoose.model("jobPosition", jobPositionSchema);
module.exports = jeKer;