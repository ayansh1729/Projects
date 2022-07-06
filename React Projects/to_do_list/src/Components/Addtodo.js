import React from 'react'
import {useState} from 'react';

export const Addtodo = (props) => {
    const [Work, setWork] = useState(" ");
    const [Desc, setDesc] = useState(" ");
    const submit=(e)=>{
        e.preventDefault();
        if(!Work || !Desc){
            alert("Title or Description can't be blank:");
        }
        props.addTodo(Work,Desc);
    }
    return (
        <div className='container my-3'>
            <form onSubmit={submit}>
                <div class="mb-3">
                    <label for="title" class="form-label">Add Work</label>
                    <input type="text" class="form-control" value={Work} onChange={(e)=>{setWork(e.target.value)}} id="title" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="desc" class="form-label">Add Description</label>
                    <input type="text" class="form-control" value={Desc} onChange={(e)=>{setDesc(e.target.value)}} id="desc" aria-describedby="emailHelp" />
                </div>
                <button type="submit" class="btn btn-sm btn-success">Submit</button>
            </form>
        </div>
    )
}
