import Login from "../Components/Login/Login"
import Todo from '../Components/todo/todo'
import {BrowserRouter,Router, Routes, Route } from "react-router-dom"
import { useState } from "react"
import { ToastContainer } from "react-toastify"

function App() {

  const [Details, setDetails] = useState();

  function addtask(para) {
    setDetails(Details);
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Todo Details={Details} addtask={addtask} />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  )
}
export default App;