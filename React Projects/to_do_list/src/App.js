
import './App.css';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Todos from "./Components/Todos";
import {Addtodo} from "./Components/Addtodo";
import React,{useState,useEffect} from 'react';

function App() {
  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo=[];
  }
  else{
    initTodo=JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete=(todo)=>{
    console.log("I'm on Delete!!",todo);
    setTodos(todos.filter((e)=>{
      return e!==todo;
    }))
    localStorage.setItem("todos",JSON.stringify(todos));
  }
  const addTodo=(Work,Desc)=>{
    console.log("I'm Adding this todo",Work,Desc);
    let sno;
    if(todos.length===0){
      sno=1;
    }
    else{
      sno=todos[todos.length-1].sno+1;
    }
    const myTodo={
      sno: sno,
      Work: Work,
      Desc: Desc
    }
    setTodos([...todos,myTodo]);
    console.log(myTodo);
  }
  const [todos,setTodos]=useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
  }, [todos]);
  
  return (
      <>
      <Header title="Todos App" searchBar={true}/>
      <Addtodo addTodo={addTodo}/>
      <Todos todos={todos} onDelete={onDelete}/>
      <Footer/>
      </>
  );
}

export default App;
