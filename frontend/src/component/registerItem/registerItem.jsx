import './registerItem.scss'
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom'
import { useState,useRef } from 'react';
import axios from 'axios';


const RegisterItem = () => {
    const [err, setErr] = useState(false)
    const [registerErr, setRegisterErr] = useState(null)
    const [data, setData] = useState(null)
    const inputRef = useRef()

    const setRegister = (e) => {
        const value = e.target.value
        setData({ ...data, [e.target.name]: value })
    }

    const createUser = async(e) => {
        e.preventDefault();

        if (!inputRef[0].value || !inputRef[1].value || !inputRef[2].value || !inputRef[3].value) {
            setErr(true)
        } else {
            try {
                await axios.post('http://localhost:8080/api/auth/register', data)

                
            } catch (err) {
                setErr(false)
                setRegisterErr(err.response.data)
            }
        }

    }

    return (
        <div className="register">

            <div className="registerHead">
                <PersonIcon className='registerBookIcon' />
                <h4>Hello!</h4>
            </div>
            <form>
                {err && <p  style={{color:'red',fontWeight:'bold'}}>Invalid credentials</p>}
                {registerErr && <p style={{color:'red',fontWeight: 'bold'}}>{registerErr}</p>}
                <div className="formInput">
                    <input type="text" placeholder='Username' name='name' onChange={setRegister} ref={(el) => (inputRef[0] = el)} />
                </div>
                <div className="formInput">
                    <input type="text" placeholder='Email' name='email' onChange={setRegister} ref={(el) => (inputRef[1] = el)} />
                </div>
                <div className="formInput">
                    <input type="number" placeholder='Phone No' name='phone' onChange={setRegister} ref={(el) => (inputRef[2] = el)} />
                </div>
                <div className="formInput">
                    <input type="password" placeholder='Password' name='password' onChange={setRegister} ref={(el) => (inputRef[3] = el)} />
                </div>
                <button onClick={createUser}>Register</button>
            </form>
            <span className='alAcc'>Already have a account? <Link to='/login' className='link' style={{color:'blue'}}>Login</Link></span>
        </div>
    )
}


export default RegisterItem