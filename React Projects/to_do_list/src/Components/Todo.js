import React from 'react'

export default function Todo({todo,onDelete}) {
  return (
    <div>
      <h4>{todo.sno}</h4>
      <h5>{todo.Work}</h5>
      <p>{todo.Desc}</p>
      <button className="btn btn-sm btn-danger" onClick={()=>{onDelete(todo)}}>Delete</button>
    </div>
  )
}
