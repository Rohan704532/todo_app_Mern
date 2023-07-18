import { useEffect } from "react";
import { useState } from "react";
import './Completed.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Completed() {
    const [completed, setCompleted] = useState(["ToDo Lists"])
    const [lineThrough, setlineThrough] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/gettodo', {
            method: "GET"
        }).then((res) => {
            res.json()
                .then((data) => {
                    completed.push(data.todo)
                    setCompleted([...completed])
                })
        })
    }, [])

    const toggleTodo = (item) => {
        let id = item._id
        if (lineThrough.includes(item)) {
            lineThrough.splice(lineThrough.indexOf(item), 1)
            toast("Marked as undone")
        } else {
            lineThrough.push(item)
            toast("Marked as done")
        }
        setlineThrough([...lineThrough])
        fetch(`http://localhost:3000/todos/${id}`, {
            method: "PUT"
        }).then((res) => {
            res.json()
        })
    }

    const deleteTodo = (item) => {
        let id = item._id
        fetch(`http://localhost:3000/deleteTodo/${id}`, {
            method: "DELETE"
        }).then((res) => {
            res.json()
        }).then(()=>{
            toast("Deleted successfully")
            window.location.reload(false);
        })
    }

    return (
        <div>
            {completed.map((item, index) => {
                return (
                    <div className="pointer" key={index}>
                        {item != "ToDo Lists" ? item.map((item1, index1) => {
                            return (
                                <div>
                                    <div className={lineThrough.includes(item1) || item1.done == true ? 'cartProduct' : 'cartProduct1'} key={index1}>
                                        <div onClick={() => toggleTodo(item1)} className="div1">
                                            <svg className="filled" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                            </svg>
                                            {item1.notes}
                                        </div>
                                        <div className="div2">
                                            <svg onClick={() => deleteTodo(item1)}xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <hr></hr>
                                </div>
                            )
                        }) : ''}
                    </div>
                )
            })}
        </div>
    )

}
export default Completed;