import { useRef, useState } from 'react'
import './new.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'



const New = () => {
    const inputRef = useRef();
    const [err, setErr] = useState(false);
    const [inputErr, setinputErr] = useState(null);
    const [data, setData] = useState(null);
    const [titleLength, setTitleLength] = useState(0);
    const [descLength, setDescLength] = useState(0);
    const navigate = useNavigate();


    const setTodo = (e) => {
        if (e.target.name === 'title') {
            const value = e.target.value;
            if (inputRef[0].value.length <= 50) {
                setErr(false)
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
                setErr(false)
                setinputErr(null)
                setData({ ...data, [e.target.name]: value.trim() })
                setDescLength(inputRef[1].value.length)
            } else {
                setDescLength(inputRef[1].value.length)
                setinputErr('Only 250 words are allowed for description')
            }
        }
    }

    const createTodo = async (e) => {
        e.preventDefault();

        if (!inputRef[0].value || !inputRef[1].value) {
            setErr(true)
        } else {
            if (inputRef[0].value.length <= 50 && inputRef[1].value.length <= 250 && inputRef[0].value.trim() && inputRef[1].value.trim()) {

                try {
                    await axios.post('http://localhost:8080/api/todo/', data, {
                        headers:
                        {
                            token: `Bearer ${JSON.parse(localStorage.getItem('todoUser'))}`
                        }
                    });
                    navigate('/')
                } catch (err) {
                    console.log(err)
                }
            } else {
                console.log()
                if (inputRef[0].value.trim().length === 0 && inputRef[1].value.trim().length === 0) {
                    setinputErr('White space not acceptable')

                } else {

                    setinputErr('Reduce input words only 50 words for title and 250 words for description')
                }
            }
        }
    }
    return (
        <div className='newWrapper'>
            <div className="newCont">
                <h3>Create new task</h3>
                {err && <p style={{ color: "red", textAlign: "center" }}>Don't leave any input empty</p>}
                {inputErr && <p style={{ color: "red", textAlign: "center" }}>{inputErr}</p>}
                <form>
                    <div className="todoInput">
                        <label>Title:</label>
                        <input type="text" placeholder='Title' name='title' onChange={setTodo} ref={(el) => (inputRef[0] = el)} />
                        <p>{titleLength}/50</p>
                    </div>
                    <div className="todoInput">
                        <label>Description:</label>
                        <textarea name="description" rows={9} placeholder='Details of your task' onChange={setTodo} ref={(el) => (inputRef[1] = el)}></textarea>
                        <p>{descLength}/250</p>
                    </div>

                    <div className="actions">
                        <button onClick={createTodo}>Add todo</button>

                        <button onClick={() => navigate('/')}>Go to home</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default New