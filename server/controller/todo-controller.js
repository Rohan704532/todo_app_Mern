import {Login} from "../model/Todo.js"
import Jwt from "jsonwebtoken";
import {Notes} from "../model/Todo.js"
import SECRET from "../index.js";


export const authenticateJwt=(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        Jwt.verify(token, SECRET, (err,user)=>{
            if(err){
                return res.sendStatus(403)
            }
            req.user=user;
            next();
        })
    }else{
        res.sendStatus(401)
    }
}
export const completed = async(req,res)=>{
    const {notes} = req.body;
    const newNotes = new Notes({notes});
    await newNotes.save();
    res.json({ message: 'Notes added successfully', Notes: newNotes.notes });
}

export const signUp=async (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body;
    const user = await Login.findOne({ email });
    if (user) {
        res.status(403).json({ message: "User already exists" })
    } else {
        const newUser = new Login({ email, password })
        await newUser.save();
        const token = Jwt.sign({ email, role: 'user' }, SECRET, { expiresIn: '1h' })
        res.json({ message: 'User created successfully', token })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    const found = await Login.findOne({ email, password });
    if (found) {
        const token = Jwt.sign({ email, role: 'user' }, SECRET, { expiresIn: '1h' })
        res.json({ message: "Logged in successfully", token });
    } else {
        res.status(403).json({ message: 'Invalid username or password' })
    }
}

export const getTodo =  async(req,res)=>{
    const todo = await Notes.find({}).sort({'createdAt':-1})
    res.status(200).json({success:true, todo})
}
export const toggleTodo =  async(req,res)=>{
    // console.log(req.params.id)
    const todoref = await Notes.findById(req.params.id)
    //console.log(todoref)
    const todo = await Notes.findOneAndUpdate(
        {_id:req.params.id},
        {done:!todoref.done}
    )
    await todo.save()
    res.status(200).json({success:true, todo})
}

export const deleteTodo = async(req,res)=>{
    const delTodo = await Notes.findByIdAndDelete(req.params.id)
    return res.status(200).json(delTodo)
}

export const userInfo = async(req,res)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        Jwt.verify(token, SECRET, (err,user)=>{
            if(err){
                return res.sendStatus(403)
            }else{
                req.user=user;
                return res.status(200).json(user)
            }
        })
    }
}