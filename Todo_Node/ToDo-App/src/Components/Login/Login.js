import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Chat() {
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;
    function handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    function signup() {
        fetch('http://localhost:3000/signUp',{
            method:"POST",
            headers:{
                "Content-Type": 'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        }).then((res)=>{
            res.json().then((data)=>{
                console.log(data)
                localStorage.setItem("JWT", data.token);
                if(data.message==="User created successfully"){
                    toast("Signed up successfully!")
                    navigate("/Home", true)
                }else{
                    toast("User already exists")
                }
            })
        })
    }

    function login() {
        fetch('http://localhost:3000/login',{
            method:"POST",
            headers:{
                "Content-Type": 'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        }).then((res)=>{
            res.json().then((data)=>{
                localStorage.setItem("JWT", data.token);
                if(data.message==="Logged in successfully"){
                    toast.success("Logged in successfully!")
                    navigate("/Home", true)
                }else{
                    toast("Invalid Credentials")
                }
            })
        })
    }

    return (
        <div className="main">
            <div className='login-form'>
                <header className='ToDo'>
                    <h2>ToDO App</h2>
                </header>
                <form>
                    <div className="sort">
                        <label htmlFor="email" id="email-label">Email id:-</label>
                        <input name="email" type="email" id="email" onChange={handleChange} value={email} ></input>
                    </div>
                    <div className="sort">
                        <label htmlFor="password" id="email-label">Password:-</label>
                        <input name="password" type="password" id="password" onChange={handleChange} value={password} ></input>
                    </div>
                    <div className="form-flex">
                        <button id="button" onClick={signup} type="button">Sign Up</button>
                        <button id="button1" onClick={login} type="button">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Chat;