import mongoose from "mongoose";

const Connection = () => {
    mongoose.connect('mongodb://0.0.0.0:27017/todoApp', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "todoApp" }).then(() => {
        console.log("Connected with mongodb")
    }).catch((err) => {
        console.log(err)
    });
}

export default Connection