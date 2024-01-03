import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';
import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  
  const getAllToDos = () => {
    const apiKey = "2a6aee-a6bd35-678fab-df584e-ecbfd4";

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var todos = JSON.parse(this.responseText);

        if (isSorted) {
          todos.sort((a, b) => a.text.localeCompare(b.text)); //sorting step
        }

        setTodos(todos);
      }
    };

    xhttp.open("GET", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key", apiKey);
    xhttp.send();
  };

  useEffect(() => {
    getAllToDos();
  }, [isSorted]);

  //toggle sorting
  const toggleSorting = () => {
    setIsSorted((prevIsSorted) => !prevIsSorted);
  }; 

  return (
    <div className="App">
      <header className="App-header">
        <h1>Elysia's ToDo App</h1>
        
        <NewTodo getAllToDos={getAllToDos} />

        <h2>ToDo List</h2>

        <button onClick={toggleSorting}>
          {isSorted ? 'Unsort Todos' : 'Sort Todos'}
        </button>

        <ul id="todos">
          {todos.map((todo) => (
            <Todo key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} getAllToDos={getAllToDos}/>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
