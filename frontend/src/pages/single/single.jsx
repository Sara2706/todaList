import { useRef, useState } from 'react'
import './single.scss'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


const Single = () => {
    const inputRef = useRef();
    const location = useLocation();
    const value = location.state;
    const navigate = useNavigate();
    const [updateTodo, setupdateTodo] = useState(true);
    const [val, setVal] = useState(value.isCompleted)
    const [data, setData] = useState(null);
    const [inputErr, setinputErr] = useState(null);
    const [titleLength, setTitleLength] = useState(0);
    const [descLength, setDescLength] = useState(0);

    const setTodo = (e) => {
        if (e.target.name === 'title') {
            const value = e.target.value;
            if (inputRef[0].value.length <= 50) {
                setinputErr(null)
                setData({ ...data, [e.target.name]: value.trim().toUpperCase() })
                setTitleLength(inputRef[0].value.length)
            } else {
                setTitleLength(inputRef[0].value.length)
                setinputErr('Only 50 words are allowed for title')
            }
        } else {
            const value = e.target.value;

            if (inputRef[1].value.length <= 250) {
                setinputErr(null)
                setData({ ...data, [e.target.name]: value.trim() })
                setDescLength(inputRef[1].value.length)
            } else {
                setDescLength(inputRef[1].value.length)
                setinputErr('Only 250 words are allowed for description')
            }
        }
    }

    const setUpdate = (e) => {
        e.preventDefault();
        setupdateTodo(false)
    }

    const setStatus = () => {
        setVal(!val)
        setData({ ...data, isCompleted: !val })
    }

    const saveupdateTodo = async (e) => {
        e.preventDefault();
        if (!inputErr) {
            try {
                await axios.put('http://localhost:8080/api/todo/' + value._id, data, {
                    headers:
                    {
                        token: `Bearer ${JSON.parse(localStorage.getItem('todoUser'))}`
                    }
                });
                setupdateTodo(true)

            } catch (err) {
                console.log(err)
            }
        }else{
            setinputErr('Reduce input words only 50 words for title and 250 words for description')
        }
    }

    const deleteTodo = async (e) => {
        e.preventDefault();

        try {
            await axios.delete('http://localhost:8080/api/todo/' + value._id, {
                headers:
                {
                    token: `Bearer ${JSON.parse(localStorage.getItem('todoUser'))}`
                }
            });
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='singleWrapper'>
            <div className="singleCont">
                <h3>Single task</h3>
                <form>
                    {inputErr && <p style={{ color: "red", textAlign: "center" }}>{inputErr}</p>}
                    <div className="todoInput">
                        <label>Title:</label>
                        <input type="text" placeholder={value.title} name='title' onChange={setTodo} ref={(el) => (inputRef[0] = el)} readOnly={updateTodo} />
                        <p className='length'>{titleLength}/50</p>
                    </div>
                    <div className="todoInput">
                        <label>Description:</label>
                        <textarea name="description" rows={9} placeholder={value.description} onChange={setTodo} ref={(el) => (inputRef[1] = el)} readOnly={updateTodo}></textarea>
                        <p className='length'>{descLength}/250</p>
                    </div>
                    <div className="todoInput">
                        <div className="left">
                            <p>Status : {val ? <span style={{ color: 'green' }}>Completed</span> : <span style={{ color: 'red' }}>Pending</span>}</p>
                        </div>
                        {updateTodo ? '' : <div className="right">
                            <label>IsCompleted</label>
                            <input type="checkbox" name="isCompleted" onChange={setStatus} value={val ? 'off' : 'on'} checked={val} />
                        </div>}
                    </div>
                    <div className="actions">
                        {updateTodo ? <button onClick={setUpdate}>Edit</button> : <button onClick={saveupdateTodo}>Save</button>}
                        <button onClick={deleteTodo}>Delete</button>
                        <button onClick={()=>navigate('/')}>Go to home</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Single