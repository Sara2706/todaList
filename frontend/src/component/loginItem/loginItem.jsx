import './loginItem.scss'
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext/AuthContext';

const LoginItem = () => {
    const {user,setState} = useContext(AuthContext)
    const [err, setErr] = useState(false)
    const [loginErr, setLoginErr] = useState(null)
    const [data, setData] = useState(null)
    const inputRef = useRef()

    const setLogin = (e) => {
        const value = e.target.value
        setData({ ...data, [e.target.name]: value })
    }

    const checkUser = async (e) => {
        e.preventDefault();

        if (!inputRef[0].value || !inputRef[1].value) {
            setErr(true)
        } else {
            try {
                const check = await axios.post('http://localhost:8080/api/auth/login', data)
                localStorage.setItem('todoUser', JSON.stringify(check.data))
                setState({type: "LOGIN"})
                console.log(user)

            } catch (err) {
                setErr(false)
                setLoginErr(err.response.data)
            }
        }

    }

    return (
        <div className="login">
            <div className="loginHead">
                <PersonIcon className='loginBookIcon' />
                <h4>Welcome Again!</h4>
            </div>
            <form>
                {err && <p style={{ color: 'red', fontWeight: 'bold' }}>Invalid credentials</p>}
                {loginErr && <p style={{ color: 'red', fontWeight: 'bold' }}>{loginErr}</p>}
                <div className="formInput">
                    <input type="text" placeholder='Email' name='email' ref={(el) => (inputRef[0] = el)} onChange={setLogin} required />
                </div>
                <div className="formInput">
                    <input type="password" placeholder='Password' name='password' ref={(el) => (inputRef[1] = el)} onChange={setLogin} required />
                </div>
                <button onClick={checkUser}>Login</button>
            </form>
            <span className='noAcc'>Don't have a account? <Link to='/register' className='link' style={{color:'blue'}}>Register</Link></span>
        </div>
    )
}

export default LoginItem