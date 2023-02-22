import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import SearchComp from '../../component/searchComp/searchComp'
import TodosList from '../../component/todosList/todosList'
import './home.scss'

const Home = () => {
    const [delAll, setDelAll] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [filterValue, setFilterValue] = useState(null);
    const [sortValue, setSortValue] = useState(null);
    const [searchValue, setSearchValue] = useState(null);

    const setFilter = (e) => {
        const value = e.target.value;
        if (value === 'completed') {
            setDelAll(true)
            setFilterValue('completed')
        } else {
            if (value === 'all') {
                setDelAll(false)
                setFilterValue(null)
            } else {
                setDelAll(false)
                setFilterValue('pending')
            }
        }
    }

    const setSort = (e) => {
        const value = e.target.value;
        if (value === 'nto') {
            setSortValue(null)
        } else {
            setSortValue('otn')
            
        }
    }

    const deleteAll = () => {
        const deleteAllItem = async () => {
            setTasks(tasks.filter((item) => {
                return item._id !== item._id
            }))

            tasks.map(async (item) => {
                await axios.delete(`http://localhost:8080/api/todo/${item._id}`, {
                    headers:
                    {
                        token: `Bearer ${JSON.parse(localStorage.getItem('todoUser'))}`
                    }
                })
            })

        }
        deleteAllItem();
    }

    useEffect(() => {
        const getAllTasks = async () => {

            try {
                const res = await axios.get(`http://localhost:8080/api/todo/?${filterValue ? `status=${filterValue}` : ``}${searchValue ? `&search=${searchValue}` : ``}${sortValue ? `&sort=${sortValue}` : ``}`, {
                    headers:
                    {
                        token: `Bearer ${JSON.parse(localStorage.getItem('todoUser'))}`
                    }
                })
                setTasks(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getAllTasks();
    }, [filterValue, searchValue, sortValue])
    return (
        <div className='homeWrapper'>
            <div className="itemWrap">
                <SearchComp setSearchValue={setSearchValue}/>
                <div className="actions">
                    <select onChange={setFilter}>
                        <option value='all'>All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                    <select onChange={setSort}>
                        <option value='nto'>New to old</option>
                        <option value="otn">Old to new</option>
                    </select>
                    <div className={delAll ? 'deleteBtnWrap' : 'deleteBtnWrap none'}>
                        <button className={delAll ? 'deleteAllBtn active' : 'deleteAllBtn disable'} onClick={deleteAll}>Delete all</button>
                    </div>

                </div>
                <TodosList values={tasks} />
            </div>
        </div>
    )
}

export default Home