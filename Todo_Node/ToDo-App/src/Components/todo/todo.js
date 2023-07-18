import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik'
import * as Yup from "yup"
import loginDetails from "../../login_Details.json";
import "./todo.css"
import Completed from "../Completed/Completed"
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Todo() {

    let navigate = useNavigate();
    function handleClick(){
        localStorage.removeItem("JWT");
        toast("Logged out successfully")
        navigate("/", true)
    }
    const CreateSchema = Yup.object().shape({
        notes: Yup.string().required("It cannot be blank")
    })
    const [messages] = useState({
        notes: '',
    });
    const [Details,setDetails] = useState([])
    const[email, setEmail]=useState([])
    const JWT = localStorage.getItem('JWT')
    
    const handleTaskSubmit=(values)=>{
        Details.push(values)
        setDetails([...Details])
        fetch('http://localhost:3000/completed',{
            method:'POST',
            body:JSON.stringify(values),
            headers:{
                authorization:`bearer ${JWT}`,
                "Content-Type": 'application/json'
            },
        }).then((res)=>{
            res.json().then((data)=>{
                toast("Notes added successfully")
                window.location.reload(false);
            })
        })
    }
    
    useEffect(()=>{
        fetch('http://localhost:3000/userInfo',{
            method:'GET',
            headers:{
                authorization:`bearer ${JWT}`,
                "Content-Type": 'application/json'
            },
        }).then((res)=>{
            res.json().then((data)=>{
                setEmail(data)
            })
        })
    },[])
    return (
        <div className='createmain-flex' >
            <div className='createmain'>
                <div className='user'>
                    {email.email}
                    <button onClick={handleClick}>Log Out</button>

                </div>
                <h1 className='h1main'>Create Task</h1>
                <div className='createTask'>
                    <Formik
                        validationSchema={CreateSchema}
                        initialValues={messages}
                        onSubmit={handleTaskSubmit}
                        >
                        {({ errors, touched }) => (
                            <Form className='createform'>
                                <Field placeholder="Add Task ToDo.." name='notes' className='field'></Field>
                                {errors.notes && touched.notes ? <div>{errors.notes}</div> : null}
                                <button type='submit' className='button1'>Create</button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div>
                    <h2>Tasks</h2>
                    <hr></hr>
                    {/* <div className='Completed'>Completed</div> */}
                    <Completed/>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Todo;