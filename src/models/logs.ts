import mongoose from "mongoose"

const logsSchema = new mongoose.Schema({
    executed: {
        type: Date
    },
    memory: {
        type: String 
    },
    time: {
        type: Number 
    }
})

const Logs = mongoose.model("Logs", logsSchema)

export {Logs}
