import React from "react";

const CreateTodo = () => {
  const [title, setTitle] = React.useState("");
  const [dueDate, setDueDate] = React.useState(new Date())
  const [visible, setVisible] = React.useState(false)

  const handleSubmit = async (e) => {
    
    if(title===""){
      alert("title can't be empty!");
      return;
    }
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
    setTitle("");
    
  };

  return (
    <div>
      <div style={{display:!visible?'block':'none'}}>
        <button onClick={()=>setVisible(true)}>&#43;</button>    Create New Item
      </div>
      <form onSubmit={handleSubmit} style={{display:visible?'block':'none'}}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{marginRight:'10px'}}
        />
        <input
          type="date"
          id="new-todo-due-date-picker" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)}
          style={{marginRight:'10px'}}
          />
        <button type="submit">&#x2713;</button>
        <button onClick={function(e){e.preventDefault(); setVisible(false);}}>&#10060;</button>
      </form>
    </div>
  );
};

export default CreateTodo;
