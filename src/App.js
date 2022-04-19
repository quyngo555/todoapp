import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  let [todo, setTodo] = useState('')
  let [listTodo, setListTodo] = useState([] && JSON.parse(localStorage.getItem('List todo')))
  let [editTodo, setEditTodo] = useState({})
  const inputRef = useRef()

  const handleAdd = () => {
    if (inputRef.current.value === '') {
      toast.error('Error')
    } else {

      setListTodo([...listTodo, todo])
      setTodo('')
      inputRef.current.focus()
      toast.success('Successed')
    }
  }
  const handleDelete = (index) => {
    let newListTodo = [...listTodo]
    newListTodo.splice(index, 1)
    setListTodo(newListTodo)
    toast.warn('Delete Completed')
  }
  const handleEdit = (item, index) => {
    let isEmtyEditTodo = Object.keys(editTodo).length === 0
    if(isEmtyEditTodo) {
      setEditTodo({
        ...editTodo,
      index: index,
      todo: item
    })
    }else {
      let newListTodo = [...listTodo]
      newListTodo[index] = editTodo.todo
      setListTodo(newListTodo)
      toast.success('Edit Successed')
      setEditTodo({})
    }
  }

  useEffect(() => {
    let copyListTodo = [...listTodo]
    let jsonListTodo = JSON.stringify(copyListTodo)
    localStorage.setItem('List todo', jsonListTodo)

  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Todo App with React.JS
        </p>
        <div>
          <input
            value={todo}
            ref={inputRef}
            onChange={e => setTodo(e.target.value)}
          />
          <button onClick={handleAdd}>Add</button>
        </div>
        <div>
          {listTodo && listTodo.map((todo, index) => (
            <div key={index}>
              {editTodo.index === index ? <input
                className='editInput'
                value={editTodo.todo}
                onChange={(e) => setEditTodo({...editTodo, todo: e.target.value, index: index})}
              /> :
                <span className='todo'>{index +1} - {todo}</span>
              }
              <button className='button' onClick={() =>handleEdit(todo, index)}>
                {editTodo.index === index ? 'Save' : 'Edit'}
              </button>
              <button className='button' onClick={handleDelete}>Delete</button>
            </div>
          ))}
        </div>
      </header>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
