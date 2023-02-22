import './searchComp.scss'
import { useRef, useState } from 'react'


const SearchComp = ({ setSearchValue }) => {
    const inputRef = useRef();
    const [value, setValue] = useState(null)

    const inputVal = (e) => {
        const value = e.target.value;
        if (value.trim() === '') {
            setValue(null)
            setSearchValue(null)

        } else {
            setValue(value.trim())
            setSearchValue(value.trim().toUpperCase())

        }

    }

    const setSave = (e) => {
        e.preventDefault();
        setSearchValue(value.toUpperCase())
    }
    return (
        <div className='searchWrapper'>
            <input type="text" name="title" onChange={inputVal} ref={inputRef} placeholder='Search your task here' />
            <button onClick={setSave}>Search</button>
        </div>
    )
}

export default SearchComp