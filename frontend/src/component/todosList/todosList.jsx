import TodoItem from '../todoItem/todoItem'
import './todosList.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';


const TodosList = ({ values }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const length = values.length;
  const setLength = Math.round(length/3);

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= setLength) {
      setPage(selectedPage)
    }
  }
  return (
    <div className='todosList'>
      <div className="head">
        <h4>My tasks</h4>
        <button onClick={() => navigate('/newtask')}>Add task</button>
      </div>
      {values.slice(page * 3 - 3, page * 3).map((value) => (
        <TodoItem data={value} key={value._id} />
      ))}

      {values.length > 0 && (
        <div className='pagination'>
          <span onClick={()=>selectPageHandler(page - 1)}>⏮</span>
          {
            [...Array(setLength)].map((_, i) => {
              return (<span key={i} onClick={()=>selectPageHandler(i+1)} className={page === i+1 ? 'dark' : ''}>{i + 1}</span>)
            })
          }

          <span onClick={()=>selectPageHandler(page+1)}>⏯</span>
        </div>)
      }

    </div>
  )
}

export default TodosList