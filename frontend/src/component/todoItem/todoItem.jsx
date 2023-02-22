import { useState } from 'react'
import './todoItem.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'


const TodoItem = ({ data }) => {
    const status = data.isCompleted
    const [val, setVal] = useState(status)

    const changeStatus = async (e) => {
        const updataStatus = { isCompleted: !val }
        const update = await axios.put(`http://localhost:8080/api/todo/${data._id}`, updataStatus, {
            headers:
            {
                token: `Bearer ${JSON.parse(localStorage.getItem('todoUser'))}`
            }
        })
        setVal(!val)
    }

    return (
        <div className='todoItem'>
            <div className="title">
                <Link to={`/${data._id}`} className='link' state={data}>
                    <h3>{data.title}</h3>
                </Link>
            </div>
            <div className="status">
                <p>Status : {val ? <span style={{ color: 'green' }}>Completed</span> : <span style={{ color: 'red' }}>Pending</span>}</p>
            </div>
            <div className="chengeStatus">
                <label>IsCompleted</label>
                <input type="checkbox" name="isCompleted" onChange={changeStatus} value={val ? 'off' : 'on'} checked={val} />
            </div>
        </div>
    )
}

export default TodoItem