import express from "express"
import {completed, authenticateJwt,signUp,login, getTodo,toggleTodo,deleteTodo,userInfo} from '../controller/todo-controller.js'


const route = express.Router();
route.post('/completed', authenticateJwt, completed)
route.post('/signUp', signUp)
route.post('/login', login)
route.get('/gettodo',getTodo)
route.put('/todos/:id',toggleTodo)
route.delete('/deleteTodo/:id',deleteTodo)
route.get('/userInfo', userInfo)

export default route;