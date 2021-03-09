import React, { useState } from "react";
import Todotable from "./Todotable";

function Todolist() {
  const [todo, setTodo] = useState({ desc: "", date: "" });
  const [todos, setTodos] = useState([]);

  const inputChanged = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const addTodo = () => {
    setTodos([todo, ...todos]);
    setTodo({ desc: "", date: "" });
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Date"
        name="date"
        value={todo.date}
        onChange={inputChanged}
      />
      <input
        type="text"
        placeholder="Description"
        name="desc"
        value={todo.desc}
        onChange={inputChanged}
      />
      <button onClick={addTodo}>Add Todo</button>
      <Todotable todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
}

export default Todolist;
