import React from "react";
import CreateTodo from "../../components/Todos/CreateTodo";
import getTodos from "../../utils/todos/getTodos";
import deleteTodo from "../../utils/todos/deleteTodo";
import completeTodo from "../../utils/todos/completeTodo";
import starTodo from "../../utils/todos/starTodo";
import updateTodo from "../../utils/todos/updateTodo";
import deleteIcon from '../../assets/delete.png'
import copyIcon from '../../assets/Duplicate.png'
import starIcon from '../../assets/Star.png'
import filledStar from '../../assets/filledStar.png'
import moment from "moment"

import Image from 'next/image'

export default function Todos() {
  const [todos, setTodos] = React.useState([]);
  const [open, setOpen] = React.useState("");
  const [newTitle, setNewTitle] = React.useState("");

  React.useEffect(() => {
    getTodos().then((todos) => setTodos(todos));
  }, []);

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const response = await completeTodo(id, todo.completed);
    setTodos(todos.map((todo) => (todo.id === id ? response : todo)));
  };

  const handleStar = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const response = await starTodo(id, todo.dataStarred);
    setTodos(todos.map((todo) => (todo.id === id ? response : todo)));
  };

  const updateTitle = async (id, title) => {
    if(title===""){
      alert("Title can't be empty!");
      return ;
    }
    const todo = todos.find((todo) => todo.id === id);
    const response = await updateTodo(id, title);
    setTodos(todos.map((todo) => (todo.id === id ? response : todo)))
    setOpen("")
  }

  const isOverDue = (date) => {
    const today = new Date();
    date = new Date(date)

    if(date<today) return true;
    return false;
  }

  const formatDate = (date) => {
      date = moment(date).format('MM/DD/YYYY');
      return date;
  }

  const duplicateTodo = async (dueDate,title) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title, dueDate
      }),
    });
    const todo = await response.json();
    getTodos().then((todos) => setTodos(todos))
  };

  const sortTodos = (by) => {
    
    if(by==='titleUp'){
      
      let temp = [...todos];
      temp.sort((a,b)=>a.title.localeCompare(b.title));
      console.log(temp)
      setTodos(temp);
    }
    else if(by==='titleDown')
    {
      let temp = [...todos];
      temp.sort((a,b)=>b.title.localeCompare(a.title));
      console.log(temp)
      setTodos(temp);
    }
    else if(by==='createdAt'){
      let temp = [...todos];
      temp.sort((a,b)=>a.createdAt.localeCompare(b.createdAt));
      console.log(temp)
      setTodos(temp);
    }
    else if(by==='dueDateUp'){
      let temp = [...todos];
      temp.sort((a,b)=>a.dueDate.localeCompare(b.dueDate));
      console.log(temp)
      setTodos(temp);
    }
    else{
      let temp = [...todos];
      temp.sort((a,b)=>b.dueDate.localeCompare(a.dueDate));
      console.log(temp)
      setTodos(temp);
    }
  }

  const filterTodo = async (key) => {
    const a = await getTodos();
    if(key===""){setTodos(a); return;}
    const b = a.filter((t)=>t.title.includes(key));
    setTodos(b);
  }

  return (
    <div style={{display:'flex', flexDirection:'column',alignItems:'center',justifyContent:'center',border:'2px solid grey',padding:'40px',margin:'50px',backgroundColor:'whitesmoke'}}>
      <h1>Todos</h1>

      {/* Search bar */}
      <div style={{display:'flex'}}> 
        <input id="todo-search-bar" type="text" placeholder="Search" onChange={(e)=>filterTodo(e.target.value)}/>
        <div> Sort By
        <select id="todo-sort-dropdown" style={{marginLeft:'10px'}} onChange={(e)=>sortTodos(e.target.value)}>
          <option id="todo-sort-dropdown__title-ascending" value="titleUp">Title(&#129057;)</option>
          <option id="todo-sort-dropdown__title-descending" value="titleDown">Title(&#129059;)</option>
          <option id="todo-sort-dropdown__due-date-ascending" value="dueDateUp">Due Date(&#129057;)</option>
          <option id="todo-sort-dropdown__due-date-descending" value="dueDateDown">Due Date(&#129059;)</option>
          <option id="todo-sort-dropdown__created-date-descending" value="-createdAt">Create Date(&#129059;)</option>
        </select>
      </div>
      </div>

      {/* Sorting dropdown */}
      

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display:'flex',
              alignItems:'center',
              position: "relative",
              border:"1px solid black",
              padding:'10px',
              backgroundColor:isOverDue(todo.dueDate)?'#E38580':'white',
              width:'450px'
            }}
          >
      
          <input type="checkbox" id="todo-checkbox" onClick={() => handleComplete(todo.id)} checked={todo.completed}/>
          <div id="todoAndDate"  style={{marginRight:'30px',display:'flex',flexDirection:'column',alignItems:'flex-start',display:todo.id===open?'none':'block'}}
              onClick={function(){setOpen(todo.id); setNewTitle(todo.title)}}>
            <div style={{textDecoration: todo.completed ? "line-through" : "none",marginRight:'15px',fontWeight:todo.dataStarred?'bold':'normal',}}>{todo.title}</div>
          </div>
          <div id={`todo-edit-title-text-field__${todo.id}`} style={{display:todo.id===open?'block':'none',marginRight:'20px'}} >
                <input type="text" onChange={(e)=>setNewTitle(e.target.value)} value={newTitle} style={{marginRight:'10px'}}/>
                <button onClick={()=>updateTitle(todo.id,newTitle)}>&#x2713;</button>
                <button onClick={function(){setNewTitle("");}}>&#10060;</button>
            </div>
           <div style={{display:todo.id===open?'block':'none'}}>
            <button id={`todo-star-button__${todo.id}`} onClick={() => handleStar(todo.id)}>
            <Image style={{width: "18px", height:"18px"}} src={todo.dataStarred?filledStar:starIcon} alt="Star" /></button>
            <button onClick={() => handleDelete(todo.id)}>
              <Image style={{width: "18px", height:"18px"}} src={deleteIcon} alt="Delete" />
            </button>
            <button id={`todo-duplicate-button__${todo.id}`} onClick={() => duplicateTodo(todo.dueDate,todo.title)}>
            <Image style={{width: "18px", height:"18px"}} src={copyIcon} alt="Copy" /></button>   
           </div>
            
            
            
            
              
          </li>
        ))}
      </ul>
      <CreateTodo />
    </div>
  );
}
