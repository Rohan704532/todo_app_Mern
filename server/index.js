import express from "express"
import Connection from './database/db.js'
import Routes from "./routes/routes.js"
import cors from "cors"
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";

const PORT = 3000
const app = express();
app.use(cookieParser());
app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', Routes);
Connection()
const SECRET = 'SECr3t';

app.listen(PORT, ()=>{
    console.log("Server is up and running")
})

export default SECRET