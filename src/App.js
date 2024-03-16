import React, { useState } from 'react';

export default function App() {
  const [todo, settodo] = useState('');
  const [todos, settodos] = useState([]);
  const [editId, seteditId] = useState(0)

  const formatDate = (date) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}, ${date.toLocaleTimeString('en-US', options)}`;
  }

  const addTodo = () => {
    if (editId) {
      const updatedTodos = todos.map(to => (to.id === editId ? { ...to, text: todo } : to));
      settodos(updatedTodos)
      seteditId(0)
      settodo('')
    } else {
      if (todo.trim() !== '') {
        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);
        settodos([{ id: Date.now(), text: todo, status: false, date: formattedDate }, ...todos])
        settodo('')
      } else {
        alert("Please Enter a Task")
      }
    }
  }

  const handleDelete = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?')
    if (isConfirmed) {
      const updatedTodos = todos.filter(todo => todo.id !== id)
      settodos(updatedTodos)
    }
  }
  const handleEdit = (id) => {
    const selectedTodo = todos.find(todo => todo.id === id)
    console.log(selectedTodo)
    settodo(selectedTodo.text)
    seteditId(selectedTodo.id)
  }

  return (
    <div className='container'>
      <div className='row mt-5 p-3'>
        <div className='col-md-6 bg-gradient p-3 rounded'>
          <h1 className='text-light text-center'><b>TO-DO</b></h1>
          <h5 className='text-center text-white'>Stay Organized, Get Things Done!</h5>
          <div className="input-group mb-3 mt-3 mb-4">
            <input type="text" value={todo} onChange={(e) => settodo(e.target.value)} className="form-control" placeholder="🖋️Add item..." aria-label="Recipient's username" aria-describedby="button-addon2" required />
            <button onClick={addTodo} className="btn btn-outline-secondary" type="button" id="button-addon2"><b>{editId ? 'Edit' : 'Add'}</b></button>
          </div>
          {todos.map((obj) => {
            return (
              <ul className="list-group mt-2">
                <li className="list-group-item">
                  <input value={obj.status} onChange={(e) => {
                    settodos(todos.filter(obj2 => {
                      console.log(obj.status)
                      if (obj.id === obj2.id) {
                        obj2.status = e.target.checked
                      }
                      return obj2;
                    }))
                  }} className="form-check-input me-1 bg-secondary" type="checkbox" id="firstCheckbox" style={{ cursor: 'pointer' }} />
                  <label className="form-check-label text-secondary fw-bold" htmlFor="firstCheckbox" style={{ textDecoration: obj.status ? "line-through" : "none" }}> {obj.text}<br />
                    <span style={{ fontSize: '0.8rem' }}>{obj.date}</span>
                  </label>
                  <div className='float-end'>
                    <i onClick={() => { handleEdit(obj.id) }} className="fas fa-edit fs-4 me-2 text-secondary" style={{ cursor: 'pointer' }}></i>
                    <i onClick={() => { handleDelete(obj.id) }} className="fas fa-trash-alt fs-4 text-secondary" style={{ cursor: 'pointer' }}></i>
                  </div>
                </li>

              </ul>
            )
          })}
        </div>
        <div className='col-md-3 col-6 rounded text-center'>
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col" className='text-primary'>Active</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((obj) => {
                if (obj.status === false) {
                  return (
                    <tr>
                      <td className='text-white'>{obj.text}</td>
                    </tr>
                  )
                }
                return null
              })}
            </tbody>
          </table>
        </div>
        <div className='col-md-3 col-6  rounded text-center'>
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col" className='text-success'>Completed</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((obj) => {
                if (obj.status === true) {
                  return (
                    <tr>
                      <td className='text-white'>{obj.text}</td>
                    </tr>
                  )
                }
                return null
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  )
}
